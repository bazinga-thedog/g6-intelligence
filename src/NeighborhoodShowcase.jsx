import { useState } from 'react'
import CommentSystem from './CommentSystem'
import './NeighborhoodShowcase.css'

export default function NeighborhoodShowcase({ selectedCity, onBack, onNeighborhoodSelect }) {
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState('EUR')

  // City overview data
  const cityOverview = {
    'Lisbon': {
      heroImage: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1600&h=600&fit=crop',
      description: 'Portugal\'s capital combines rich history with modern amenities, offering investors a unique blend of culture and growth potential. The city has seen consistent appreciation driven by international demand, golden visa programs, and a thriving tourism sector.',
      highlights: [
        'Growing tech hub with international companies',
        'Strong short-term rental market',
        'Golden visa residency program',
        'Mediterranean lifestyle and climate'
      ],
      avgMetrics: {
        pricePerSqm: {
          EUR: { min: 4500, max: 7200 },
          USD: { min: 4900, max: 7800 },
          GBP: { min: 3900, max: 6200 }
        },
        rentalYield: { avg: 5.5 },
        daysToRent: { avg: 30 },
        priceGrowth5Y: [9.2, 13.5, 16.8, 20.2, 23.5]
      }
    },
    'Dubai': {
      heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&h=600&fit=crop',
      description: 'A global business and tourism hub, Dubai offers investors tax-free returns, world-class infrastructure, and strong rental yields. The city continues to attract international investors with its strategic location, stability, and ambitious development plans.',
      highlights: [
        'Zero property tax and capital gains tax',
        'High rental yields (6-8% average)',
        'Strong expat demand and tourism',
        'World-class infrastructure and connectivity'
      ],
      avgMetrics: {
        pricePerSqm: {
          EUR: { min: 3200, max: 6800 },
          USD: { min: 3500, max: 7400 },
          GBP: { min: 2800, max: 6000 }
        },
        rentalYield: { avg: 6.8 },
        daysToRent: { avg: 24 },
        priceGrowth5Y: [8.8, 13.2, 18.5, 23.8, 27.5]
      }
    },
    'Porto': {
      heroImage: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1600&h=600&fit=crop',
      description: 'Portugal\'s second city has emerged as a prime investment destination, offering excellent value compared to Lisbon while maintaining strong growth potential. The UNESCO World Heritage historic center and vibrant cultural scene attract both tourists and digital nomads.',
      highlights: [
        'Lower entry prices than Lisbon',
        'UNESCO World Heritage historic center',
        'Growing digital nomad community',
        'Excellent quality of life'
      ],
      avgMetrics: {
        pricePerSqm: {
          EUR: { min: 3200, max: 5800 },
          USD: { min: 3500, max: 6300 },
          GBP: { min: 2800, max: 5000 }
        },
        rentalYield: { avg: 6.2 },
        daysToRent: { avg: 36 },
        priceGrowth5Y: [10.5, 15.2, 20.5, 25.8, 30.2]
      }
    }
  }

  // Mock neighborhood data for each city
  const neighborhoodData = {
    'Lisbon': [
      {
        id: 1,
        name: 'Alfama',
        image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800',
        metrics: {
          pricePerSqm: {
            EUR: { min: 5200, max: 8500 },
            USD: { min: 5700, max: 9200 },
            GBP: { min: 4500, max: 7400 }
          },
          rentalYield: { min: 5.2, max: 6.8 },
          daysToRent: { avg: 28 },
          priceGrowth5Y: [10.5, 14.2, 17.8, 21.5, 24.8],
          acquisitionTax: 6.5, // percentage
          avgHoldingTime: 8.5, // years
          daysAvailableToRent: 22, // days on market
          rentPerSqm: {
            EUR: { avg: 18 },
            USD: { avg: 20 },
            GBP: { avg: 16 }
          },
          rentalGrowth5Y: [4.2, 5.8, 7.5, 9.2, 11.5], // percentage per year
          avgRentalTime: 14 // months - average lease duration
        },
        description: 'Historic neighborhood with cobblestone streets and stunning views'
      },
      {
        id: 2,
        name: 'Chiado',
        image: 'https://images.unsplash.com/photo-1588534176924-267bb0020618?w=800',
        metrics: {
          pricePerSqm: {
            EUR: { min: 6500, max: 10200 },
            USD: { min: 7100, max: 11100 },
            GBP: { min: 5600, max: 9000 }
          },
          rentalYield: { min: 4.8, max: 6.2 },
          daysToRent: { avg: 22 },
          priceGrowth5Y: [12.8, 16.5, 19.8, 23.2, 26.5],
          acquisitionTax: 6.5,
          avgHoldingTime: 9.2,
          daysAvailableToRent: 18,
          rentPerSqm: {
            EUR: { avg: 22 },
            USD: { avg: 24 },
            GBP: { avg: 19 }
          },
          rentalGrowth5Y: [5.5, 7.2, 8.8, 10.5, 12.8],
          avgRentalTime: 12
        },
        description: 'Upscale area with luxury shopping and cultural attractions'
      },
      {
        id: 3,
        name: 'Belém',
        image: 'https://images.unsplash.com/photo-1581880191784-6c49c98a5af5?w=800',
        metrics: {
          pricePerSqm: {
            EUR: { min: 4800, max: 7200 },
            USD: { min: 5200, max: 7800 },
            GBP: { min: 4100, max: 6300 }
          },
          rentalYield: { min: 4.5, max: 5.9 },
          daysToRent: { avg: 35 },
          priceGrowth5Y: [8.5, 11.8, 15.2, 18.8, 22.1],
          acquisitionTax: 6.5,
          avgHoldingTime: 7.8,
          daysAvailableToRent: 28,
          rentPerSqm: { EUR: { avg: 15 }, USD: { avg: 16 }, GBP: { avg: 13 } },
          rentalGrowth5Y: [3.8, 5.2, 6.8, 8.5, 10.2],
          avgRentalTime: 15
        },
        description: 'Riverside district with historic monuments and parks'
      },
      {
        id: 4,
        name: 'Parque das Nações',
        image: 'https://images.unsplash.com/photo-1598990386997-48fd3f8d6e23?w=800',
        metrics: {
          pricePerSqm: {
            EUR: { min: 4200, max: 6500 },
            USD: { min: 4600, max: 7100 },
            GBP: { min: 3600, max: 5600 }
          },
          rentalYield: { min: 5.5, max: 7.2 },
          daysToRent: { avg: 25 },
          priceGrowth5Y: [9.2, 13.5, 17.2, 20.8, 24.5],
          acquisitionTax: 6.5,
          avgHoldingTime: 6.5,
          daysAvailableToRent: 20,
          rentPerSqm: { EUR: { avg: 16 }, USD: { avg: 17 }, GBP: { avg: 14 } },
          rentalGrowth5Y: [4.5, 6.2, 7.8, 9.5, 11.8],
          avgRentalTime: 13
        },
        description: 'Modern waterfront area with contemporary architecture'
      },
      {
        id: 5,
        name: 'Príncipe Real',
        image: 'https://images.unsplash.com/photo-1599982699571-e8e6c8e4bfbb?w=800',
        metrics: {
          pricePerSqm: {
            EUR: { min: 5800, max: 9200 },
            USD: { min: 6300, max: 10000 },
            GBP: { min: 5000, max: 8000 }
          },
          rentalYield: { min: 4.2, max: 5.8 },
          daysToRent: { avg: 30 },
          priceGrowth5Y: [11.5, 15.8, 19.5, 22.8, 26.2],
          acquisitionTax: 6.5,
          avgHoldingTime: 8.8,
          daysAvailableToRent: 25,
          rentPerSqm: { EUR: { avg: 20 }, USD: { avg: 22 }, GBP: { avg: 17 } },
          rentalGrowth5Y: [5.2, 6.8, 8.5, 10.2, 12.5],
          avgRentalTime: 12
        },
        description: 'Trendy neighborhood with garden squares and boutiques'
      },
      {
        id: 6,
        name: 'Santos',
        image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
        metrics: {
          pricePerSqm: {
            EUR: { min: 5000, max: 7800 },
            USD: { min: 5400, max: 8500 },
            GBP: { min: 4300, max: 6800 }
          },
          rentalYield: { min: 5.0, max: 6.5 },
          daysToRent: { avg: 32 },
          priceGrowth5Y: [9.8, 13.2, 16.8, 20.2, 23.8],
          acquisitionTax: 6.5,
          avgHoldingTime: 7.5,
          daysAvailableToRent: 26,
          rentPerSqm: { EUR: { avg: 17 }, USD: { avg: 18 }, GBP: { avg: 15 } },
          rentalGrowth5Y: [4.8, 6.5, 8.2, 10.0, 11.8],
          avgRentalTime: 14
        },
        description: 'Bohemian area with nightlife and creative scene'
      }
    ],
    'Dubai': [
      {
        id: 1,
        name: 'Dubai Marina',
        image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800',
        metrics: {
          pricePerSqm: {
            EUR: { min: 4500, max: 8200 },
            USD: { min: 4900, max: 8900 },
            GBP: { min: 3900, max: 7200 }
          },
          rentalYield: { min: 6.5, max: 8.2 },
          daysToRent: { avg: 20 },
          priceGrowth5Y: [8.5, 12.8, 18.5, 24.2, 28.5],
          acquisitionTax: 4.0,
          avgHoldingTime: 5.5,
          daysAvailableToRent: 15,
          rentPerSqm: { EUR: { avg: 24 }, USD: { avg: 26 }, GBP: { avg: 21 } },
          rentalGrowth5Y: [6.5, 8.8, 11.5, 14.2, 16.8],
          avgRentalTime: 11
        },
        description: 'Waterfront living with stunning skyline views'
      },
      {
        id: 2,
        name: 'Downtown Dubai',
        image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800',
        metrics: {
          pricePerSqm: {
            EUR: { min: 6200, max: 11500 },
            USD: { min: 6700, max: 12500 },
            GBP: { min: 5400, max: 10100 }
          },
          rentalYield: { min: 5.2, max: 7.0 },
          daysToRent: { avg: 18 },
          priceGrowth5Y: [10.2, 15.5, 20.8, 25.2, 29.8],
          acquisitionTax: 4.0,
          avgHoldingTime: 6.2,
          daysAvailableToRent: 12,
          rentPerSqm: { EUR: { avg: 28 }, USD: { avg: 30 }, GBP: { avg: 24 } },
          rentalGrowth5Y: [5.8, 7.8, 10.5, 13.2, 15.8],
          avgRentalTime: 12
        },
        description: 'Iconic location with Burj Khalifa and Dubai Mall'
      },
      {
        id: 3,
        name: 'Palm Jumeirah',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        metrics: {
          pricePerSqm: {
            EUR: { min: 7500, max: 15000 },
            USD: { min: 8100, max: 16300 },
            GBP: { min: 6500, max: 13100 }
          },
          rentalYield: { min: 4.8, max: 6.5 },
          daysToRent: { avg: 25 },
          priceGrowth5Y: [12.5, 16.8, 21.5, 26.8, 31.2],
          acquisitionTax: 4.0,
          avgHoldingTime: 7.8,
          daysAvailableToRent: 18,
          rentPerSqm: { EUR: { avg: 35 }, USD: { avg: 38 }, GBP: { avg: 30 } },
          rentalGrowth5Y: [7.2, 9.5, 12.5, 15.2, 18.5],
          avgRentalTime: 11
        },
        description: 'Exclusive island with luxury beachfront properties'
      },
      {
        id: 4,
        name: 'Business Bay',
        image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800',
        metrics: {
          pricePerSqm: {
            EUR: { min: 3800, max: 6500 },
            USD: { min: 4100, max: 7100 },
            GBP: { min: 3300, max: 5700 }
          },
          rentalYield: { min: 7.0, max: 9.2 },
          daysToRent: { avg: 22 },
          priceGrowth5Y: [7.2, 11.5, 16.8, 22.5, 26.8],
          acquisitionTax: 4.0,
          avgHoldingTime: 4.8,
          daysAvailableToRent: 16,
          rentPerSqm: { EUR: { avg: 22 }, USD: { avg: 24 }, GBP: { avg: 19 } },
          rentalGrowth5Y: [7.8, 10.2, 13.5, 16.8, 19.5],
          avgRentalTime: 12
        },
        description: 'Central business district with modern high-rises'
      },
      {
        id: 5,
        name: 'Jumeirah Beach Residence',
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800',
        metrics: {
          pricePerSqm: {
            EUR: { min: 5200, max: 9200 },
            USD: { min: 5700, max: 10000 },
            GBP: { min: 4500, max: 8000 }
          },
          rentalYield: { min: 6.2, max: 7.8 },
          daysToRent: { avg: 24 },
          priceGrowth5Y: [9.5, 14.2, 19.5, 24.8, 29.2],
          acquisitionTax: 4.0,
          avgHoldingTime: 5.8,
          daysAvailableToRent: 17,
          rentPerSqm: { EUR: { avg: 26 }, USD: { avg: 28 }, GBP: { avg: 22 } },
          rentalGrowth5Y: [6.8, 9.2, 12.2, 15.5, 18.2],
          avgRentalTime: 11
        },
        description: 'Beachfront community with resort-style living'
      }
    ],
    'Porto': [
      {
        id: 1,
        name: 'Ribeira',
        image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800',
        metrics: {
          pricePerSqm: {
            EUR: { min: 4200, max: 7200 },
            USD: { min: 4600, max: 7800 },
            GBP: { min: 3600, max: 6300 }
          },
          rentalYield: { min: 6.2, max: 8.0 },
          daysToRent: { avg: 30 },
          priceGrowth5Y: [12.5, 18.2, 22.8, 27.5, 32.8],
          acquisitionTax: 6.5,
          avgHoldingTime: 7.2,
          daysAvailableToRent: 24,
          rentPerSqm: { EUR: { avg: 19 }, USD: { avg: 21 }, GBP: { avg: 16 } },
          rentalGrowth5Y: [6.2, 8.5, 11.2, 14.5, 17.8],
          avgRentalTime: 13
        },
        description: 'UNESCO World Heritage riverside district'
      },
      {
        id: 2,
        name: 'Foz do Douro',
        image: 'https://images.unsplash.com/photo-1583937443569-d9be3cddf402?w=800',
        metrics: {
          pricePerSqm: {
            EUR: { min: 5500, max: 9200 },
            USD: { min: 6000, max: 10000 },
            GBP: { min: 4800, max: 8000 }
          },
          rentalYield: { min: 4.8, max: 6.2 },
          daysToRent: { avg: 35 },
          priceGrowth5Y: [10.2, 15.8, 20.5, 25.2, 29.8],
          acquisitionTax: 6.5,
          avgHoldingTime: 9.5,
          daysAvailableToRent: 28,
          rentPerSqm: { EUR: { avg: 22 }, USD: { avg: 24 }, GBP: { avg: 19 } },
          rentalGrowth5Y: [4.8, 6.8, 9.2, 11.8, 14.5],
          avgRentalTime: 14
        },
        description: 'Coastal neighborhood with beaches and seafood restaurants'
      },
      {
        id: 3,
        name: 'Boavista',
        image: 'https://images.unsplash.com/photo-1562095241-8c6714fd4178?w=800',
        metrics: {
          pricePerSqm: {
            EUR: { min: 3800, max: 6200 },
            USD: { min: 4100, max: 6700 },
            GBP: { min: 3300, max: 5400 }
          },
          rentalYield: { min: 5.5, max: 7.2 },
          daysToRent: { avg: 38 },
          priceGrowth5Y: [9.5, 14.8, 19.2, 24.5, 28.8],
          acquisitionTax: 6.5,
          avgHoldingTime: 6.8,
          daysAvailableToRent: 30,
          rentPerSqm: { EUR: { avg: 16 }, USD: { avg: 17 }, GBP: { avg: 14 } },
          rentalGrowth5Y: [5.5, 7.5, 9.8, 12.5, 15.2],
          avgRentalTime: 13
        },
        description: 'Modern area with shopping and business centers'
      },
      {
        id: 4,
        name: 'Cedofeita',
        image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800',
        metrics: {
          pricePerSqm: {
            EUR: { min: 3200, max: 5500 },
            USD: { min: 3500, max: 6000 },
            GBP: { min: 2800, max: 4800 }
          },
          rentalYield: { min: 6.0, max: 7.5 },
          daysToRent: { avg: 40 },
          priceGrowth5Y: [8.8, 13.5, 18.8, 23.2, 27.5],
          acquisitionTax: 6.5,
          avgHoldingTime: 6.2,
          daysAvailableToRent: 32,
          rentPerSqm: { EUR: { avg: 14 }, USD: { avg: 15 }, GBP: { avg: 12 } },
          rentalGrowth5Y: [5.2, 7.2, 9.5, 12.2, 14.8],
          avgRentalTime: 14
        },
        description: 'Artistic neighborhood with galleries and cultural venues'
      }
    ]
  }

  const neighborhoods = neighborhoodData[selectedCity?.city] || []
  const overview = cityOverview[selectedCity?.city]

  // Metric explanations for tooltips
  const metricExplanations = {
    pricePerSqm: 'Average price range per square meter for properties in this neighborhood',
    rentalYield: 'Annual rental income as a percentage of property value',
    daysToRent: 'Average number of days a property takes to find a tenant',
    acquisitionTax: 'Tax percentage payable on property purchase (transfer tax)',
    avgHoldingTime: 'Average duration investors typically hold properties before selling',
    daysAvailableToRent: 'Average days properties are available on the market before being rented',
    rentPerSqm: 'Average monthly rent per square meter',
    avgRentalTime: 'Average lease duration - how long tenants typically stay',
    priceGrowth5Y: 'Historical property price trend over the last 5 years',
    rentalGrowth5Y: 'Historical rental price trend over the last 5 years'
  }

  const handleDownloadReport = () => {
    alert('Feature not implemented yet - Full city investment report coming soon!')
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

  const handleNeighborhoodClick = (neighborhood) => {
    // Navigate to neighborhood detail page
    if (onNeighborhoodSelect) {
      onNeighborhoodSelect(neighborhood)
    }
  }

  return (
    <div className="neighborhood-showcase">
      <CommentSystem pageId={`neighborhoods-${selectedCity?.city || 'unknown'}`} />

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
      {overview && (
        <div className="city-overview">
          <div className="city-hero-image">
            <img src={overview.heroImage} alt={selectedCity?.city} />
            <div className="city-hero-overlay"></div>
          </div>

          <div className="city-overview-content">
            <div className="city-header">
              <div>
                <h1 className="city-title">{selectedCity?.city}</h1>
                <p className="city-country">{selectedCity?.country}</p>
              </div>
              <button className="download-report-btn" onClick={handleDownloadReport}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Full Report
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
          Select neighborhoods to compare opportunities within {selectedCity?.city}
        </p>
      </div>

      {/* Neighborhood Cards Grid */}
      <div className="showcase-content">
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
                  <div className="location-country-badge">{neighborhood.name}</div>
                </div>
              </div>

              {/* Content */}
              <div className="location-card-content">
                <div className="location-header">
                  <h3 className="location-name">{neighborhood.name}</h3>
                </div>

                <p className="location-description">{neighborhood.description}</p>

                {/* Primary Metrics */}
                <div className="location-metrics">
                  <div className="metric">
                    <div className="metric-label" data-tooltip={metricExplanations.pricePerSqm}>
                      Price/sqm
                    </div>
                    <div className="metric-value">
                      {formatCurrency(neighborhood.metrics.pricePerSqm[selectedCurrency].min, selectedCurrency)}
                      {' - '}
                      {formatCurrency(neighborhood.metrics.pricePerSqm[selectedCurrency].max, selectedCurrency)}
                    </div>
                  </div>
                  <div className="metric">
                    <div className="metric-label" data-tooltip={metricExplanations.rentalYield}>
                      Rental Yield
                    </div>
                    <div className="metric-value growth">
                      {neighborhood.metrics.rentalYield.min}% - {neighborhood.metrics.rentalYield.max}%
                    </div>
                  </div>
                  <div className="metric">
                    <div className="metric-label" data-tooltip={metricExplanations.daysToRent}>
                      Days to Rent
                    </div>
                    <div className="metric-value">{neighborhood.metrics.daysToRent.avg} days</div>
                  </div>
                </div>

                {/* Secondary Metrics Grid */}
                <div className="location-metrics-secondary">
                  <div className="metric-secondary">
                    <div className="metric-label-with-tooltip" data-tooltip={metricExplanations.acquisitionTax}>
                      Acquisition Tax
                    </div>
                    <div className="metric-value">{neighborhood.metrics.acquisitionTax}%</div>
                  </div>
                  <div className="metric-secondary">
                    <div className="metric-label-with-tooltip" data-tooltip={metricExplanations.avgHoldingTime}>
                      Avg Holding Time
                    </div>
                    <div className="metric-value">{neighborhood.metrics.avgHoldingTime}y</div>
                  </div>
                  <div className="metric-secondary">
                    <div className="metric-label-with-tooltip" data-tooltip={metricExplanations.daysAvailableToRent}>
                      Days Available
                    </div>
                    <div className="metric-value">{neighborhood.metrics.daysAvailableToRent}d</div>
                  </div>
                  <div className="metric-secondary">
                    <div className="metric-label-with-tooltip" data-tooltip={metricExplanations.rentPerSqm}>
                      Rent/sqm
                    </div>
                    <div className="metric-value">
                      {formatCurrency(neighborhood.metrics.rentPerSqm[selectedCurrency].avg, selectedCurrency)}
                    </div>
                  </div>
                  <div className="metric-secondary">
                    <div className="metric-label-with-tooltip" data-tooltip={metricExplanations.avgRentalTime}>
                      Avg Rental Time
                    </div>
                    <div className="metric-value">{neighborhood.metrics.avgRentalTime}mo</div>
                  </div>
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
