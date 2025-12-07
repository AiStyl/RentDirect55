import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Search, Home, Users, DollarSign, Shield, ArrowRight, CheckCircle } from 'lucide-react'

export default function HomePage() {
  const { user, signInWithGoogle } = useAuth()

  const handleGetStarted = async () => {
    if (!user) {
      await signInWithGoogle()
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display leading-tight">
              Rent Direct from Owners in 55+ Communities
            </h1>
            <p className="text-xl md:text-2xl text-palm-100 mb-8 leading-relaxed">
              No fees. No middleman. Connect directly with property owners in The Villages, 
              Sun City, and other active adult communities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/browse" className="btn-secondary flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Browse Rentals
              </Link>
              <Link to="/add-listing" className="bg-white text-palm-700 hover:bg-palm-50 font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-lg flex items-center justify-center gap-2">
                <Home className="w-5 h-5" />
                List Your Property Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 bg-sand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="w-14 h-14 bg-palm-100 rounded-xl flex items-center justify-center mb-5">
                <DollarSign className="w-7 h-7 text-palm-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-display">Free to List</h3>
              <p className="text-gray-600 text-lg">
                List your property at no cost. No subscription fees, no listing fees, 
                no commission on rentals.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="w-14 h-14 bg-sunset-100 rounded-xl flex items-center justify-center mb-5">
                <Users className="w-7 h-7 text-sunset-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-display">Direct Communication</h3>
              <p className="text-gray-600 text-lg">
                Connect directly with owners or renters. No booking platform 
                in the middle taking a cut.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                <Shield className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-display">Built for 55+</h3>
              <p className="text-gray-600 text-lg">
                Designed specifically for active adult communities. Easy to use, 
                with listings from real community members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-display">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Simple, straightforward rentals without the complexity
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Owners */}
            <div className="bg-palm-50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6 font-display flex items-center gap-3">
                <Home className="w-7 h-7 text-palm-600" />
                For Property Owners
              </h3>
              <ul className="space-y-4">
                {[
                  'Sign in with your Google account',
                  'Create your listing with photos and details',
                  'Add your contact information',
                  'Renters reach out to you directly',
                  'Handle all arrangements privately'
                ].map((step, index) => (
                  <li key={index} className="flex items-start gap-3 text-lg">
                    <CheckCircle className="w-6 h-6 text-palm-600 flex-shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
              <Link 
                to="/add-listing"
                className="btn-primary mt-8 inline-flex items-center gap-2"
              >
                List Your Property
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* For Renters */}
            <div className="bg-sunset-50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6 font-display flex items-center gap-3">
                <Search className="w-7 h-7 text-sunset-600" />
                For Renters
              </h3>
              <ul className="space-y-4">
                {[
                  'Browse available properties — no account needed',
                  'Filter by community, type, price, and amenities',
                  'View listing details and photos',
                  'Contact owners directly via email or phone',
                  'Arrange your rental privately with the owner'
                ].map((step, index) => (
                  <li key={index} className="flex items-start gap-3 text-lg">
                    <CheckCircle className="w-6 h-6 text-sunset-600 flex-shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
              <Link 
                to="/browse"
                className="btn-secondary mt-8 inline-flex items-center gap-2"
              >
                Browse Rentals
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Communities */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-display">
            Serving 55+ Communities Nationwide
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Starting with The Villages, FL and expanding to active adult communities across America
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'The Villages, FL',
              'Sun City, AZ',
              'Sun City West, AZ',
              'Laguna Woods, CA',
              'Sun City Hilton Head, SC',
              'Sun City Summerlin, NV',
              'On Top of the World, FL',
              'More Coming Soon...'
            ].map((community, index) => (
              <div 
                key={index}
                className={`bg-gray-800 rounded-lg p-4 text-center ${
                  index === 0 ? 'ring-2 ring-palm-500' : ''
                }`}
              >
                <span className="text-lg">{community}</span>
                {index === 0 && (
                  <span className="block text-palm-400 text-sm mt-1">Featured</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-sand-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Whether you're looking for your next rental or have a property to list, 
            RentDirect55 makes it simple.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse" className="btn-primary flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Find a Rental
            </Link>
            <Link to="/add-listing" className="btn-outline flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              List Your Property
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
