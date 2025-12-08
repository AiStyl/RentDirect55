import { useState } from 'react'
import { Upload, X, Plus, Loader2 } from 'lucide-react'

const COMMUNITIES = [
  'The Villages, FL',
  'Sun City, AZ',
  'Sun City West, AZ',
  'Laguna Woods Village, CA',
  'Sun City Hilton Head, SC',
  'Sun City Summerlin, NV',
  'Sun City Palm Desert, CA',
  'Del Webb Community',
  'On Top of the World, FL',
  'Kings Point, FL',
  'Century Village, FL',
  'Other'
]

const PROPERTY_TYPES = [
  'Patio Villa',
  'Courtyard Villa',
  'Designer / Veranda',
  'Ranch / Cottage',
  'Manufactured',
  'Premier',
  'Carriage Villa',
  'Cabana / Bungalow',
  'Other'
]

const RENTAL_TYPES = [
  { value: 'vacation', label: 'Vacation Rental (Furnished)' },
  { value: 'longterm', label: 'Long Term (Furnished)' },
  { value: 'unfurnished', label: 'Long Term (Unfurnished)' }
]

const PRICE_TYPES = [
  { value: 'night', label: 'Per Night' },
  { value: 'week', label: 'Per Week' },
  { value: 'month', label: 'Per Month' }
]

const AMENITIES = [
  'Pool',
  'Golf Cart Included',
  'Golf Cart Garage',
  'Pet Friendly',
  'Garage',
  'Screened Lanai',
  'Lake View',
  'Golf Course View',
  'WiFi',
  'Cable TV',
  'Washer/Dryer',
  'Fully Equipped Kitchen',
  'King Bed',
  'Queen Bed',
  'Walk-in Shower',
  'Wheelchair Accessible'
]

export default function ListingForm({ initialData = {}, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    propertyType: initialData.propertyType || '',
    community: initialData.community || '',
    address: initialData.address || '',
    bedrooms: initialData.bedrooms || '2',
    bathrooms: initialData.bathrooms || '2',
    rentalType: initialData.rentalType || 'vacation',
    price: initialData.price || '',
    priceType: initialData.priceType || 'month',
    amenities: initialData.amenities || [],
    contactEmail: initialData.contactEmail || '',
    availableFrom: initialData.availableFrom || '',
    availableTo: initialData.availableTo || '',
    images: initialData.images || []
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const maxImages = 10

    if (formData.images.length + files.length > maxImages) {
      setErrors(prev => ({
        ...prev,
        images: `Maximum ${maxImages} images allowed.`
      }))
      return
    }

    // For now, create object URLs (in production, upload to Firebase Storage)
    const newImages = files.map(file => URL.createObjectURL(file))
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }))
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.propertyType) newErrors.propertyType = 'Property type is required'
    if (!formData.community) newErrors.community = 'Community is required'
    if (!formData.price) newErrors.price = 'Price is required'
    if (!formData.contactEmail) {
      newErrors.contactEmail = 'Email address is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-display">Property Details</h2>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="label">Listing Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Beautiful Patio Villa with Golf Cart"
              className={`input-field ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="label">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe your property, its features, and what makes it special..."
              className={`input-field ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Property Type & Community */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Property Type *</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className={`input-field ${errors.propertyType ? 'border-red-500' : ''}`}
              >
                <option value="">Select Type</option>
                {PROPERTY_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>}
            </div>

            <div>
              <label className="label">Community *</label>
              <select
                name="community"
                value={formData.community}
                onChange={handleChange}
                className={`input-field ${errors.community ? 'border-red-500' : ''}`}
              >
                <option value="">Select Community</option>
                {COMMUNITIES.map(community => (
                  <option key={community} value={community}>{community}</option>
                ))}
              </select>
              {errors.community && <p className="text-red-500 text-sm mt-1">{errors.community}</p>}
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Bedrooms</label>
              <select
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="input-field"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Bathrooms</label>
              <select
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="input-field"
              >
                {['1', '1.5', '2', '2.5', '3', '3.5', '4'].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Details */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-display">Rental Information</h2>

        <div className="space-y-6">
          {/* Rental Type */}
          <div>
            <label className="label">Rental Type *</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {RENTAL_TYPES.map(type => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rentalType: type.value }))}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    formData.rentalType === type.value
                      ? 'border-palm-600 bg-palm-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-semibold">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Price *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  className={`input-field pl-8 ${errors.price ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="label">Price Period</label>
              <select
                name="priceType"
                value={formData.priceType}
                onChange={handleChange}
                className="input-field"
              >
                {PRICE_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Available From</label>
              <input
                type="date"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Available To (optional)</label>
              <input
                type="date"
                name="availableTo"
                value={formData.availableTo}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-display">Amenities</h2>

        <div className="flex flex-wrap gap-3">
          {AMENITIES.map(amenity => (
            <button
              key={amenity}
              type="button"
              onClick={() => handleAmenityToggle(amenity)}
              className={`px-4 py-2 rounded-full text-base transition-all ${
                formData.amenities.includes(amenity)
                  ? 'bg-palm-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {amenity}
            </button>
          ))}
        </div>
      </section>

      {/* Photos */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 font-display">Photos</h2>
        <p className="text-gray-500 mb-6">Upload up to 10 photos to showcase your property.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {formData.images.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img src={image} alt={`Property ${index + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {formData.images.length < 10 && (
            <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-palm-500 cursor-pointer flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-palm-600 transition-colors">
              <Upload className="w-8 h-8" />
              <span className="text-sm">Add Photo</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
        {errors.images && <p className="text-red-500 text-sm mt-2">{errors.images}</p>}
      </section>

      {/* Contact Info */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 font-display">Contact Information</h2>
        <p className="text-gray-500 mb-6">Your email is kept private. Renters will contact you through our secure form and inquiries will be sent to your email.</p>

        <div>
          <label className="label">Email Address *</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="your@email.com"
            className={`input-field max-w-md ${errors.contactEmail ? 'border-red-500' : ''}`}
          />
          {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
        </div>
      </section>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary flex items-center gap-2 min-w-[200px] justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              {initialData.id ? 'Update Listing' : 'Create Listing'}
            </>
          )}
        </button>
      </div>
    </form>
  )
}
