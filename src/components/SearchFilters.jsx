import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'

const COMMUNITIES = [
  'The Villages, FL',
  'Sun City, AZ',
  'Sun City West, AZ',
  'Laguna Woods Village, CA',
  'Sun City Hilton Head, SC',
  'Sun City Summerlin, NV',
  'Other'
]

const PROPERTY_TYPES = [
  'Patio Villa',
  'Courtyard Villa',
  'Designer / Veranda',
  'Ranch / Cottage',
  'Manufactured',
  'Premier',
  'Other'
]

const RENTAL_TYPES = [
  { value: 'vacation', label: 'Vacation Rental' },
  { value: 'longterm', label: 'Long Term' },
  { value: 'unfurnished', label: 'Unfurnished' }
]

const AMENITIES = [
  'Pool',
  'Golf Cart',
  'Pet Friendly',
  'Garage',
  'Screened Lanai',
  'Lake View',
  'Golf Course View'
]

export default function SearchFilters({ filters, onFilterChange }) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const handleAmenityToggle = (amenity) => {
    const currentAmenities = filters.amenities || []
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity]
    handleChange('amenities', newAmenities)
  }

  const clearFilters = () => {
    onFilterChange({
      search: '',
      community: '',
      propertyType: '',
      rentalType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      amenities: []
    })
  }

  const hasActiveFilters = Object.values(filters).some(v => 
    v && (Array.isArray(v) ? v.length > 0 : true)
  )

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      {/* Main Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by location, property type, or keyword..."
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            className="input-field pl-12"
          />
        </div>
        
        <select
          value={filters.community || ''}
          onChange={(e) => handleChange('community', e.target.value)}
          className="input-field md:w-64"
        >
          <option value="">All Communities</option>
          {COMMUNITIES.map(community => (
            <option key={community} value={community}>{community}</option>
          ))}
        </select>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`btn-outline flex items-center gap-2 ${showAdvanced ? 'bg-palm-50' : ''}`}
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-gray-100 pt-6 mt-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Property Type */}
            <div>
              <label className="label">Property Type</label>
              <select
                value={filters.propertyType || ''}
                onChange={(e) => handleChange('propertyType', e.target.value)}
                className="input-field"
              >
                <option value="">Any Type</option>
                {PROPERTY_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Rental Type */}
            <div>
              <label className="label">Rental Type</label>
              <select
                value={filters.rentalType || ''}
                onChange={(e) => handleChange('rentalType', e.target.value)}
                className="input-field"
              >
                <option value="">Any Rental Type</option>
                {RENTAL_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="label">Bedrooms</label>
              <select
                value={filters.bedrooms || ''}
                onChange={(e) => handleChange('bedrooms', e.target.value)}
                className="input-field"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="label">Price Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ''}
                  onChange={(e) => handleChange('minPrice', e.target.value)}
                  className="input-field w-1/2"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleChange('maxPrice', e.target.value)}
                  className="input-field w-1/2"
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-4">
            <label className="label">Amenities</label>
            <div className="flex flex-wrap gap-2">
              {AMENITIES.map(amenity => (
                <button
                  key={amenity}
                  onClick={() => handleAmenityToggle(amenity)}
                  className={`px-4 py-2 rounded-full text-base transition-all ${
                    (filters.amenities || []).includes(amenity)
                      ? 'bg-palm-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}
