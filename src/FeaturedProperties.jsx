import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './FeaturedProperties.css'

const PropertyCard = ({ property }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const formatPrice = (price, currency) => {
    const symbols = { EUR: '€', USD: '$', GBP: '£' }
    return `${symbols[currency] || ''}${price.toLocaleString()}`
  }

  return (
    <div className="property-card">
      {/* Hero Image */}
      <div className="property-image-container">
        <img
          src={property.image}
          alt={property.title}
          className={`property-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        <div className="property-image-overlay"></div>

        {/* Badge */}
        {property.badge && (
          <div className={`property-badge badge-${property.badge.toLowerCase().replace(' ', '-')}`}>
            {property.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="property-content">
        {/* Price */}
        <div className="property-price-section">
          <div className="property-price">
            {property.priceRange ? (
              <>
                {formatPrice(property.priceRange.min, property.currency)}
                {' – '}
                {formatPrice(property.priceRange.max, property.currency)}
              </>
            ) : (
              formatPrice(property.price, property.currency)
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="property-title">{property.title}</h3>

        {/* Quick Facts */}
        <div className="property-facts">
          <div className="fact">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span>{property.beds} bed{property.beds !== 1 ? 's' : ''}</span>
          </div>
          <div className="fact">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 10H7V7c0-1.103.897-2 2-2s2 .897 2 2h2c0-2.206-1.794-4-4-4S5 4.794 5 7v3H3a1 1 0 0 0-1 1v2c0 2.606 1.674 4.823 4 5.65V22h2v-3h8v3h2v-3.35c2.326-.827 4-3.044 4-5.65v-2a1 1 0 0 0-1-1zm-1 3c0 2.206-1.794 4-4 4H8c-2.206 0-4-1.794-4-4v-1h16v1z"/>
            </svg>
            <span>{property.baths} bath{property.baths !== 1 ? 's' : ''}</span>
          </div>
          <div className="fact">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 8h-3V4H3c-1.103 0-2 .897-2 2v11h2c0 1.654 1.346 3 3 3s3-1.346 3-3h4c0 1.654 1.346 3 3 3s3-1.346 3-3h3v-5l-3-4zM6 18c-.551 0-1-.449-1-1s.449-1 1-1 1 .449 1 1-.449 1-1 1zm13.001-3H19c0-1.654-1.346-3-3-3s-3 1.346-3 3h-4c0-1.654-1.346-3-3-3s-3 1.346-3 3H3V6h12v6.999h.001l2.999.001 3 4zM16 18c-.551 0-1-.449-1-1s.449-1 1-1 1 .449 1 1-.449 1-1 1z"/>
            </svg>
            <span>{property.area} m²</span>
          </div>
          {property.parking && (
            <div className="fact">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.5 2C7.813 2 4 5.813 4 10.5c0 1.748.536 3.415 1.546 4.82l5.743 8.368a1 1 0 0 0 1.644 0l5.746-8.37C19.464 13.915 20 12.248 20 10.5 20 5.813 16.187 2 11.5 2h1zm0 2a6.5 6.5 0 0 1 6.5 6.5c0 1.267-.39 2.485-1.127 3.52l-5.37 7.82-5.376-7.822C6.39 12.985 6 11.767 6 10.5A6.5 6.5 0 0 1 12.5 4z"/><circle cx="12.5" cy="10.5" r="2.5"/>
              </svg>
              <span>{property.parking} parking</span>
            </div>
          )}
        </div>

        {/* Key Highlights */}
        <div className="property-highlights">
          {property.highlights.slice(0, 3).map((highlight, idx) => (
            <div key={idx} className="highlight-chip">{highlight}</div>
          ))}
        </div>

        {/* Description */}
        <p className="property-description">{property.description}</p>
      </div>
    </div>
  )
}

const PropertyCardSkeleton = () => (
  <div className="property-card skeleton">
    <div className="skeleton-image"></div>
    <div className="property-content">
      <div className="skeleton-price"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-facts"></div>
      <div className="skeleton-highlights"></div>
      <div className="skeleton-description"></div>
      <div className="skeleton-broker"></div>
      <div className="skeleton-cta"></div>
    </div>
  </div>
)

const EmptyState = () => (
  <div className="properties-empty-state">
    <div className="empty-illustration">
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    </div>
    <h3 className="empty-title">No featured properties are currently available in this neighborhood.</h3>
  </div>
)

export default function FeaturedProperties({ cityName, neighborhoodName }) {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProperties = async () => {
      if (!cityName || !neighborhoodName) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await supabase
          .from('properties')
          .select('*')
          .eq('city_name', cityName)
          .eq('neighborhood_name', neighborhoodName)
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(4)

        if (fetchError) throw fetchError

        // Transform data to match component structure
        const transformedProperties = data?.map(prop => ({
          id: prop.id,
          title: prop.title,
          priceRange: { min: prop.price_min, max: prop.price_max },
          currency: prop.currency,
          beds: prop.beds,
          baths: prop.baths,
          area: prop.area,
          parking: prop.parking,
          image: prop.image_url,
          description: prop.description,
          badge: prop.badge,
          highlights: prop.highlights || [],
          propertyUrl: prop.property_url
        })) || []

        setProperties(transformedProperties)
      } catch (err) {
        console.error('Error fetching properties:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [cityName, neighborhoodName])

  const displayProperties = properties.slice(0, 4)

  return (
    <section className="featured-properties-section">
      <div className="properties-header">
        <h2 className="properties-title">Featured Properties</h2>
        <p className="properties-subtitle">Current opportunities from our verified broker partners</p>
      </div>

      <div className="properties-divider"></div>

      {loading ? (
        <div className="properties-grid">
          {[1, 2, 3, 4].map(i => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <EmptyState />
      ) : displayProperties.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="properties-grid">
          {displayProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </section>
  )
}
