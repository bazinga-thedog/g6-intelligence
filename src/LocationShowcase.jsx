import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { getProspectGuid } from './prospectGuid'
import CommentSystem from './CommentSystem'
import './LocationShowcase.css'

export default function LocationShowcase({ onCitySelect }) {
  const navigate = useNavigate()
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedLocations, setSelectedLocations] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState('EUR') // Can be changed dynamically
  const [rawLocations, setRawLocations] = useState([]) // Raw data from DB
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [investorProfile, setInvestorProfile] = useState(null)
  const [taxResidency, setTaxResidency] = useState(null)
  const [showAllCities, setShowAllCities] = useState(false)

  // Fetch investor profile and tax residency from survey
  useEffect(() => {
    const fetchUserData = async () => {
      const prospectGuid = getProspectGuid()
      if (!prospectGuid) return

      try {
        const { data, error } = await supabase
          .from('prospect_segmentation')
          .select('investor_profile, tax_residency')
          .eq('prospect_guid', prospectGuid)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (error) {
          console.log('No user data found:', error)
          return
        }

        setInvestorProfile(data?.investor_profile)
        setTaxResidency(data?.tax_residency)
        console.log('Investor Profile:', data?.investor_profile)
        console.log('Tax Residency:', data?.tax_residency)
      } catch (err) {
        console.error('Error fetching user data:', err)
      }
    }

    fetchUserData()
  }, [])

  // Fetch locations from Supabase
  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      setLoading(true)
      setError(null)

      // Exclude Singapore - no one can buy there
      const { data, error: fetchError } = await supabase
        .from('investment_locations')
        .select('*')
        .neq('city', 'Singapore')

      if (fetchError) throw fetchError

      console.log('Fetched locations from database:', data.length)

      // Transform Supabase data to match component structure
      const transformedData = data.map(loc => ({
        id: loc.id,
        country: loc.country,
        countryCode: loc.country_code,
        city: loc.city,
        isPreferred: false, // Will be calculated dynamically
        image: loc.image_url,
        metrics: {
          pricePerSqm: {
            EUR: { min: loc.price_per_sqm_eur_min, max: loc.price_per_sqm_eur_max },
            USD: { min: loc.price_per_sqm_usd_min, max: loc.price_per_sqm_usd_max },
            GBP: { min: loc.price_per_sqm_gbp_min, max: loc.price_per_sqm_gbp_max }
          },
          rentalYield: { min: loc.rental_yield_min, max: loc.rental_yield_max },
          daysToRent: { avg: loc.days_to_rent_avg },
          priceGrowth5Y: loc.price_growth_5y
        },
        description: loc.description,
        // Profile matching data
        investorProfileMatch: loc.investor_profile_match || [],
        marketMaturity: loc.market_maturity,
        lifestyleAppeal: loc.lifestyle_appeal,
        growthPotential: loc.growth_potential,
        incomeStability: loc.income_stability,
        residencyProgram: loc.residency_program,
        marketTransparency: loc.market_transparency,
        liquidityScore: loc.liquidity_score,
        sophisticationRequired: loc.sophistication_required
      }))

      setRawLocations(transformedData)
    } catch (err) {
      console.error('Error fetching locations:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Map tax residency to country codes
  const getTaxResidencyCountryCode = (taxRes) => {
    if (!taxRes) return null

    const mapping = {
      'portugal': 'PT',
      'uk': 'UK',
      'dubai': 'AE',
      'singapore': 'SG',
      'other': null
    }

    return mapping[taxRes.toLowerCase()] || null
  }

  // Calculate top 3 preferred cities based on investor profile
  // Excludes cities from user's tax residency country
  const calculatePreferredCities = (locs, profile, userTaxResidency) => {
    if (!profile) return locs

    const userCountryCode = getTaxResidencyCountryCode(userTaxResidency)

    console.log('=== Calculating Preferred Cities ===')
    console.log('Tax Residency:', userTaxResidency)
    console.log('User Country Code:', userCountryCode)
    console.log('Total locations:', locs.length)

    // Filter out user's tax residency country for preferred calculation
    const eligibleLocations = userCountryCode
      ? locs.filter(loc => {
          const isExcluded = loc.countryCode === userCountryCode
          if (isExcluded) {
            console.log(`Excluding ${loc.city} (${loc.countryCode}) - matches user country`)
          }
          return !isExcluded
        })
      : locs

    console.log('Eligible locations after filtering:', eligibleLocations.length)

    // Sort by profile score
    const sortedByScore = [...eligibleLocations].sort((a, b) => {
      const aScore = calculateProfileScore(a, profile)
      const bScore = calculateProfileScore(b, profile)
      return bScore - aScore
    })

    // Get top 3 IDs
    const top3Ids = sortedByScore.slice(0, 3).map(loc => loc.id)
    const top3Cities = sortedByScore.slice(0, 3).map(loc => `${loc.city} (${loc.countryCode})`)

    console.log('Top 3 Preferred:', top3Cities)

    // Mark top 3 as preferred
    return locs.map(loc => ({
      ...loc,
      isPreferred: top3Ids.includes(loc.id)
    }))
  }

  // Calculate score based on investor profile preferences
  const calculateProfileScore = (location, profile) => {
    if (!profile) return 0

    let score = 0

    switch (profile) {
      case 'Income Seeker':
        score += (location.incomeStability || 5) * 2
        score += (location.metrics.rentalYield.min || 0) * 3
        score += location.residencyProgram ? 5 : 0
        break

      case 'Growth Hunter':
        score += (location.growthPotential || 5) * 3
        score += (location.metrics.priceGrowth5Y?.[4] || 0) * 0.5
        score += location.marketMaturity === 'Emerging' ? 10 : 0
        break

      case 'Lifestyle Investor':
        score += (location.lifestyleAppeal || 5) * 3
        score += location.residencyProgram ? 10 : 0
        score += (location.incomeStability || 5)
        break

      case 'Sophisticated Builder':
        score += (location.growthPotential || 5) * 1.5
        score += (location.incomeStability || 5) * 1.5
        score += (location.lifestyleAppeal || 5)
        score += location.marketMaturity === 'Mature' ? 5 : 0
        break

      default:
        score = 0
    }

    return score
  }

  // Calculate locations with preferred flags using useMemo to avoid race conditions
  const locations = useMemo(() => {
    if (rawLocations.length === 0) return []

    if (!investorProfile) {
      console.log('No investor profile yet, returning raw locations')
      return rawLocations
    }

    console.log('useMemo: Calculating preferred cities')
    return calculatePreferredCities(rawLocations, investorProfile, taxResidency)
  }, [rawLocations, investorProfile, taxResidency])

  // Get profile-specific metrics to display
  const getProfileMetrics = (location, profile) => {
    // Common metric for all profiles
    const priceMetric = {
      label: 'Price/sqm',
      value: `${formatCurrency(location.metrics.pricePerSqm[selectedCurrency].min, selectedCurrency)} - ${formatCurrency(location.metrics.pricePerSqm[selectedCurrency].max, selectedCurrency)}`,
      type: 'price'
    }

    // Chart metric
    const chartMetric = {
      label: '5Y Price Growth',
      type: 'chart',
      isChart: true,
      chartData: location.metrics.priceGrowth5Y
    }

    // Default metrics if no profile
    if (!profile) {
      return [
        priceMetric,
        {
          label: 'Rental Yield',
          value: `${location.metrics.rentalYield.min}% - ${location.metrics.rentalYield.max}%`,
          type: 'growth'
        },
        chartMetric
      ]
    }

    // Profile-specific metrics
    switch (profile) {
      case 'Income Seeker':
        return [
          priceMetric,
          {
            label: 'Rental Yield',
            value: `${location.metrics.rentalYield.min}% - ${location.metrics.rentalYield.max}%`,
            type: 'highlight'
          },
          {
            label: 'Income Stability',
            value: `${location.incomeStability || 5}/10`,
            type: location.incomeStability >= 7 ? 'positive' : 'neutral'
          },
          {
            label: location.residencyProgram ? 'Golden Visa' : 'Days to Rent',
            value: location.residencyProgram ? 'Available' : `${location.metrics.daysToRent.avg} days`,
            type: location.residencyProgram ? 'positive' : 'neutral'
          }
        ]

      case 'Growth Hunter':
        return [
          priceMetric,
          {
            label: 'Current Appreciation',
            value: `+${location.metrics.priceGrowth5Y?.[4]?.toFixed(1)}%`,
            type: 'highlight'
          },
          {
            label: 'Growth Potential',
            value: `${location.growthPotential || 5}/10`,
            type: location.growthPotential >= 7 ? 'positive' : 'neutral'
          },
          chartMetric
        ]

      case 'Lifestyle Investor':
        return [
          priceMetric,
          {
            label: 'Lifestyle Appeal',
            value: `${location.lifestyleAppeal || 5}/10`,
            type: location.lifestyleAppeal >= 8 ? 'highlight' : 'positive'
          },
          {
            label: location.residencyProgram ? 'Golden Visa' : 'Overall Quality',
            value: location.residencyProgram ? 'Available' : `${Math.round((location.lifestyleAppeal + location.incomeStability) / 2)}/10`,
            type: 'positive'
          },
          {
            label: 'Rental Yield',
            value: `${location.metrics.rentalYield.min}% - ${location.metrics.rentalYield.max}%`,
            type: 'neutral'
          }
        ]

      case 'Sophisticated Builder':
        return [
          priceMetric,
          {
            label: 'Growth Potential',
            value: `${location.growthPotential || 5}/10`,
            type: 'positive'
          },
          {
            label: 'Market Transparency',
            value: `${location.marketTransparency || 5}/10`,
            type: location.marketTransparency >= 8 ? 'highlight' : 'neutral'
          },
          chartMetric
        ]

      default:
        return [
          priceMetric,
          {
            label: 'Rental Yield',
            value: `${location.metrics.rentalYield.min}% - ${location.metrics.rentalYield.max}%`,
            type: 'growth'
          },
          chartMetric
        ]
    }
  }

  // Helper function to format currency
  const formatCurrency = (value, currency) => {
    const symbols = { EUR: '€', USD: '$', GBP: '£' }
    return `${symbols[currency] || ''}${value.toLocaleString()}`
  }

  // Helper function to render mini trendline chart
  const renderTrendline = (data) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100 // 100px width for 5 points
      const y = 30 - ((value - min) / range) * 20 // 30px height, 20px range
      return { x, y, value }
    })

    const pathData = points.map((p, i) =>
      `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
    ).join(' ')

    const latestGrowth = data[data.length - 1]
    const isPositive = latestGrowth >= 0

    return (
      <div className="growth-chart">
        <svg width="110" height="40" viewBox="0 0 110 40" className="trendline-svg">
          <path
            d={pathData}
            fill="none"
            stroke={isPositive ? '#10b981' : '#ef4444'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="3"
              fill={isPositive ? '#10b981' : '#ef4444'}
            />
          ))}
        </svg>
        <div className={`growth-percentage ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '+' : ''}{latestGrowth.toFixed(1)}%
        </div>
      </div>
    )
  }

  const filters = [
    { value: 'all', label: 'All Locations' },
    { value: 'preferred', label: 'Preferred Choices' },
    { value: 'PT', label: 'Portugal' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'AE', label: 'Dubai' }
  ]

  // Filter locations
  let filteredLocations
  if (selectedFilter === 'all') {
    filteredLocations = locations
  } else if (selectedFilter === 'preferred') {
    filteredLocations = locations.filter(loc => loc.isPreferred)
  } else {
    filteredLocations = locations.filter(loc => loc.countryCode === selectedFilter)
  }

  // Sort: preferred cities first, then by profile score
  filteredLocations = [...filteredLocations].sort((a, b) => {
    // Preferred first
    if (a.isPreferred && !b.isPreferred) return -1
    if (!a.isPreferred && b.isPreferred) return 1

    // Then by profile score
    if (investorProfile) {
      const aScore = calculateProfileScore(a, investorProfile)
      const bScore = calculateProfileScore(b, investorProfile)
      if (aScore !== bScore) return bScore - aScore
    }

    // Finally by ID
    return a.id - b.id
  })

  // Show top 3 by default, or all if "See More" clicked
  const displayedLocations = showAllCities ? filteredLocations : filteredLocations.slice(0, 3)
  const hasMoreCities = filteredLocations.length > 3

  // Debug: Log what's being displayed
  console.log('=== Display Info ===')
  console.log('Filter:', selectedFilter)
  console.log('Filtered locations count:', filteredLocations.length)
  console.log('Displayed locations:', displayedLocations.map(loc => `${loc.city} (${loc.countryCode}) - Preferred: ${loc.isPreferred}`))

  const handleLocationClick = (location) => {
    // Navigate to neighborhood view for this city
    if (onCitySelect) {
      onCitySelect(location)
    }
  }


  // Show loading state
  if (loading) {
    return (
      <div className="location-showcase">
        <div className="showcase-nav">
          <div className="showcase-logo">
            <h2>G6<span>Intelligence</span></h2>
          </div>
        </div>
        <div className="showcase-loading">
          <div className="loading-spinner"></div>
          <p>Loading investment opportunities...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="location-showcase">
        <div className="showcase-nav">
          <div className="showcase-logo">
            <h2>G6<span>Intelligence</span></h2>
          </div>
        </div>
        <div className="showcase-error">
          <p>Error loading locations: {error}</p>
          <button onClick={fetchLocations} className="retry-btn">Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="location-showcase">
      <CommentSystem pageId="locations" />

      {/* Navigation Header */}
      <div className="showcase-nav">
        <div className="showcase-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <h2>G6<span>Intelligence</span></h2>
        </div>
      </div>

      {/* Hero Section */}
      <div className="showcase-hero">
        <div className="showcase-hero-content">
          <h1 className="showcase-title">Investment Opportunities</h1>
          <p className="showcase-subtitle">
            Explore our hand-selected locations across premium markets
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="showcase-filters">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`filter-btn ${selectedFilter === filter.value ? 'active' : ''} ${filter.value === 'preferred' ? 'preferred-filter' : ''}`}
            onClick={() => setSelectedFilter(filter.value)}
          >
            {filter.value === 'preferred' && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            )}
            {filter.label}
          </button>
        ))}
      </div>

      {/* Location Cards Grid */}
      <div className="showcase-content">
        <div className="locations-grid">
          {displayedLocations.map((location) => (
            <div
              key={location.id}
              className={`location-card ${location.isPreferred ? 'preferred' : ''}`}
              onClick={() => handleLocationClick(location)}
            >
              {/* Preferred Badge - Top 3 based on investor profile */}
              {location.isPreferred && (
                <div className="preferred-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Preferred Choice
                </div>
              )}

              {/* Image */}
              <div className="location-image">
                <img src={location.image} alt={`${location.city}, ${location.country}`} />
                <div className="location-overlay">
                  <div className="location-country-badge">{location.country}</div>
                </div>
              </div>

              {/* Content */}
              <div className="location-card-content">
                <div className="location-header">
                  <h3 className="location-name">{location.city}</h3>
                  <p className="location-city">{location.country}</p>
                </div>

                <p className="location-description">{location.description}</p>

                {/* Profile-Specific Metrics */}
                <div className="location-metrics">
                  {getProfileMetrics(location, investorProfile).map((metric, index) => (
                    metric.isChart ? (
                      <div key={index} className="metric metric-chart">
                        <div className="metric-label">{metric.label}</div>
                        <div className="metric-chart-container">
                          {renderTrendline(metric.chartData)}
                        </div>
                      </div>
                    ) : (
                      <div key={index} className={`metric ${metric.type === 'highlight' ? 'metric-highlight' : ''}`}>
                        <div className="metric-label">
                          {metric.label}
                        </div>
                        <div className={`metric-value ${metric.type === 'highlight' ? 'highlight' : metric.type === 'positive' ? 'positive' : metric.type === 'growth' ? 'growth' : ''}`}>
                          {metric.value}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        {hasMoreCities && (
          <div className="see-more-container">
            <button
              className="see-more-btn"
              onClick={() => setShowAllCities(!showAllCities)}
            >
              {showAllCities ? 'Show Less' : `See More (${filteredLocations.length - 3} more)`}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ transform: showAllCities ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
