import { useState } from 'react'
import CommentSystem from './CommentSystem'
import './NeighborhoodDetail.css'

export default function NeighborhoodDetail({ neighborhood, cityName, onBack }) {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR')

  // Quality of life data for neighborhoods
  const qualityOfLifeData = {
    // Lisbon neighborhoods
    'Alfama': {
      popularityFactors: [
        'Authentic Portuguese atmosphere with historic charm',
        'Panoramic views from Miradouros (viewpoints)',
        'Fado music culture and traditional restaurants',
        'Walking distance to major tourist attractions',
        'Strong short-term rental demand',
        'Unique architectural character'
      ],
      amenities: {
        restaurants: 85,
        cafes: 42,
        supermarkets: 8,
        schools: 5,
        healthcare: 3,
        parks: 4
      },
      transportation: {
        metroStations: 0,
        busLines: 12,
        tramLines: 2,
        walkability: 95
      },
      lifestyle: {
        nightlife: 'Moderate',
        shopping: 'Local boutiques',
        culture: 'Very High',
        safety: 'High'
      }
    },
    'Chiado': {
      popularityFactors: [
        'Prime central location with luxury shopping',
        'Cultural hub with theaters and museums',
        'High-end restaurants and cafes',
        'Premium architectural heritage',
        'Wealthy resident demographic',
        'International business presence'
      ],
      amenities: {
        restaurants: 120,
        cafes: 68,
        supermarkets: 12,
        schools: 8,
        healthcare: 6,
        parks: 3
      },
      transportation: {
        metroStations: 2,
        busLines: 18,
        tramLines: 3,
        walkability: 98
      },
      lifestyle: {
        nightlife: 'High',
        shopping: 'Luxury brands',
        culture: 'Very High',
        safety: 'Very High'
      }
    },
    'Dubai Marina': {
      popularityFactors: [
        'Waterfront living with marina views',
        'Modern high-rise apartments',
        'Beach and water sports access',
        'International dining and entertainment',
        'Expat-friendly community',
        'Premium lifestyle amenities'
      ],
      amenities: {
        restaurants: 200,
        cafes: 95,
        supermarkets: 18,
        schools: 12,
        healthcare: 8,
        parks: 6
      },
      transportation: {
        metroStations: 2,
        busLines: 15,
        tramLines: 1,
        walkability: 85
      },
      lifestyle: {
        nightlife: 'Very High',
        shopping: 'International brands',
        culture: 'Moderate',
        safety: 'Very High'
      }
    },
    'Downtown Dubai': {
      popularityFactors: [
        'Iconic Burj Khalifa address',
        'World-class shopping at Dubai Mall',
        'Premium corporate environment',
        'Luxury residential towers',
        'High-profile location prestige',
        'Maximum rental yield potential'
      ],
      amenities: {
        restaurants: 250,
        cafes: 110,
        supermarkets: 15,
        schools: 10,
        healthcare: 12,
        parks: 4
      },
      transportation: {
        metroStations: 3,
        busLines: 20,
        tramLines: 0,
        walkability: 80
      },
      lifestyle: {
        nightlife: 'High',
        shopping: 'Luxury & International',
        culture: 'High',
        safety: 'Very High'
      }
    },
    'Ribeira': {
      popularityFactors: [
        'UNESCO World Heritage Site',
        'Riverside dining and entertainment',
        'Historic Porto atmosphere',
        'Tourist hotspot with high occupancy',
        'Iconic Dom Luís I Bridge views',
        'Port wine cellars nearby'
      ],
      amenities: {
        restaurants: 95,
        cafes: 48,
        supermarkets: 6,
        schools: 4,
        healthcare: 3,
        parks: 5
      },
      transportation: {
        metroStations: 1,
        busLines: 10,
        tramLines: 1,
        walkability: 92
      },
      lifestyle: {
        nightlife: 'High',
        shopping: 'Local artisans',
        culture: 'Very High',
        safety: 'High'
      }
    }
  }

  const qolData = qualityOfLifeData[neighborhood.name] || {
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
  }

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
        </section>

        {/* Why This Neighborhood Section */}
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
              <div className="amenity-icon">🍽️</div>
              <div className="amenity-value">{qolData.amenities.restaurants}</div>
              <div className="amenity-label">Restaurants</div>
            </div>
            <div className="amenity-stat">
              <div className="amenity-icon">☕</div>
              <div className="amenity-value">{qolData.amenities.cafes}</div>
              <div className="amenity-label">Cafés</div>
            </div>
            <div className="amenity-stat">
              <div className="amenity-icon">🛒</div>
              <div className="amenity-value">{qolData.amenities.supermarkets}</div>
              <div className="amenity-label">Supermarkets</div>
            </div>
            <div className="amenity-stat">
              <div className="amenity-icon">🏫</div>
              <div className="amenity-value">{qolData.amenities.schools}</div>
              <div className="amenity-label">Schools</div>
            </div>
            <div className="amenity-stat">
              <div className="amenity-icon">🏥</div>
              <div className="amenity-value">{qolData.amenities.healthcare}</div>
              <div className="amenity-label">Healthcare</div>
            </div>
            <div className="amenity-stat">
              <div className="amenity-icon">🌳</div>
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
              <div className="transport-icon">🚇</div>
              <div className="transport-value">{qolData.transportation.metroStations}</div>
              <div className="transport-label">Metro Stations</div>
            </div>
            <div className="transport-card">
              <div className="transport-icon">🚌</div>
              <div className="transport-value">{qolData.transportation.busLines}</div>
              <div className="transport-label">Bus Lines</div>
            </div>
            <div className="transport-card">
              <div className="transport-icon">🚊</div>
              <div className="transport-value">{qolData.transportation.tramLines}</div>
              <div className="transport-label">Tram Lines</div>
            </div>
            <div className="transport-card">
              <div className="transport-icon">🚶</div>
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
      </div>
    </div>
  )
}
