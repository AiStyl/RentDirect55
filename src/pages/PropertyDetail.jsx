import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import emailjs from '@emailjs/browser'
import {
  Bed, Bath, Home, MapPin, DollarSign, Mail, Phone,
  Calendar, ChevronLeft, ChevronRight, CheckCircle,
  ArrowLeft, Share2, Heart, X, Loader2, Send
} from 'lucide-react'

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_ykgelrl'
const EMAILJS_TEMPLATE_ID = 'template_24w8jrb'
const EMAILJS_PUBLIC_KEY = 'a5JkMuqcRN2Vck8s5'

// Sample property for demo
const SAMPLE_PROPERTY = {
  id: '1',
  title: 'Beautiful Patio Villa with Golf Cart',
  propertyType: 'Patio Villa',
  community: 'The Villages, FL',
  bedrooms: 2,
  bathrooms: 2,
  price: 2500,
  priceType: 'month',
  rentalType: 'vacation',
  description: `This lovely patio villa is located in a prime location within The Villages.

Perfect for snowbirds or anyone looking to experience the Villages lifestyle! The home features an open floor plan with updated kitchen, comfortable living areas, and a beautiful screened lanai overlooking the backyard.

Golf cart is included with the rental, making it easy to get around to all the town squares, recreation centers, and golf courses.

The home is fully furnished and includes all utilities except electric. Cable TV and high-speed WiFi included.

Minimum 30-day rental required. No smoking. Small pets considered with deposit.`,
  amenities: ['Golf Cart', 'Pool', 'Screened Lanai', 'WiFi', 'Cable TV', 'Washer/Dryer', 'Fully Equipped Kitchen'],
  images: [],
  contactEmail: 'owner@example.com',
  availableFrom: '2024-01-15',
  availableTo: '2024-12-31',
  createdAt: new Date()
}

// Contact Modal Component
function ContactModal({ isOpen, onClose, property }) {
  const [formData, setFormData] = useState({
    renter_name: '',
    renter_email: '',
    renter_phone: '',
    message: ''
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.renter_name.trim()) {
      setError('Please enter your name')
      return
    }
    if (!formData.renter_email.trim()) {
      setError('Please enter your email')
      return
    }
    if (!formData.message.trim()) {
      setError('Please enter a message')
      return
    }

    setSending(true)
    setError('')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          owner_email: property.contactEmail,
          listing_title: property.title,
          renter_name: formData.renter_name,
          renter_email: formData.renter_email,
          renter_phone: formData.renter_phone || 'Not provided',
          message: formData.message
        },
        EMAILJS_PUBLIC_KEY
      )
      setSent(true)
    } catch (err) {
      console.error('EmailJS Error:', err)
      setError('Failed to send message. Please try again.')
    }
    setSending(false)
  }

  const handleClose = () => {
    setFormData({ renter_name: '', renter_email: '', renter_phone: '', message: '' })
    setSent(false)
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold font-display">Contact Owner</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          // Success State
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
            <p className="text-gray-600 mb-6">
              Your inquiry has been sent to the property owner. They will contact you directly at the email you provided.
            </p>
            <button
              onClick={handleClose}
              className="btn-primary"
            >
              Close
            </button>
          </div>
        ) : (
          // Form
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Send a message to the owner about: <strong>{property.title}</strong>
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                name="renter_name"
                value={formData.renter_name}
                onChange={handleChange}
                placeholder="John Smith"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Email *
              </label>
              <input
                type="email"
                name="renter_email"
                value={formData.renter_email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Phone (optional)
              </label>
              <input
                type="tel"
                name="renter_phone"
                value={formData.renter_phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Hi, I'm interested in renting your property. I'd like to know more about..."
                className="input-field"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {sending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Your contact information will be shared with the property owner so they can respond to your inquiry.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

export default function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState(SAMPLE_PROPERTY)
  const [loading, setLoading] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [saved, setSaved] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  // Uncomment when Firebase is connected
  // useEffect(() => {
  //   const fetchProperty = async () => {
  //     setLoading(true)
  //     try {
  //       const docRef = doc(db, 'properties', id)
  //       const docSnap = await getDoc(docRef)
  //       if (docSnap.exists()) {
  //         setProperty({ id: docSnap.id, ...docSnap.data() })
  //       }
  //     } catch (error) {
  //       console.error('Error fetching property:', error)
  //     }
  //     setLoading(false)
  //   }
  //   fetchProperty()
  // }, [id])

  const priceLabel = {
    night: '/night',
    week: '/week',
    month: '/month'
  }[property.priceType] || '/month'

  const rentalTypeLabels = {
    vacation: 'Vacation Rental',
    longterm: 'Long Term Rental',
    unfurnished: 'Unfurnished Rental'
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: property.title,
        text: `Check out this rental: ${property.title}`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const nextImage = () => {
    if (property.images?.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === property.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (property.images?.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.images.length - 1 : prev - 1
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-palm-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sand-50 pb-12">
      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        property={property}
      />

      {/* Back Button */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-palm-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to listings
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative aspect-video bg-gray-100">
                {property.images?.length > 0 ? (
                  <>
                    <img
                      src={property.images[currentImageIndex]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {property.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center img-placeholder">
                    <Home className="w-24 h-24 text-sand-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Title & Quick Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-palm-100 text-palm-700 rounded-full text-sm font-medium mb-3">
                    {rentalTypeLabels[property.rentalType]}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-display">
                    {property.title}
                  </h1>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSaved(!saved)}
                    className={`p-3 rounded-full transition-colors ${
                      saved ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-3 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-5 h-5 text-palm-600" />
                <span className="text-lg">{property.community}</span>
              </div>

              <div className="flex flex-wrap gap-4 text-gray-700">
                <span className="flex items-center gap-2 bg-sand-100 px-3 py-1.5 rounded-lg">
                  <Home className="w-5 h-5" />
                  {property.propertyType}
                </span>
                <span className="flex items-center gap-2 bg-sand-100 px-3 py-1.5 rounded-lg">
                  <Bed className="w-5 h-5" />
                  {property.bedrooms} Bedrooms
                </span>
                <span className="flex items-center gap-2 bg-sand-100 px-3 py-1.5 rounded-lg">
                  <Bath className="w-5 h-5" />
                  {property.bathrooms} Bathrooms
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 font-display">About This Property</h2>
              <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {property.description}
              </div>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 font-display">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <CheckCircle className="w-5 h-5 text-palm-600" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Contact Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-28">
              {/* Price */}
              <div className="text-center mb-6 pb-6 border-b border-gray-100">
                <div className="text-4xl font-bold text-palm-700">
                  ${property.price?.toLocaleString()}
                </div>
                <div className="text-gray-500 text-lg">{priceLabel}</div>
              </div>

              {/* Availability */}
              {property.availableFrom && (
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <Calendar className="w-5 h-5 text-palm-600" />
                    <span className="font-medium">Availability</span>
                  </div>
                  <p className="text-gray-600">
                    From {new Date(property.availableFrom).toLocaleDateString()}
                    {property.availableTo && (
                      <> to {new Date(property.availableTo).toLocaleDateString()}</>
                    )}
                  </p>
                </div>
              )}

              {/* Contact Button */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Interested in this property?</h3>
                <p className="text-sm text-gray-600">
                  Send a message to the owner and they'll contact you directly.
                </p>

                <button
                  onClick={() => setShowContactModal(true)}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Contact Owner
                </button>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100">
                RentDirect55 is a listing service only. Contact the owner directly
                to discuss terms, verify details, and arrange your rental.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
