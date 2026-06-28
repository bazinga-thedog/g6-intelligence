import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import CommentSystem from './CommentSystem'
import './NeighborhoodDetail.css'

export default function NeighborhoodDetail({ neighborhood, cityName, onBack }) {
  const navigate = useNavigate()
  const [selectedCurrency, setSelectedCurrency] = useState('EUR')
  const [qolData, setQolData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch quality of life data from Supabase
  useEffect(() => {
    const fetchQualityOfLife = async () => {
      if (!neighborhood?.name || !cityName) return

      setLoading(true)
      setError(null)

      try {
        const { data, error: fetchError } = await supabase
          .from('neighborhood_quality_of_life')
          .select('*')
          .eq('city_name', cityName)
          .eq('neighborhood_name', neighborhood.name)
          .single()

        if (fetchError) {
          // If no specific data found, use fallback
          if (fetchError.code === 'PGRST116') {
            setQolData(getFallbackQolData())
          } else {
            throw fetchError
          }
        } else {
          // Transform Supabase data to match component structure
          setQolData({
            popularityFactors: data.popularity_factors || [],
            amenities: {
              restaurants: data.amenities_restaurants,
              cafes: data.amenities_cafes,
              supermarkets: data.amenities_supermarkets,
              schools: data.amenities_schools,
              healthcare: data.amenities_healthcare,
              parks: data.amenities_parks
            },
            transportation: {
              metroStations: data.transport_metro_stations,
              busLines: data.transport_bus_lines,
              tramLines: data.transport_tram_lines,
              walkability: data.transport_walkability
            },
            lifestyle: {
              nightlife: data.lifestyle_nightlife,
              shopping: data.lifestyle_shopping,
              culture: data.lifestyle_culture,
              safety: data.lifestyle_safety
            }
          })
        }
      } catch (err) {
        console.error('Error fetching quality of life data:', err)
        setError(err.message)
        setQolData(getFallbackQolData())
      } finally {
        setLoading(false)
      }
    }

    fetchQualityOfLife()
  }, [neighborhood, cityName])

  // Fallback data for neighborhoods without specific QOL data
  const getFallbackQolData = () => ({
    popularityFactors: [
      'Prime location with excellent connectivity',
      'Growing neighborhood with modern amenities',
      'Strong community atmosphere',
      'Good schools and healthcare facilities',
      'Access to parks and recreation',
      'Safe and family-friendly environment'
    ],
    amenities: {
      restaurants: 50,
      cafes: 25,
      supermarkets: 8,
      schools: 6,
      healthcare: 4,
      parks: 5
    },
    transportation: {
      metroStations: 1,
      busLines: 10,
      tramLines: 0,
      walkability: 85
    },
    lifestyle: {
      nightlife: 'Moderate',
      shopping: 'Local & chains',
      culture: 'Moderate',
      safety: 'High'
    }
  })


  const formatCurrency = (value, currency) => {
    const symbols = { EUR: '€', USD: '$', GBP: '£' }
    return `${symbols[currency] || ''}${value.toLocaleString()}`
  }

  const renderTrendline = (data) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100
      const y = 30 - ((value - min) / range) * 20
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

  return (
    <div className="neighborhood-detail">
      <CommentSystem pageId={`neighborhood-detail-${cityName}-${neighborhood?.name || 'unknown'}`} />

      {/* Navigation Header */}
      <div className="detail-nav">
        <button className="detail-back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to {cityName}
        </button>
        <div className="detail-logo">
          <h2>G6<span>Intelligence</span></h2>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="detail-hero">
        <div className="detail-hero-image">
          <img src={neighborhood.image} alt={neighborhood.name} />
          <div className="detail-hero-overlay"></div>
        </div>
        <div className="detail-hero-content">
          <div className="detail-header">
            <div>
              <h1 className="detail-title">{neighborhood.name}</h1>
              <p className="detail-location">{cityName}</p>
            </div>
          </div>
          <p className="detail-description">{neighborhood.description}</p>
        </div>
      </div>

      {/* Content Container */}
      <div className="detail-content">
        {/* Investment Metrics Section */}
        <section className="detail-section">
          <h2 className="section-title">Investment Metrics</h2>

          <div className="metrics-grid-large">
            <div className="metric-card">
              <div className="metric-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="9" y1="3" x2="9" y2="21"/>
                </svg>
              </div>
              <div className="metric-card-label">Price per sqm</div>
              <div className="metric-card-value">
                {formatCurrency(neighborhood.metrics.pricePerSqm[selectedCurrency].min, selectedCurrency)}
                {' - '}
                {formatCurrency(neighborhood.metrics.pricePerSqm[selectedCurrency].max, selectedCurrency)}
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div className="metric-card-label">Rental Yield</div>
              <div className="metric-card-value highlight">
                {neighborhood.metrics.rentalYield.min}% - {neighborhood.metrics.rentalYield.max}%
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div className="metric-card-label">Days to Rent</div>
              <div className="metric-card-value">{neighborhood.metrics.daysToRent.avg} days</div>
            </div>

            <div className="metric-card">
              <div className="metric-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div className="metric-card-label">Acquisition Tax</div>
              <div className="metric-card-value">{neighborhood.metrics.acquisitionTax}%</div>
            </div>

            <div className="metric-card">
              <div className="metric-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div className="metric-card-label">Avg Holding Time</div>
              <div className="metric-card-value">{neighborhood.metrics.avgHoldingTime} years</div>
            </div>

            <div className="metric-card">
              <div className="metric-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div className="metric-card-label">Rent per sqm</div>
              <div className="metric-card-value">
                {formatCurrency(neighborhood.metrics.rentPerSqm[selectedCurrency].avg, selectedCurrency)}/mo
              </div>
            </div>
          </div>

          {/* Trend Charts */}
          <div className="trends-container">
            <div className="trend-chart-card">
              <h3 className="trend-title">5 Year Price Trend</h3>
              {renderTrendline(neighborhood.metrics.priceGrowth5Y)}
            </div>
            <div className="trend-chart-card">
              <h3 className="trend-title">5 Year Rental Trend</h3>
              {renderTrendline(neighborhood.metrics.rentalGrowth5Y)}
            </div>
          </div>

          {/* CTA - First Position */}
          <div className="investment-cta-card">
            <div className="cta-content">
              <h3 className="cta-title">Ready to explore the details?</h3>
              <p className="cta-description">
                Get a complete breakdown of acquisition costs, holding requirements, and potential returns for investing in {neighborhood.name}
              </p>
            </div>
            <button
              className="cta-button"
              onClick={() => navigate(`/neighborhoods/${cityName}/${neighborhood.name}/investment`, {
                state: { neighborhood, city: { city: cityName } }
              })}
            >
              Explore Investment Details
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </section>

        {/* Why This Neighborhood Section */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Loading neighborhood details...
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>
            Error loading details: {error}
          </div>
        )}

        {!loading && qolData && (
          <>
            <section className="detail-section popularity-section">
              <h2 className="section-title">Why {neighborhood.name}?</h2>
              <p className="section-subtitle">Key factors driving rental demand and property values</p>

              <div className="popularity-grid">
                {qolData.popularityFactors.map((factor, index) => (
              <div key={index} className="popularity-item">
                <div className="popularity-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <span>{factor}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Amenities & Services */}
        <section className="detail-section">
          <h2 className="section-title">Amenities & Services</h2>
          <p className="section-subtitle">Essential facilities within the neighborhood</p>

          <div className="amenities-grid">
            <div className="amenity-stat">
              <div className="amenity-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
                  <path d="M7 2v20"/>
                  <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
                </svg>
              </div>
              <div className="amenity-value">{qolData.amenities.restaurants}</div>
              <div className="amenity-label">Restaurants</div>
            </div>
            <div className="amenity-stat">
              <div className="amenity-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                  <line x1="6" y1="1" x2="6" y2="4"/>
                  <line x1="10" y1="1" x2="10" y2="4"/>
                  <line x1="14" y1="1" x2="14" y2="4"/>
                </svg>
              </div>
              <div className="amenity-value">{qolData.amenities.cafes}</div>
              <div className="amenity-label">Cafés</div>
            </div>
            <div className="amenity-stat">
              <div className="amenity-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
              </div>
              <div className="amenity-value">{qolData.amenities.supermarkets}</div>
              <div className="amenity-label">Supermarkets</div>
            </div>
            <div className="amenity-stat">
              <div className="amenity-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                  <line x1="9" y1="6" x2="9" y2="6"/>
                  <line x1="15" y1="6" x2="15" y2="6"/>
                </svg>
              </div>
              <div className="amenity-value">{qolData.amenities.schools}</div>
              <div className="amenity-label">Schools</div>
            </div>
            <div className="amenity-stat">
              <div className="amenity-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <div className="amenity-value">{qolData.amenities.healthcare}</div>
              <div className="amenity-label">Healthcare</div>
            </div>
            <div className="amenity-stat">
              <div className="amenity-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  <path d="M12 2c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5z"/>
                  <path d="M12 12c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5z"/>
                </svg>
              </div>
              <div className="amenity-value">{qolData.amenities.parks}</div>
              <div className="amenity-label">Parks</div>
            </div>
          </div>
        </section>

        {/* Transportation */}
        <section className="detail-section">
          <h2 className="section-title">Transportation & Accessibility</h2>

          <div className="transportation-grid">
            <div className="transport-card">
              <div className="transport-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="4" y="6" width="16" height="12" rx="2"/>
                  <path d="M4 11h16"/>
                  <circle cx="8" cy="16" r="1"/>
                  <circle cx="16" cy="16" r="1"/>
                  <path d="M7 6V4"/>
                  <path d="M17 6V4"/>
                </svg>
              </div>
              <div className="transport-value">{qolData.transportation.metroStations}</div>
              <div className="transport-label">Metro Stations</div>
            </div>
            <div className="transport-card">
              <div className="transport-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="6" width="18" height="11" rx="2"/>
                  <path d="M3 8h18"/>
                  <circle cx="8" cy="16" r="1"/>
                  <circle cx="16" cy="16" r="1"/>
                  <path d="M7 6V4"/>
                  <path d="M17 6V4"/>
                </svg>
              </div>
              <div className="transport-value">{qolData.transportation.busLines}</div>
              <div className="transport-label">Bus Lines</div>
            </div>
            <div className="transport-card">
              <div className="transport-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="5" y="6" width="14" height="11" rx="2"/>
                  <path d="M5 8h14"/>
                  <circle cx="9" cy="16" r="1"/>
                  <circle cx="15" cy="16" r="1"/>
                  <line x1="3" y1="20" x2="21" y2="20"/>
                </svg>
              </div>
              <div className="transport-value">{qolData.transportation.tramLines}</div>
              <div className="transport-label">Tram Lines</div>
            </div>
            <div className="transport-card">
              <div className="transport-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="5" r="2"/>
                  <path d="M10 22v-6l-2-2v-4l2-2 2 2 2-2 2 2v4l-2 2v6"/>
                  <path d="M8 11l-3 3"/>
                  <path d="M16 11l3 3"/>
                </svg>
              </div>
              <div className="transport-value">{qolData.transportation.walkability}%</div>
              <div className="transport-label">Walkability Score</div>
            </div>
          </div>
        </section>

        {/* Lifestyle Factors */}
        <section className="detail-section">
          <h2 className="section-title">Lifestyle & Culture</h2>

          <div className="lifestyle-grid">
            <div className="lifestyle-card">
              <div className="lifestyle-label">Nightlife</div>
              <div className="lifestyle-badge">{qolData.lifestyle.nightlife}</div>
            </div>
            <div className="lifestyle-card">
              <div className="lifestyle-label">Shopping</div>
              <div className="lifestyle-badge">{qolData.lifestyle.shopping}</div>
            </div>
            <div className="lifestyle-card">
              <div className="lifestyle-label">Culture</div>
              <div className="lifestyle-badge">{qolData.lifestyle.culture}</div>
            </div>
            <div className="lifestyle-card">
              <div className="lifestyle-label">Safety</div>
              <div className="lifestyle-badge">{qolData.lifestyle.safety}</div>
            </div>
          </div>
        </section>

        {/* CTA - Before Properties */}
        <section className="detail-section">
          <div className="investment-cta-card">
            <div className="cta-content">
              <h3 className="cta-title">Interested in investing in {neighborhood.name}?</h3>
              <p className="cta-description">
                Discover the complete financial picture, from acquisition and holding costs to expected returns and exit strategy
              </p>
            </div>
            <button
              className="cta-button"
              onClick={() => navigate(`/neighborhoods/${cityName}/${neighborhood.name}/investment`, {
                state: { neighborhood, city: { city: cityName } }
              })}
            >
              Explore Investment Details
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </section>

        {/* Property Listings Section */}
        <section className="detail-section">
          <h2 className="section-title">Featured Properties in {neighborhood.name}</h2>
          <p className="section-subtitle">Current investment opportunities with strong potential returns</p>

          <div className="properties-grid">
            {/* Property 1 */}
            <div className="property-card">
              <div className="property-image">
                <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop" alt="Modern apartment interior" />
                <div className="property-badge">New Listing</div>
              </div>
              <div className="property-content">
                <div className="property-header">
                  <div className="property-type">2-Bedroom Apartment</div>
                  <div className="property-price">
                    {formatCurrency(385000, selectedCurrency)} - {formatCurrency(462000, selectedCurrency)}
                  </div>
                </div>
                <div className="property-specs">
                  <div className="property-spec">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <line x1="9" y1="3" x2="9" y2="21"/>
                    </svg>
                    <span>92 m²</span>
                  </div>
                  <div className="property-spec">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    </svg>
                    <span>2 bed</span>
                  </div>
                  <div className="property-spec">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="8" width="18" height="12" rx="2"/>
                      <path d="M7 16h10"/>
                    </svg>
                    <span>1 bath</span>
                  </div>
                </div>
                <div className="property-highlights">
                  <span className="highlight-tag">Renovated</span>
                  <span className="highlight-tag">Balcony</span>
                  <span className="highlight-tag">Good Transport</span>
                </div>
              </div>
            </div>

            {/* Property 2 */}
            <div className="property-card">
              <div className="property-image">
                <img src="https://images.unsplash.com/photo-1502672260066-6bc35f0a1b2d?w=800&auto=format&fit=crop" alt="Bright living room with natural light" />
              </div>
              <div className="property-content">
                <div className="property-header">
                  <div className="property-type">1-Bedroom Apartment</div>
                  <div className="property-price">
                    {formatCurrency(265000, selectedCurrency)} - {formatCurrency(318000, selectedCurrency)}
                  </div>
                </div>
                <div className="property-specs">
                  <div className="property-spec">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <line x1="9" y1="3" x2="9" y2="21"/>
                    </svg>
                    <span>68 m²</span>
                  </div>
                  <div className="property-spec">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    </svg>
                    <span>1 bed</span>
                  </div>
                  <div className="property-spec">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="8" width="18" height="12" rx="2"/>
                      <path d="M7 16h10"/>
                    </svg>
                    <span>1 bath</span>
                  </div>
                </div>
                <div className="property-highlights">
                  <span className="highlight-tag">Move-in Ready</span>
                  <span className="highlight-tag">High Demand</span>
                  <span className="highlight-tag">Low Condo Fees</span>
                </div>
              </div>
            </div>

            {/* Property 3 */}
            <div className="property-card">
              <div className="property-image">
                <img src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop" alt="Spacious bedroom with modern design" />
              </div>
              <div className="property-content">
                <div className="property-header">
                  <div className="property-type">3-Bedroom Apartment</div>
                  <div className="property-price">
                    {formatCurrency(520000, selectedCurrency)} - {formatCurrency(624000, selectedCurrency)}
                  </div>
                </div>
                <div className="property-specs">
                  <div className="property-spec">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <line x1="9" y1="3" x2="9" y2="21"/>
                    </svg>
                    <span>125 m²</span>
                  </div>
                  <div className="property-spec">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    </svg>
                    <span>3 bed</span>
                  </div>
                  <div className="property-spec">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="8" width="18" height="12" rx="2"/>
                      <path d="M7 16h10"/>
                    </svg>
                    <span>2 bath</span>
                  </div>
                </div>
                <div className="property-highlights">
                  <span className="highlight-tag">Family Friendly</span>
                  <span className="highlight-tag">Parking Included</span>
                  <span className="highlight-tag">Near Schools</span>
                </div>
              </div>
            </div>

            {/* Property 4 */}
            <div className="property-card">
              <div className="property-image">
                <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop" alt="Contemporary apartment with open plan" />
              </div>
              <div className="property-content">
                <div className="property-header">
                  <div className="property-type">Studio Apartment</div>
                  <div className="property-price">
                    {formatCurrency(195000, selectedCurrency)} - {formatCurrency(234000, selectedCurrency)}
                  </div>
                </div>
                <div className="property-specs">
                  <div className="property-spec">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <line x1="9" y1="3" x2="9" y2="21"/>
                    </svg>
                    <span>45 m²</span>
                  </div>
                  <div className="property-spec">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    </svg>
                    <span>Studio</span>
                  </div>
                  <div className="property-spec">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="8" width="18" height="12" rx="2"/>
                      <path d="M7 16h10"/>
                    </svg>
                    <span>1 bath</span>
                  </div>
                </div>
                <div className="property-highlights">
                  <span className="highlight-tag">High ROI</span>
                  <span className="highlight-tag">Quick Rental</span>
                  <span className="highlight-tag">Modern Finishes</span>
                </div>
              </div>
            </div>
          </div>
        </section>
          </>
        )}
      </div>
    </div>
  )
}
