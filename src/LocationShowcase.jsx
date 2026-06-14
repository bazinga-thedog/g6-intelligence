import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import CommentSystem from './CommentSystem'
import './LocationShowcase.css'

export default function LocationShowcase({ onCitySelect }) {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedLocations, setSelectedLocations] = useState([])
  const [showAllLocations, setShowAllLocations] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState('EUR') // Can be changed dynamically
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch locations from Supabase
  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('investment_locations')
        .select('*')
        .order('is_preferred', { ascending: false })
        .order('id', { ascending: true })

      if (fetchError) throw fetchError

      // Transform Supabase data to match component structure
      const transformedData = data.map(loc => ({
        id: loc.id,
        country: loc.country,
        countryCode: loc.country_code,
        city: loc.city,
        isPreferred: loc.is_preferred,
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
        description: loc.description
      }))

      setLocations(transformedData)
    } catch (err) {
      console.error('Error fetching locations:', err)
      setError(err.message)
    } finally {
      setLoading(false)
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
    { value: 'AE', label: 'Dubai' },
    { value: 'SG', label: 'Singapore' }
  ]

  // Filter and sort: Preferred cities first, then others
  let filteredLocations
  if (selectedFilter === 'all') {
    filteredLocations = locations
  } else if (selectedFilter === 'preferred') {
    filteredLocations = locations.filter(loc => loc.isPreferred)
  } else {
    filteredLocations = locations.filter(loc => loc.countryCode === selectedFilter)
  }

  // Sort: preferred cities first
  filteredLocations = [...filteredLocations].sort((a, b) => {
    if (a.isPreferred && !b.isPreferred) return -1
    if (!a.isPreferred && b.isPreferred) return 1
    return 0
  })

  // Separate preferred and other locations
  const preferredLocations = filteredLocations.filter(loc => loc.isPreferred)
  const otherLocations = filteredLocations.filter(loc => !loc.isPreferred)

  // Show only preferred by default, or all if button clicked
  const displayedLocations = showAllLocations ? filteredLocations : preferredLocations

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
        <div className="showcase-logo">
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
              {/* Preferred Badge */}
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

                {/* Metrics */}
                <div className="location-metrics">
                  <div className="metric">
                    <div className="metric-label">Price/sqm</div>
                    <div className="metric-value">
                      {formatCurrency(location.metrics.pricePerSqm[selectedCurrency].min, selectedCurrency)}
                      {' - '}
                      {formatCurrency(location.metrics.pricePerSqm[selectedCurrency].max, selectedCurrency)}
                    </div>
                  </div>
                  <div className="metric">
                    <div className="metric-label">Rental Yield</div>
                    <div className="metric-value growth">
                      {location.metrics.rentalYield.min}% - {location.metrics.rentalYield.max}%
                    </div>
                  </div>
                  <div className="metric">
                    <div className="metric-label">Days to Rent</div>
                    <div className="metric-value">{location.metrics.daysToRent.avg} days</div>
                  </div>
                </div>

                {/* Price Growth Chart */}
                <div className="location-growth">
                  <div className="growth-label">5Y Price Growth</div>
                  {renderTrendline(location.metrics.priceGrowth5Y)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More Options Button */}
        {!showAllLocations && otherLocations.length > 0 && (
          <div className="more-options-container">
            <button
              className="more-options-btn"
              onClick={() => setShowAllLocations(true)}
            >
              More Options
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
