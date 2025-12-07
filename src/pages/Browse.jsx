import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore'
import { db } from '../firebase/config'
import PropertyCard from '../components/PropertyCard'
import SearchFilters from '../components/SearchFilters'
import { Home, Loader2 } from 'lucide-react'

// Sample data for demo (remove when Firebase is connected)
const SAMPLE_PROPERTIES = [
  {
    id: '1',
    title: 'Beautiful Patio Villa with Golf Cart',
    propertyType: 'Patio Villa',
    community: 'The Villages, FL',
    bedrooms: 2,
    bathrooms: 2,
    price: 2500,
    priceType: 'month',
    rentalType: 'vacation',
    description: 'Lovely patio villa in a prime location...',
    amenities: ['Golf Cart', 'Pool', 'Screened Lanai', 'WiFi'],
    images: []
  },
  {
    id: '2',
    title: 'Spacious Designer Home Near Brownwood',
    propertyType: 'Designer / Veranda',
    community: 'The Villages, FL',
    bedrooms: 3,
    bathrooms: 2,
    price: 3200,
    priceType: 'month',
    rentalType: 'longterm',
    description: 'Stunning designer home with modern updates...',
    amenities: ['Golf Cart Garage', 'Lake View', 'Garage', 'WiFi'],
    images: []
  },
  {
    id: '3',
    title: 'Cozy Courtyard Villa - Pet Friendly',
    propertyType: 'Courtyard Villa',
    community: 'The Villages, FL',
    bedrooms: 2,
    bathrooms: 2,
    price: 1800,
    priceType: 'month',
    rentalType: 'unfurnished',
    description: 'Perfect courtyard villa for pet lovers...',
    amenities: ['Pet Friendly', 'Screened Lanai', 'Washer/Dryer'],
    images: []
  },
  {
    id: '4',
    title: 'Premier Home with Golf Course View',
    propertyType: 'Premier',
    community: 'The Villages, FL',
    bedrooms: 3,
    bathrooms: 2.5,
    price: 4500,
    priceType: 'month',
    rentalType: 'vacation',
    description: 'Luxurious premier home overlooking the golf course...',
    amenities: ['Pool', 'Golf Course View', 'Golf Cart', 'King Bed'],
    images: []
  },
  {
    id: '5',
    title: 'Charming Ranch with Private Pool',
    propertyType: 'Ranch / Cottage',
    community: 'Sun City, AZ',
    bedrooms: 2,
    bathrooms: 2,
    price: 2200,
    priceType: 'month',
    rentalType: 'vacation',
    description: 'Beautiful ranch-style home with private pool...',
    amenities: ['Pool', 'Garage', 'WiFi', 'Cable TV'],
    images: []
  },
  {
    id: '6',
    title: 'Modern Villa - Walk to Town Square',
    propertyType: 'Patio Villa',
    community: 'The Villages, FL',
    bedrooms: 2,
    bathrooms: 2,
    price: 150,
    priceType: 'night',
    rentalType: 'vacation',
    description: 'Perfect location for a Villages getaway...',
    amenities: ['Golf Cart', 'WiFi', 'Fully Equipped Kitchen'],
    images: []
  }
]

export default function Browse() {
  const [properties, setProperties] = useState(SAMPLE_PROPERTIES)
  const [filteredProperties, setFilteredProperties] = useState(SAMPLE_PROPERTIES)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    community: '',
    propertyType: '',
    rentalType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    amenities: []
  })

  // Uncomment when Firebase is connected
  // useEffect(() => {
  //   setLoading(true)
  //   const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'))
  //   
  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const propertyList = snapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data()
  //     }))
  //     setProperties(propertyList)
  //     setLoading(false)
  //   })
  //
  //   return unsubscribe
  // }, [])

  // Filter properties
  useEffect(() => {
    let result = [...properties]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.community.toLowerCase().includes(searchLower) ||
        p.propertyType.toLowerCase().includes(searchLower)
      )
    }

    // Community filter
    if (filters.community) {
      result = result.filter(p => p.community === filters.community)
    }

    // Property type filter
    if (filters.propertyType) {
      result = result.filter(p => p.propertyType === filters.propertyType)
    }

    // Rental type filter
    if (filters.rentalType) {
      result = result.filter(p => p.rentalType === filters.rentalType)
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      result = result.filter(p => p.bedrooms >= parseInt(filters.bedrooms))
    }

    // Price filters
    if (filters.minPrice) {
      result = result.filter(p => p.price >= parseInt(filters.minPrice))
    }
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= parseInt(filters.maxPrice))
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      result = result.filter(p => 
        filters.amenities.every(amenity => 
          p.amenities?.includes(amenity)
        )
      )
    }

    setFilteredProperties(result)
  }, [filters, properties])

  return (
    <div className="min-h-screen bg-sand-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-display">
            Browse Rental Properties
          </h1>
          <p className="text-lg text-gray-600">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} available
          </p>
        </div>

        {/* Filters */}
        <SearchFilters filters={filters} onFilterChange={setFilters} />

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-palm-600 animate-spin" />
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => setFilters({
                search: '',
                community: '',
                propertyType: '',
                rentalType: '',
                minPrice: '',
                maxPrice: '',
                bedrooms: '',
                amenities: []
              })}
              className="btn-outline"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
