import { Link } from 'react-router-dom'
import { Bed, Bath, Home, MapPin, DollarSign } from 'lucide-react'

export default function PropertyCard({ property }) {
  const {
    id,
    title,
    propertyType,
    community,
    bedrooms,
    bathrooms,
    price,
    priceType,
    rentalType,
    images,
    amenities = []
  } = property

  const mainImage = images?.[0] || null
  
  const priceLabel = {
    night: '/night',
    week: '/week',
    month: '/month'
  }[priceType] || '/month'

  const rentalTypeColors = {
    vacation: 'bg-sunset-100 text-sunset-700',
    longterm: 'bg-palm-100 text-palm-700',
    unfurnished: 'bg-blue-100 text-blue-700'
  }

  const rentalTypeLabels = {
    vacation: 'Vacation',
    longterm: 'Long Term',
    unfurnished: 'Unfurnished'
  }

  return (
    <Link to={`/property/${id}`} className="card card-hover block">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        {mainImage ? (
          <img 
            src={mainImage} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full img-placeholder">
            <Home className="w-16 h-16 text-sand-400" />
          </div>
        )}
        
        {/* Rental Type Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold ${rentalTypeColors[rentalType] || 'bg-gray-100 text-gray-700'}`}>
          {rentalTypeLabels[rentalType] || rentalType}
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
          <span className="text-xl font-bold text-palm-700">${price?.toLocaleString()}</span>
          <span className="text-gray-500 text-sm">{priceLabel}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1 font-display">
          {title}
        </h3>
        
        {/* Location */}
        <div className="flex items-center gap-1.5 text-gray-600 mb-3">
          <MapPin className="w-4 h-4 text-palm-600" />
          <span className="text-base">{community}</span>
        </div>

        {/* Property Type & Details */}
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <span className="text-sm bg-sand-100 px-2 py-1 rounded">{propertyType}</span>
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{bedrooms} bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{bathrooms} bath</span>
          </div>
        </div>

        {/* Amenities Preview */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {amenities.slice(0, 3).map((amenity, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                {amenity}
              </span>
            ))}
            {amenities.length > 3 && (
              <span className="text-xs text-gray-400">
                +{amenities.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
