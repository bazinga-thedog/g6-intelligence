import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { getProspectGuid } from './prospectGuid'
import './NeighborhoodShowcase.css'

export default function NeighborhoodShowcase({ selectedCity, onBack, onNeighborhoodSelect }) {
  const { cityName } = useParams()
  const cityToUse = selectedCity || { city: cityName }
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState('EUR')
  const [neighborhoods, setNeighborhoods] = useState([])
  const [overview, setOverview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingOverview, setLoadingOverview] = useState(true)
  const [error, setError] = useState(null)
  const [overviewError, setOverviewError] = useState(null)
  const [investorProfile, setInvestorProfile] = useState(null)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Fetch investor profile from survey
  useEffect(() => {
    const fetchUserProfile = async () => {
      const prospectGuid = getProspectGuid()
      if (!prospectGuid) return

      try {
        const { data, error } = await supabase
          .from('prospect_segmentation')
          .select('investor_profile')
          .eq('prospect_guid', prospectGuid)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (error) {
          return
        }

        setInvestorProfile(data?.investor_profile)
      } catch (err) {
        console.error('Error fetching investor profile:', err)
      }
    }

    fetchUserProfile()
  }, [])

  // Fetch city overview from investment_locations (merged table)
  useEffect(() => {
    const fetchCityOverview = async () => {
      if (!cityToUse?.city) return

      setLoadingOverview(true)
      setOverviewError(null)

      try {
        const { data, error: fetchError } = await supabase
          .from('investment_locations')
          .select('*')
          .eq('city', cityToUse.city)
          .single()

        if (fetchError) throw fetchError

        // Transform Supabase data to match component structure
        setOverview({
          heroImage: data.hero_image_url,
          description: data.description,
          highlights: data.highlights || [],
          avgMetrics: {
            pricePerSqm: {
              EUR: { min: data.price_per_sqm_eur_min, max: data.price_per_sqm_eur_max },
              USD: { min: data.price_per_sqm_usd_min, max: data.price_per_sqm_usd_max },
              GBP: { min: data.price_per_sqm_gbp_min, max: data.price_per_sqm_gbp_max }
            },
            rentalYield: { avg: ((data.rental_yield_min + data.rental_yield_max) / 2) },
            daysToRent: { avg: data.days_to_rent_avg },
            priceGrowth5Y: data.price_growth_5y || []
          }
        })
      } catch (err) {
        console.error('Error fetching city overview:', err)
        setOverviewError(err.message)
      } finally {
        setLoadingOverview(false)
      }
    }

    fetchCityOverview()
  }, [cityToUse])

  // Fetch neighborhoods from Supabase
  useEffect(() => {
    const fetchNeighborhoods = async () => {
      if (!cityToUse?.city) return

      setLoading(true)
      setError(null)

      try {
        const { data, error: fetchError } = await supabase
          .from('neighborhoods')
          .select('*')
          .eq('city_name', cityToUse.city)
          .order('name')

        if (fetchError) throw fetchError

        // Transform Supabase data to match existing component structure
        const transformedData = data.map(n => ({
          id: n.id,
          name: n.name,
          image: n.image_url,
          metrics: {
            pricePerSqm: {
              EUR: { min: n.price_per_sqm_eur_min, max: n.price_per_sqm_eur_max },
              USD: { min: n.price_per_sqm_usd_min, max: n.price_per_sqm_usd_max },
              GBP: { min: n.price_per_sqm_gbp_min, max: n.price_per_sqm_gbp_max }
            },
            rentalYield: { min: n.rental_yield_min, max: n.rental_yield_max },
            daysToRent: { avg: n.days_to_rent_avg },
            priceGrowth5Y: n.price_growth_5y,
            acquisitionTax: n.acquisition_tax,
            avgHoldingTime: n.avg_holding_time,
            daysAvailableToRent: n.days_available_to_rent,
            avgDaysOnMarketSale: n.avg_days_on_market_sale,
            rentPerSqm: {
              EUR: { avg: n.rent_per_sqm_eur },
              USD: { avg: n.rent_per_sqm_usd },
              GBP: { avg: n.rent_per_sqm_gbp }
            },
            rentalGrowth5Y: n.rental_growth_5y,
            avgRentalTime: n.avg_rental_time
          },
          description: n.description
        }))

        setNeighborhoods(transformedData)
      } catch (err) {
        console.error('Error fetching neighborhoods:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchNeighborhoods()
  }, [cityToUse])


  // Helper function to format currency
  const formatCurrency = useCallback((value, currency) => {
    const symbols = { EUR: '€', USD: '$', GBP: '£' }
    return `${symbols[currency] || ''}${value.toLocaleString()}`
  }, [])

  // Metric explanations for tooltips
  const metricExplanations = {
    pricePerSqm: 'Average price range per square meter for properties in this neighborhood',
    rentalYield: 'Annual rental income as a percentage of property value',
    daysToRent: 'Average number of days a property takes to find a tenant',
    acquisitionTax: 'Tax percentage payable on property purchase (transfer tax)',
    avgHoldingTime: 'Average duration investors typically hold properties before selling',
    daysAvailableToRent: 'Average days properties are available on the market before being rented',
    avgDaysOnMarketSale: 'Average number of days a property is listed on the market before being sold',
    rentPerSqm: 'Average monthly rent per square meter',
    avgRentalTime: 'Average lease duration - how long tenants typically stay',
    priceGrowth5Y: 'Historical property price trend over the last 5 years',
    rentalGrowth5Y: 'Historical rental price trend over the last 5 years'
  }

  // Get profile-specific metrics for neighborhood cards
  const getProfileMetrics = useCallback((neighborhood, profile) => {
    const metrics = neighborhood.metrics

    // Base metric always shown
    const priceMetric = {
      label: 'Price/sqm',
      value: `${formatCurrency(metrics.pricePerSqm[selectedCurrency].min, selectedCurrency)} - ${formatCurrency(metrics.pricePerSqm[selectedCurrency].max, selectedCurrency)}`,
      tooltip: metricExplanations.pricePerSqm
    }

    // Default metrics if no profile
    if (!profile) {
      return {
        primary: [
          priceMetric,
          {
            label: 'Rental Yield',
            value: `${metrics.rentalYield.min}% - ${metrics.rentalYield.max}%`,
            tooltip: metricExplanations.rentalYield
          },
          {
            label: 'Days to Rent',
            value: `${metrics.daysToRent.avg} days`,
            tooltip: metricExplanations.daysToRent
          }
        ],
        secondary: [
          { label: 'Acquisition Tax', value: `${metrics.acquisitionTax}%`, tooltip: metricExplanations.acquisitionTax },
          { label: 'Avg Holding Time', value: `${metrics.avgHoldingTime}y`, tooltip: metricExplanations.avgHoldingTime },
          { label: 'Days on Market', value: `${metrics.avgDaysOnMarketSale} days`, tooltip: metricExplanations.avgDaysOnMarketSale },
          { label: 'Rent/m²', value: formatCurrency(metrics.rentPerSqm[selectedCurrency].avg, selectedCurrency), tooltip: metricExplanations.rentPerSqm },
          { label: 'Avg Rental Time', value: `${metrics.avgRentalTime}mo`, tooltip: metricExplanations.avgRentalTime },
          { label: 'Days Available', value: `${metrics.daysAvailableToRent} days`, tooltip: metricExplanations.daysAvailableToRent }
        ]
      }
    }

    // Profile-specific metrics
    switch (profile) {
      case 'Income Seeker':
        return {
          primary: [
            priceMetric,
            {
              label: 'Rental Yield',
              value: `${metrics.rentalYield.min}% - ${metrics.rentalYield.max}%`,
              tooltip: metricExplanations.rentalYield,
              highlight: true // Income Seekers care most about yield
            },
            {
              label: 'Days to Rent',
              value: `${metrics.daysToRent.avg} days`,
              tooltip: metricExplanations.daysToRent,
              colorCode: metrics.daysToRent.avg <= 30 ? 'positive' : metrics.daysToRent.avg <= 60 ? 'neutral' : 'warning'
            },
            {
              label: 'Rent/m²',
              value: formatCurrency(metrics.rentPerSqm[selectedCurrency].avg, selectedCurrency),
              tooltip: metricExplanations.rentPerSqm,
              highlight: true // Shows absolute monthly income potential
            }
          ],
          secondary: [
            {
              label: 'Avg Rental Time',
              value: `${metrics.avgRentalTime}mo`,
              tooltip: metricExplanations.avgRentalTime,
              colorCode: metrics.avgRentalTime >= 12 ? 'positive' : 'neutral'
            },
            {
              label: 'Days Available',
              value: `${metrics.daysAvailableToRent} days`,
              tooltip: metricExplanations.daysAvailableToRent,
              colorCode: metrics.daysAvailableToRent >= 330 ? 'positive' : 'neutral'
            },
            { label: 'Acquisition Tax', value: `${metrics.acquisitionTax}%`, tooltip: metricExplanations.acquisitionTax },
            { label: 'Avg Holding Time', value: `${metrics.avgHoldingTime}y`, tooltip: metricExplanations.avgHoldingTime },
            {
              label: 'Days on Market',
              value: `${metrics.avgDaysOnMarketSale} days`,
              tooltip: metricExplanations.avgDaysOnMarketSale,
              colorCode: metrics.avgDaysOnMarketSale <= 75 ? 'positive' : metrics.avgDaysOnMarketSale <= 120 ? 'neutral' : 'warning'
            },
            {
              label: 'Rental Growth',
              value: `${metrics.rentalGrowth5Y?.[4] >= 0 ? '+' : ''}${metrics.rentalGrowth5Y?.[4]?.toFixed(1)}%`,
              tooltip: metricExplanations.rentalGrowth5Y,
              highlight: true, // Income stability through growing rents
              colorCode: metrics.rentalGrowth5Y?.[4] >= 5 ? 'positive' : metrics.rentalGrowth5Y?.[4] >= 0 ? 'neutral' : 'warning'
            }
          ]
        }

      case 'Growth Hunter':
        return {
          primary: [
            priceMetric,
            {
              label: 'Current Appreciation',
              value: `${metrics.priceGrowth5Y?.[4] >= 0 ? '+' : ''}${metrics.priceGrowth5Y?.[4]?.toFixed(1)}%`,
              tooltip: metricExplanations.priceGrowth5Y,
              highlight: true, // Growth Hunters prioritize appreciation
              colorCode: metrics.priceGrowth5Y?.[4] >= 5 ? 'positive' : metrics.priceGrowth5Y?.[4] >= 0 ? 'neutral' : 'warning'
            },
            {
              label: 'Days on Market',
              value: `${metrics.avgDaysOnMarketSale} days`,
              tooltip: metricExplanations.avgDaysOnMarketSale,
              colorCode: metrics.avgDaysOnMarketSale <= 75 ? 'positive' : metrics.avgDaysOnMarketSale <= 120 ? 'neutral' : 'warning'
            },
            {
              label: 'Rental Growth',
              value: `${metrics.rentalGrowth5Y?.[4] >= 0 ? '+' : ''}${metrics.rentalGrowth5Y?.[4]?.toFixed(1)}%`,
              tooltip: metricExplanations.rentalGrowth5Y,
              colorCode: metrics.rentalGrowth5Y?.[4] >= 5 ? 'positive' : metrics.rentalGrowth5Y?.[4] >= 0 ? 'neutral' : 'warning'
            }
          ],
          secondary: [
            {
              label: 'Avg Holding Time',
              value: `${metrics.avgHoldingTime}y`,
              tooltip: metricExplanations.avgHoldingTime,
              highlight: true
            },
            { label: 'Rental Yield', value: `${metrics.rentalYield.min}% - ${metrics.rentalYield.max}%`, tooltip: metricExplanations.rentalYield },
            { label: 'Days to Rent', value: `${metrics.daysToRent.avg} days`, tooltip: metricExplanations.daysToRent },
            { label: 'Acquisition Tax', value: `${metrics.acquisitionTax}%`, tooltip: metricExplanations.acquisitionTax },
            {
              label: 'Days on Market',
              value: `${metrics.avgDaysOnMarketSale} days`,
              tooltip: metricExplanations.avgDaysOnMarketSale,
              highlight: true, // Exit timing critical for growth hunters
              colorCode: metrics.avgDaysOnMarketSale <= 75 ? 'positive' : metrics.avgDaysOnMarketSale <= 120 ? 'neutral' : 'warning'
            },
            {
              label: 'Price Growth (5Y Avg)',
              value: `${(() => {
                const avg = metrics.priceGrowth5Y.reduce((sum, val) => sum + val, 0) / metrics.priceGrowth5Y.length
                return avg >= 0 ? '+' : ''
              })()}${(metrics.priceGrowth5Y.reduce((sum, val) => sum + val, 0) / metrics.priceGrowth5Y.length).toFixed(1)}%`,
              tooltip: 'Average annual price growth over the past 5 years',
              colorCode: (metrics.priceGrowth5Y.reduce((sum, val) => sum + val, 0) / metrics.priceGrowth5Y.length) >= 5 ? 'positive' : (metrics.priceGrowth5Y.reduce((sum, val) => sum + val, 0) / metrics.priceGrowth5Y.length) >= 0 ? 'neutral' : 'warning'
            }
          ]
        }

      case 'Lifestyle Investor':
        return {
          primary: [
            priceMetric,
            {
              label: 'Rental Yield',
              value: `${metrics.rentalYield.min}% - ${metrics.rentalYield.max}%`,
              tooltip: metricExplanations.rentalYield,
              colorCode: metrics.rentalYield.max >= 5 ? 'positive' : 'neutral'
            },
            {
              label: 'Days to Rent',
              value: `${metrics.daysToRent.avg} days`,
              tooltip: metricExplanations.daysToRent,
              highlight: true, // Lifestyle wants easy management
              colorCode: metrics.daysToRent.avg <= 30 ? 'positive' : metrics.daysToRent.avg <= 60 ? 'neutral' : 'warning'
            },
            {
              label: 'Avg Rental Time',
              value: `${metrics.avgRentalTime}mo`,
              tooltip: metricExplanations.avgRentalTime,
              highlight: true, // Stability = less hassle
              colorCode: metrics.avgRentalTime >= 12 ? 'positive' : metrics.avgRentalTime >= 6 ? 'neutral' : 'warning'
            }
          ],
          secondary: [
            {
              label: 'Days Available',
              value: `${metrics.daysAvailableToRent} days`,
              tooltip: metricExplanations.daysAvailableToRent,
              highlight: true,
              colorCode: metrics.daysAvailableToRent >= 330 ? 'positive' : 'neutral'
            },
            {
              label: 'Price Appreciation',
              value: `${metrics.priceGrowth5Y?.[4] >= 0 ? '+' : ''}${metrics.priceGrowth5Y?.[4]?.toFixed(1)}%`,
              tooltip: metricExplanations.priceGrowth5Y,
              colorCode: metrics.priceGrowth5Y?.[4] >= 5 ? 'positive' : 'neutral'
            },
            { label: 'Avg Holding Time', value: `${metrics.avgHoldingTime}y`, tooltip: metricExplanations.avgHoldingTime },
            { label: 'Acquisition Tax', value: `${metrics.acquisitionTax}%`, tooltip: metricExplanations.acquisitionTax },
            {
              label: 'Days on Market',
              value: `${metrics.avgDaysOnMarketSale} days`,
              tooltip: metricExplanations.avgDaysOnMarketSale,
              colorCode: metrics.avgDaysOnMarketSale <= 75 ? 'positive' : metrics.avgDaysOnMarketSale <= 120 ? 'neutral' : 'warning'
            },
            {
              label: 'Days to Rent',
              value: `${metrics.daysToRent.avg} days`,
              tooltip: metricExplanations.daysToRent,
              highlight: true, // Easy rental management when needed
              colorCode: metrics.daysToRent.avg <= 30 ? 'positive' : metrics.daysToRent.avg <= 60 ? 'neutral' : 'warning'
            }
          ]
        }

      case 'Sophisticated Builder':
        return {
          primary: [
            priceMetric,
            {
              label: 'Rental Yield',
              value: `${metrics.rentalYield.min}% - ${metrics.rentalYield.max}%`,
              tooltip: metricExplanations.rentalYield,
              highlight: true
            },
            {
              label: 'Price Growth',
              value: `${metrics.priceGrowth5Y?.[4] >= 0 ? '+' : ''}${metrics.priceGrowth5Y?.[4]?.toFixed(1)}%`,
              tooltip: metricExplanations.priceGrowth5Y,
              highlight: true,
              colorCode: metrics.priceGrowth5Y?.[4] >= 5 ? 'positive' : metrics.priceGrowth5Y?.[4] >= 0 ? 'neutral' : 'warning'
            },
            {
              label: 'Days on Market',
              value: `${metrics.avgDaysOnMarketSale} days`,
              tooltip: metricExplanations.avgDaysOnMarketSale,
              highlight: true, // Liquidity critical for portfolio optimization
              colorCode: metrics.avgDaysOnMarketSale <= 75 ? 'positive' : metrics.avgDaysOnMarketSale <= 120 ? 'neutral' : 'warning'
            }
          ],
          secondary: [
            {
              label: 'Days to Rent',
              value: `${metrics.daysToRent.avg} days`,
              tooltip: metricExplanations.daysToRent,
              highlight: true,
              colorCode: metrics.daysToRent.avg <= 30 ? 'positive' : 'neutral'
            },
            {
              label: 'Avg Holding Time',
              value: `${metrics.avgHoldingTime}y`,
              tooltip: metricExplanations.avgHoldingTime
            },
            { label: 'Rent/m²', value: formatCurrency(metrics.rentPerSqm[selectedCurrency].avg, selectedCurrency), tooltip: metricExplanations.rentPerSqm },
            { label: 'Acquisition Tax', value: `${metrics.acquisitionTax}%`, tooltip: metricExplanations.acquisitionTax },
            {
              label: 'Days on Market',
              value: `${metrics.avgDaysOnMarketSale} days`,
              tooltip: metricExplanations.avgDaysOnMarketSale,
              colorCode: metrics.avgDaysOnMarketSale <= 75 ? 'positive' : metrics.avgDaysOnMarketSale <= 120 ? 'neutral' : 'warning'
            },
            {
              label: 'Rental Growth',
              value: `${metrics.rentalGrowth5Y?.[4] >= 0 ? '+' : ''}${metrics.rentalGrowth5Y?.[4]?.toFixed(1)}%`,
              tooltip: metricExplanations.rentalGrowth5Y,
              highlight: true, // Dual-optimization: yield + growth
              colorCode: metrics.rentalGrowth5Y?.[4] >= 5 ? 'positive' : metrics.rentalGrowth5Y?.[4] >= 0 ? 'neutral' : 'warning'
            }
          ]
        }

      default:
        return {
          primary: [
            priceMetric,
            {
              label: 'Rental Yield',
              value: `${metrics.rentalYield.min}% - ${metrics.rentalYield.max}%`,
              tooltip: metricExplanations.rentalYield
            },
            {
              label: 'Days to Rent',
              value: `${metrics.daysToRent.avg} days`,
              tooltip: metricExplanations.daysToRent
            }
          ],
          secondary: [
            { label: 'Acquisition Tax', value: `${metrics.acquisitionTax}%`, tooltip: metricExplanations.acquisitionTax },
            { label: 'Avg Holding Time', value: `${metrics.avgHoldingTime}y`, tooltip: metricExplanations.avgHoldingTime },
            { label: 'Days on Market', value: `${metrics.avgDaysOnMarketSale} days`, tooltip: metricExplanations.avgDaysOnMarketSale },
            { label: 'Rent/m²', value: formatCurrency(metrics.rentPerSqm[selectedCurrency].avg, selectedCurrency), tooltip: metricExplanations.rentPerSqm },
            { label: 'Avg Rental Time', value: `${metrics.avgRentalTime}mo`, tooltip: metricExplanations.avgRentalTime },
            { label: 'Days Available', value: `${metrics.daysAvailableToRent} days`, tooltip: metricExplanations.daysAvailableToRent }
          ]
        }
    }
  }, [selectedCurrency, formatCurrency])

  const handleDownloadReport = () => {
    if (cityToUse?.city === 'Dubai') {
      // Open Google Drive PDF in new tab
      window.open('https://drive.google.com/file/d/1odzWtk_v1KGN6ARLfXWUMtXrR5CKKXGf/view?usp=sharing', '_blank')
    } else {
      // Show message for other cities
      alert('Our agents are preparing this information. Take a look at Dubai to see the final result.')
    }
  }

  // Helper function to get color for growth chart based on value
  const getGrowthChartColor = (value) => {
    if (value >= 5) return '#10b981' // Green - Good growth (≥5%)
    if (value >= 0) return '#e5e5e5' // White - Low growth (0-4.9%)
    return '#f59e0b' // Orange - Bad/negative growth (<0%)
  }

  const renderTrendline = (data) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1
    const currentYear = new Date().getFullYear()

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100
      const y = 30 - ((value - min) / range) * 20
      const year = currentYear - (data.length - 1 - index) // Calculate year (5 years ago to now)
      return { x, y, value, year }
    })

    const pathData = points.map((p, i) =>
      `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
    ).join(' ')

    const latestGrowth = data[data.length - 1]
    const chartColor = getGrowthChartColor(latestGrowth)

    return (
      <div className="growth-chart">
        <svg width="110" height="40" viewBox="0 0 110 40" className="trendline-svg">
          <path
            d={pathData}
            fill="none"
            stroke={chartColor}
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
              fill={chartColor}
            >
              <title>{p.year}: {p.value >= 0 ? '+' : ''}{p.value.toFixed(1)}%</title>
            </circle>
          ))}
        </svg>
        <div className="growth-percentage" style={{ color: chartColor }}>
          {latestGrowth >= 0 ? '+' : ''}{latestGrowth.toFixed(1)}%
        </div>
      </div>
    )
  }

  const handleNeighborhoodClick = (neighborhood) => {
    // Navigate to neighborhood detail page
    if (onNeighborhoodSelect) {
      onNeighborhoodSelect(neighborhood)
    }
  }

  return (
    <div className="neighborhood-showcase">
      {/* Navigation Header */}
      <div className="showcase-nav">
        <button className="showcase-back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Cities
        </button>
        <div className="showcase-logo">
          <h2>G6<span>Intelligence</span></h2>
        </div>
      </div>

      {/* City Overview Banner */}
      {loadingOverview && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          Loading city overview...
        </div>
      )}

      {overviewError && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>
          Error loading city overview: {overviewError}
        </div>
      )}

      {!loadingOverview && overview && (
        <div className="city-overview">
          <div className="city-hero-image">
            <img src={overview.heroImage} alt={cityToUse?.city} />
            <div className="city-hero-overlay"></div>
          </div>

          <div className="city-overview-content">
            <div className="city-header">
              <div>
                <h1 className="city-title">{cityToUse?.city}</h1>
                <p className="city-country">{cityToUse?.country}</p>
              </div>
              <button className="download-report-btn" onClick={handleDownloadReport}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>Download Full Report <span className="free-badge">FREE</span></span>
              </button>
            </div>

            <p className="city-description">{overview.description}</p>

            {/* Key Highlights */}
            <div className="city-highlights">
              <h3 className="highlights-title">Key Investment Highlights</h3>
              <div className="highlights-grid">
                {overview.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* City Metrics Summary */}
            <div className="city-metrics-summary">
              <h3 className="metrics-summary-title">City-Wide Averages</h3>
              <div className="metrics-summary-grid">
                <div className="summary-metric">
                  <div className="summary-metric-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <line x1="9" y1="3" x2="9" y2="21"/>
                    </svg>
                  </div>
                  <div className="summary-metric-content">
                    <div className="summary-metric-label">Avg. Price/sqm</div>
                    <div className="summary-metric-value">
                      {formatCurrency(overview.avgMetrics.pricePerSqm[selectedCurrency].min, selectedCurrency)}
                      {' - '}
                      {formatCurrency(overview.avgMetrics.pricePerSqm[selectedCurrency].max, selectedCurrency)}
                    </div>
                  </div>
                </div>

                <div className="summary-metric">
                  <div className="summary-metric-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  <div className="summary-metric-content">
                    <div className="summary-metric-label">Avg. Rental Yield</div>
                    <div className="summary-metric-value">{overview.avgMetrics.rentalYield.avg}%</div>
                  </div>
                </div>

                <div className="summary-metric">
                  <div className="summary-metric-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <div className="summary-metric-content">
                    <div className="summary-metric-label">Avg. Days to Rent</div>
                    <div className="summary-metric-value">{overview.avgMetrics.daysToRent.avg} days</div>
                  </div>
                </div>

                <div className="summary-metric">
                  <div className="summary-metric-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                      <polyline points="17 6 23 6 23 12"/>
                    </svg>
                  </div>
                  <div className="summary-metric-content">
                    <div className="summary-metric-label">5Y Price Growth</div>
                    <div className="summary-metric-value growth">
                      {renderTrendline(overview.avgMetrics.priceGrowth5Y)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Neighborhoods Section Header */}
      <div className="neighborhoods-header">
        <h2 className="neighborhoods-title">Explore Neighborhoods</h2>
        <p className="neighborhoods-subtitle">
          Select neighborhoods to compare opportunities within {cityToUse?.city}
        </p>
      </div>

      {/* Neighborhood Cards Grid */}
      <div className="showcase-content">
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Loading neighborhoods...
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>
            Error loading neighborhoods: {error}
          </div>
        )}

        {!loading && !error && neighborhoods.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No neighborhoods found for {cityToUse?.city}
          </div>
        )}

        <div className="locations-grid">
          {neighborhoods.map((neighborhood) => (
            <div
              key={neighborhood.id}
              className="location-card"
              onClick={() => handleNeighborhoodClick(neighborhood)}
            >
              {/* Image */}
              <div className="location-image">
                <img src={neighborhood.image} alt={neighborhood.name} />
                <div className="location-overlay">
                  <div className="neighborhood-name-badge">{neighborhood.name}</div>
                </div>
              </div>

              {/* Content */}
              <div className="location-card-content">
                <div className="location-header">
                  <h3 className="location-name">{neighborhood.name}</h3>
                </div>

                <p className="location-description">{neighborhood.description}</p>

                {/* Primary Metrics - Profile-Based */}
                <div className="location-metrics">
                  {getProfileMetrics(neighborhood, investorProfile).primary.map((metric, idx) => (
                    <div key={idx} className={`metric ${metric.highlight ? 'metric-highlight' : ''}`}>
                      <div className="metric-label" data-tooltip={metric.tooltip}>
                        {metric.label}
                      </div>
                      <div className={`metric-value ${
                        metric.highlight ? 'highlight' :
                        metric.colorCode === 'positive' ? 'positive' :
                        metric.colorCode === 'warning' ? 'warning' :
                        metric.colorCode === 'neutral' ? 'neutral' :
                        ''
                      }`}>
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Secondary Metrics Grid - Profile-Based */}
                <div className="location-metrics-secondary">
                  {getProfileMetrics(neighborhood, investorProfile).secondary.map((metric, idx) => (
                    <div key={idx} className={`metric-secondary ${metric.highlight ? 'metric-highlight' : ''}`}>
                      <div className="metric-label-with-tooltip" data-tooltip={metric.tooltip}>
                        {metric.label}
                      </div>
                      <div className={`metric-value ${
                        metric.highlight ? 'highlight' :
                        metric.colorCode === 'positive' ? 'positive' :
                        metric.colorCode === 'warning' ? 'warning' :
                        metric.colorCode === 'neutral' ? 'neutral' :
                        ''
                      }`}>
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Growth Charts */}
                <div className="location-growth-dual">
                  <div className="growth-item">
                    <div className="growth-label" data-tooltip={metricExplanations.priceGrowth5Y}>
                      5Y Price Trend
                    </div>
                    {renderTrendline(neighborhood.metrics.priceGrowth5Y)}
                  </div>
                  <div className="growth-item">
                    <div className="growth-label" data-tooltip={metricExplanations.rentalGrowth5Y}>
                      5Y Rental Trend
                    </div>
                    {renderTrendline(neighborhood.metrics.rentalGrowth5Y)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
