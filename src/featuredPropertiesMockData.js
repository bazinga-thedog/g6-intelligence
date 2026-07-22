// Mock data for Featured Properties
// This structure matches the data model requirements

export const mockProperties = [
  {
    id: 1,
    title: 'Modern Marina Apartment',
    priceRange: { min: 365000, max: 405000 },
    currency: 'EUR',
    beds: 2,
    baths: 2,
    area: 92,
    parking: 1,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop',
    description: 'Beautifully renovated apartment within walking distance of the marina, offering excellent rental demand and strong long-term appreciation potential.',
    investmentYield: 7.3,
    badge: 'NEW',
    highlights: ['Sea View', 'Recently Renovated', 'High Rental Demand'],
    brokerName: "Sotheby's International Realty",
    brokerLogo: null, // Will use placeholder with first letter
    brokerVerified: true,
    propertyUrl: 'https://example.com/property/1'
  },
  {
    id: 2,
    title: 'Luxury Waterfront Penthouse',
    priceRange: { min: 695000, max: 755000 },
    currency: 'EUR',
    beds: 3,
    baths: 3,
    area: 145,
    parking: 2,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop',
    description: 'Stunning penthouse with panoramic river views and private terrace. Prime location in historic district with proven rental track record.',
    investmentYield: 5.8,
    badge: 'EXCLUSIVE',
    highlights: ['River Views', 'Private Terrace', 'Concierge'],
    brokerName: 'Savills',
    brokerLogo: null,
    brokerVerified: true,
    propertyUrl: 'https://example.com/property/2'
  },
  {
    id: 3,
    title: 'Victorian Family Home',
    priceRange: { min: 420000, max: 450000 },
    currency: 'GBP',
    beds: 4,
    baths: 2,
    area: 168,
    parking: 1,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=500&fit=crop',
    description: 'Charming period property with original features and modern amenities. Excellent schools nearby and strong family rental demand.',
    investmentYield: 6.2,
    badge: null,
    highlights: ['Period Features', 'Private Garden', 'Near Schools'],
    brokerName: 'Knight Frank',
    brokerLogo: null,
    brokerVerified: true,
    propertyUrl: 'https://example.com/property/3'
  },
  {
    id: 4,
    title: 'Renovated City Centre Duplex',
    priceRange: { min: 280000, max: 310000 },
    currency: 'EUR',
    beds: 2,
    baths: 1,
    area: 78,
    parking: null,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop',
    description: 'Fully refurbished duplex in vibrant city center. Walking distance to metro, universities and cultural attractions. Investment ready.',
    investmentYield: 8.1,
    badge: null,
    highlights: ['Walking to Metro', 'Smart Home', 'Investment Ready'],
    brokerName: 'Engel & Völkers',
    brokerLogo: null,
    brokerVerified: true,
    propertyUrl: 'https://example.com/property/4'
  },
  {
    id: 5,
    title: 'Beachfront Apartment',
    priceRange: { min: 515000, max: 565000 },
    currency: 'EUR',
    beds: 2,
    baths: 2,
    area: 105,
    parking: 1,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=500&fit=crop',
    description: 'Prime beachfront location with direct beach access. Resort-style amenities including pool, gym and 24/7 security. High furnished rental demand.',
    investmentYield: 6.8,
    badge: 'FEATURED',
    highlights: ['Beach Access', 'Pool', 'Gym'],
    brokerName: 'Christie\'s Real Estate',
    brokerLogo: null,
    brokerVerified: true,
    propertyUrl: 'https://example.com/property/5'
  }
]

// Example of how to structure data from an API
export const propertyDataModel = {
  id: 'unique-id', // string or number
  title: 'Property Title', // string, descriptive
  price: 385000, // number, single price
  priceRange: { min: 385000, max: 420000 }, // object, for price ranges (mutually exclusive with price)
  currency: 'EUR', // 'EUR' | 'USD' | 'GBP'
  beds: 2, // number
  baths: 2, // number
  area: 92, // number (in m²)
  parking: 1, // number or null
  image: 'https://...', // string, URL to image
  description: 'Short description...', // string, 2 lines max
  investmentYield: 7.3, // number (percentage)
  badge: 'NEW', // string or null: 'NEW' | 'EXCLUSIVE' | 'PRICE REDUCED' | 'HIGH YIELD' | 'FEATURED'
  highlights: ['Highlight 1', 'Highlight 2', 'Highlight 3'], // array of strings, max 3
  brokerName: 'Broker Name', // string
  brokerLogo: 'https://...' || null, // string (URL) or null for placeholder
  brokerVerified: true, // boolean
  propertyUrl: 'https://...' // string, URL to property details
}
