import React, { useState, useEffect } from 'react';

// Sample data for The Villages
const sampleListings = [
  {
    id: '1',
    title: 'Charming Patio Villa in Village of Sunset Pointe',
    homeType: 'Patio Villa',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1450,
    rentalType: 'vacation',
    pricePerMonth: 3500,
    pricePerWeek: 1200,
    minimumStay: '1 week',
    description: 'Beautiful, fully furnished patio villa with golf cart included. Located steps from Brownwood Paddock Square. Open floor plan, updated kitchen, screened lanai overlooking pond. Perfect for snowbirds or vacation getaway.',
    amenities: ['Golf Cart Included', 'Private Pool', 'Screened Lanai', 'Pet Friendly', 'WiFi', 'Smart TV'],
    neighborhood: 'Village of Sunset Pointe',
    contactName: 'Robert & Mary',
    contactEmail: 'robertmary55@email.com',
    contactPhone: '(352) 555-0123',
    photos: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ],
    availableFrom: '2025-01-15',
    status: 'active',
    views: 234,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Spacious Designer Home with Pool',
    homeType: 'Designer',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    rentalType: 'long-term',
    pricePerMonth: 2800,
    minimumStay: '6 months',
    description: 'Stunning designer home available for long-term rental. Unfurnished. Private heated pool, 2-car garage, gourmet kitchen with granite counters. Located in desirable Village of Mallory Square near Lake Sumter Landing.',
    amenities: ['Private Pool', 'Heated Pool', '2-Car Garage', 'Gourmet Kitchen', 'Walk-in Closets'],
    neighborhood: 'Village of Mallory Square',
    contactName: 'James',
    contactEmail: 'jamesvillages@email.com',
    contactPhone: '(352) 555-0456',
    photos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    availableFrom: '2025-02-01',
    status: 'active',
    views: 156,
    isFeatured: false
  },
  {
    id: '3',
    title: 'Cozy Courtyard Villa - Turnkey Ready',
    homeType: 'Courtyard Villa',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1320,
    rentalType: 'vacation',
    pricePerMonth: 2900,
    pricePerWeek: 950,
    minimumStay: '2 weeks',
    description: 'Move-in ready courtyard villa with everything you need. Golf cart included, fully stocked kitchen, comfortable furnishings. Quiet location with beautiful courtyard views. Close to recreation centers and golf courses.',
    amenities: ['Golf Cart Included', 'Fully Furnished', 'WiFi', 'Cable TV', 'Washer/Dryer'],
    neighborhood: 'Village of Hemingway',
    contactName: 'Susan',
    contactEmail: 'susan.villages@email.com',
    photos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ],
    availableFrom: '2025-01-01',
    status: 'active',
    views: 89,
    isFeatured: false
  },
  {
    id: '4',
    title: 'Premium Ranch Home on Golf Course',
    homeType: 'Ranch',
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2400,
    rentalType: 'either',
    pricePerMonth: 4200,
    pricePerWeek: 1500,
    minimumStay: '1 month',
    description: 'Executive ranch home directly on championship golf course. Wake up to stunning fairway views. Fully furnished with high-end finishes. Golf cart with extended range battery. Perfect for the serious golfer.',
    amenities: ['Golf Course View', 'Golf Cart Included', 'Screened Lanai', 'Gourmet Kitchen', 'King Beds', 'WiFi'],
    neighborhood: 'Village of DeLuna',
    contactName: 'Tom & Linda',
    contactEmail: 'tlgolfhome@email.com',
    contactPhone: '(352) 555-0789',
    photos: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c4?w=800',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800'
    ],
    availableFrom: '2025-03-01',
    status: 'active',
    views: 312,
    isFeatured: true
  }
];

const homeTypes = [
  'All Types',
  'Patio Villa',
  'Courtyard Villa', 
  'Designer',
  'Ranch',
  'Manufactured',
  'Premier',
  'Cottage'
];

const amenitiesList = [
  'Golf Cart Included',
  'Private Pool',
  'Heated Pool',
  'Pet Friendly',
  'Screened Lanai',
  'Golf Course View',
  'Waterfront',
  'Furnished',
  'Unfurnished',
  'WiFi',
  'Garage'
];

// Icons as simple SVG components
const Icons = {
  Home: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Bed: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l1.5-3h15L21 7" />
    </svg>
  ),
  Bath: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Star: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  ArrowLeft: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  X: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
};

// Header Component
const Header = ({ currentPage, setCurrentPage, setSelectedListing }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white border-b-4 border-emerald-600 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <button 
            onClick={() => { setCurrentPage('home'); setSelectedListing(null); }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl">55</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">RentDirect55</h1>
              <p className="text-xs text-emerald-600 -mt-0.5">Owner to Renter. Direct.</p>
            </div>
          </button>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => { setCurrentPage('browse'); setSelectedListing(null); }}
              className={`text-base font-medium transition-colors ${currentPage === 'browse' ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'}`}
            >
              Browse Rentals
            </button>
            <button 
              onClick={() => setCurrentPage('list')}
              className={`text-base font-medium transition-colors ${currentPage === 'list' ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'}`}
            >
              List Your Home
            </button>
            <button 
              onClick={() => setCurrentPage('pricing')}
              className={`text-base font-medium transition-colors ${currentPage === 'pricing' ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'}`}
            >
              Pricing
            </button>
            <button 
              onClick={() => setCurrentPage('login')}
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-base"
            >
              Owner Login
            </button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-3">
              <button 
                onClick={() => { setCurrentPage('browse'); setSelectedListing(null); setMobileMenuOpen(false); }}
                className="text-left px-2 py-2 text-lg font-medium text-gray-700 hover:text-emerald-600"
              >
                Browse Rentals
              </button>
              <button 
                onClick={() => { setCurrentPage('list'); setMobileMenuOpen(false); }}
                className="text-left px-2 py-2 text-lg font-medium text-gray-700 hover:text-emerald-600"
              >
                List Your Home
              </button>
              <button 
                onClick={() => { setCurrentPage('pricing'); setMobileMenuOpen(false); }}
                className="text-left px-2 py-2 text-lg font-medium text-gray-700 hover:text-emerald-600"
              >
                Pricing
              </button>
              <button 
                onClick={() => { setCurrentPage('login'); setMobileMenuOpen(false); }}
                className="bg-emerald-600 text-white px-4 py-3 rounded-lg font-semibold text-lg mt-2"
              >
                Owner Login
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Footer Component
const Footer = ({ setCurrentPage }) => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">55</span>
            </div>
            <span className="text-xl font-bold text-white">RentDirect55</span>
          </div>
          <p className="text-gray-400 mb-4 max-w-md">
            Connecting property owners directly with renters in 55+ active adult communities. 
            No middleman fees. No booking commissions. Just direct, simple connections.
          </p>
          <p className="text-sm text-gray-500">
            © 2025 RentDirect55. All rights reserved.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">For Renters</h4>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => setCurrentPage('browse')} className="hover:text-emerald-400 transition-colors">Browse Rentals</button></li>
            <li><button className="hover:text-emerald-400 transition-colors">How It Works</button></li>
            <li><button className="hover:text-emerald-400 transition-colors">FAQ</button></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">For Owners</h4>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => setCurrentPage('list')} className="hover:text-emerald-400 transition-colors">List Your Home</button></li>
            <li><button onClick={() => setCurrentPage('pricing')} className="hover:text-emerald-400 transition-colors">Pricing</button></li>
            <li><button onClick={() => setCurrentPage('login')} className="hover:text-emerald-400 transition-colors">Owner Login</button></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-6 text-sm">
          <button onClick={() => setCurrentPage('terms')} className="hover:text-emerald-400 transition-colors">Terms of Service</button>
          <button onClick={() => setCurrentPage('privacy')} className="hover:text-emerald-400 transition-colors">Privacy Policy</button>
        </div>
        <p className="text-sm text-gray-500">
          Not affiliated with The Villages® or any community developer.
        </p>
      </div>
    </div>
  </footer>
);

// Home Page
const HomePage = ({ setCurrentPage, setSelectedListing }) => (
  <div>
    {/* Hero Section */}
    <section className="relative bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Find Your Perfect<br />
            <span className="text-emerald-200">55+ Community</span> Rental
          </h1>
          <p className="text-xl sm:text-2xl text-emerald-100 mb-8 leading-relaxed">
            Connect directly with property owners. No middleman fees.<br className="hidden sm:block" />
            No booking commissions. Just simple, direct rentals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setCurrentPage('browse')}
              className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Browse Rentals
            </button>
            <button 
              onClick={() => setCurrentPage('list')}
              className="bg-emerald-800 bg-opacity-50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-70 transition-colors border-2 border-emerald-400"
            >
              List Your Home — Free
            </button>
          </div>
        </div>
      </div>
    </section>
    
    {/* Communities Section */}
    <section className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Currently Serving</h2>
          <p className="text-gray-600">More communities coming soon!</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => setCurrentPage('browse')}
            className="bg-white px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border-2 border-emerald-500"
          >
            <p className="font-bold text-gray-900 text-lg">The Villages</p>
            <p className="text-emerald-600 text-sm">Florida • {sampleListings.length} Listings</p>
          </button>
          
          <div className="bg-gray-100 px-6 py-4 rounded-xl border-2 border-dashed border-gray-300">
            <p className="font-medium text-gray-500">Sun City, AZ</p>
            <p className="text-gray-400 text-sm">Coming Soon</p>
          </div>
          
          <div className="bg-gray-100 px-6 py-4 rounded-xl border-2 border-dashed border-gray-300">
            <p className="font-medium text-gray-500">Laguna Woods, CA</p>
            <p className="text-gray-400 text-sm">Coming Soon</p>
          </div>
        </div>
      </div>
    </section>
    
    {/* How It Works */}
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icons.Search />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">1. Browse Listings</h3>
            <p className="text-gray-600">Search available rentals by type, price, amenities, and availability. No account needed.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icons.Phone />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">2. Contact Owner Directly</h3>
            <p className="text-gray-600">Each listing shows the owner's contact info. Reach out directly via phone or email.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icons.Home />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">3. Arrange Your Rental</h3>
            <p className="text-gray-600">Work out the details directly with the owner. No middleman, no extra fees.</p>
          </div>
        </div>
      </div>
    </section>
    
    {/* Featured Listings Preview */}
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Rentals</h2>
          <button 
            onClick={() => setCurrentPage('browse')}
            className="text-emerald-600 font-semibold hover:text-emerald-700"
          >
            View All →
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleListings.filter(l => l.isFeatured).slice(0, 3).map(listing => (
            <ListingCard 
              key={listing.id} 
              listing={listing} 
              onClick={() => { setSelectedListing(listing); setCurrentPage('detail'); }}
            />
          ))}
        </div>
      </div>
    </section>
    
    {/* Owner CTA */}
    <section className="bg-emerald-700 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Own a Home in a 55+ Community?</h2>
        <p className="text-xl text-emerald-100 mb-8">
          List your rental for FREE. No subscription fees. No booking commissions.<br />
          Connect directly with qualified renters.
        </p>
        <button 
          onClick={() => setCurrentPage('list')}
          className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-colors"
        >
          List Your Home — It's Free
        </button>
      </div>
    </section>
  </div>
);

// Listing Card Component
const ListingCard = ({ listing, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
  >
    <div className="relative h-48 bg-gray-200">
      <img 
        src={listing.photos[0]} 
        alt={listing.title}
        className="w-full h-full object-cover"
      />
      {listing.isFeatured && (
        <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Icons.Star /> Featured
        </div>
      )}
      <div className="absolute top-3 right-3 bg-white text-emerald-700 px-3 py-1 rounded-full text-sm font-bold shadow">
        ${listing.pricePerMonth?.toLocaleString()}/mo
      </div>
    </div>
    
    <div className="p-4">
      <div className="text-xs text-emerald-600 font-semibold mb-1">{listing.homeType}</div>
      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{listing.title}</h3>
      
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
        <span className="flex items-center gap-1">
          <Icons.Bed /> {listing.bedrooms} bed
        </span>
        <span className="flex items-center gap-1">
          <Icons.Bath /> {listing.bathrooms} bath
        </span>
        {listing.sqft && <span>{listing.sqft.toLocaleString()} sqft</span>}
      </div>
      
      <div className="flex flex-wrap gap-1">
        {listing.amenities.slice(0, 3).map((amenity, i) => (
          <span key={i} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
            {amenity}
          </span>
        ))}
        {listing.amenities.length > 3 && (
          <span className="text-gray-400 text-xs">+{listing.amenities.length - 3} more</span>
        )}
      </div>
    </div>
  </div>
);

// Browse Page
const BrowsePage = ({ setCurrentPage, setSelectedListing }) => {
  const [filters, setFilters] = useState({
    homeType: 'All Types',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'Any',
    rentalType: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredListings = sampleListings.filter(listing => {
    if (filters.homeType !== 'All Types' && listing.homeType !== filters.homeType) return false;
    if (filters.minPrice && listing.pricePerMonth < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && listing.pricePerMonth > parseInt(filters.maxPrice)) return false;
    if (filters.bedrooms !== 'Any' && listing.bedrooms !== parseInt(filters.bedrooms)) return false;
    if (filters.rentalType !== 'all' && listing.rentalType !== filters.rentalType && listing.rentalType !== 'either') return false;
    if (searchTerm && !listing.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !listing.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-emerald-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Rentals in The Villages, FL</h1>
          <p className="text-emerald-100">{filteredListings.length} properties available</p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white border-b shadow-sm sticky top-16 sm:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Icons.Search />
              <input
                type="text"
                placeholder="Search by title or neighborhood..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <select
              value={filters.homeType}
              onChange={(e) => setFilters({...filters, homeType: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              {homeTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              value={filters.bedrooms}
              onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="Any">Any Beds</option>
              <option value="1">1 Bed</option>
              <option value="2">2 Beds</option>
              <option value="3">3+ Beds</option>
            </select>
            
            <select
              value={filters.rentalType}
              onChange={(e) => setFilters({...filters, rentalType: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="all">All Rentals</option>
              <option value="vacation">Vacation</option>
              <option value="long-term">Long Term</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map(listing => (
              <ListingCard 
                key={listing.id} 
                listing={listing} 
                onClick={() => { setSelectedListing(listing); setCurrentPage('detail'); }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No listings match your filters.</p>
            <button 
              onClick={() => setFilters({ homeType: 'All Types', minPrice: '', maxPrice: '', bedrooms: 'Any', rentalType: 'all' })}
              className="text-emerald-600 font-semibold mt-2"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Listing Detail Page
const DetailPage = ({ listing, setCurrentPage }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  
  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Listing not found</p>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <button 
            onClick={() => setCurrentPage('browse')}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
          >
            <Icons.ArrowLeft /> Back to listings
          </button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Photo Gallery */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
              <div className="relative h-64 sm:h-96 bg-gray-200">
                <img 
                  src={listing.photos[currentPhoto]} 
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                {listing.isFeatured && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1">
                    <Icons.Star /> Featured Listing
                  </div>
                )}
              </div>
              
              {listing.photos.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {listing.photos.map((photo, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPhoto(i)}
                      className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 ${currentPhoto === i ? 'border-emerald-500' : 'border-transparent'}`}
                    >
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Details */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-emerald-600 font-semibold text-sm">{listing.homeType}</span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{listing.title}</h1>
                  <p className="text-gray-600 mt-1">{listing.neighborhood}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-6 py-4 border-y border-gray-100 mb-6">
                <div>
                  <p className="text-gray-500 text-sm">Bedrooms</p>
                  <p className="text-xl font-bold text-gray-900">{listing.bedrooms}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Bathrooms</p>
                  <p className="text-xl font-bold text-gray-900">{listing.bathrooms}</p>
                </div>
                {listing.sqft && (
                  <div>
                    <p className="text-gray-500 text-sm">Sq Ft</p>
                    <p className="text-xl font-bold text-gray-900">{listing.sqft.toLocaleString()}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-500 text-sm">Minimum Stay</p>
                  <p className="text-xl font-bold text-gray-900">{listing.minimumStay}</p>
                </div>
              </div>
              
              <h3 className="font-bold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed mb-6">{listing.description}</p>
              
              <h3 className="font-bold text-gray-900 mb-3">Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {listing.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-700">
                    <span className="text-emerald-600"><Icons.Check /></span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-gray-500 text-sm mb-1">Monthly Rate</p>
                <p className="text-3xl font-bold text-emerald-600">${listing.pricePerMonth?.toLocaleString()}</p>
                {listing.pricePerWeek && (
                  <p className="text-gray-600 mt-1">${listing.pricePerWeek.toLocaleString()}/week</p>
                )}
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-bold text-gray-900 mb-4">Contact {listing.contactName}</h3>
                
                {listing.contactPhone && (
                  <a 
                    href={`tel:${listing.contactPhone}`}
                    className="flex items-center gap-3 w-full bg-emerald-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors mb-3 justify-center"
                  >
                    <Icons.Phone />
                    {listing.contactPhone}
                  </a>
                )}
                
                {listing.contactEmail && (
                  <a 
                    href={`mailto:${listing.contactEmail}?subject=Inquiry about ${listing.title}`}
                    className="flex items-center gap-3 w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors justify-center"
                  >
                    <Icons.Mail />
                    Send Email
                  </a>
                )}
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-amber-800 text-sm">
                  <strong>Direct Rental:</strong> All arrangements are made directly between you and the property owner. RentDirect55 does not participate in or guarantee any rental agreements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// List Your Home Page
const ListPage = ({ setCurrentPage }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="bg-emerald-700 text-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">List Your Rental — Free</h1>
        <p className="text-xl text-emerald-100">
          Reach thousands of renters looking for homes in 55+ communities.
        </p>
      </div>
    </div>
    
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Started</h2>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-emerald-700 font-bold">1</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Sign in with Google</h3>
              <p className="text-gray-600">Quick and secure — no passwords to remember.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-emerald-700 font-bold">2</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Add Your Property Details</h3>
              <p className="text-gray-600">Upload photos, set your price, describe your home.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-emerald-700 font-bold">3</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Go Live</h3>
              <p className="text-gray-600">Your listing appears immediately. Renters contact you directly.</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setCurrentPage('login')}
          className="w-full bg-emerald-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-3"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
        
        <p className="text-center text-gray-500 text-sm mt-4">
          By continuing, you agree to our <button onClick={() => setCurrentPage('terms')} className="text-emerald-600 hover:underline">Terms of Service</button> and <button onClick={() => setCurrentPage('privacy')} className="text-emerald-600 hover:underline">Privacy Policy</button>.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div>
          <p className="text-3xl font-bold text-emerald-600">Free</p>
          <p className="text-gray-600">to list your first property</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-emerald-600">0%</p>
          <p className="text-gray-600">booking commissions</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-emerald-600">Direct</p>
          <p className="text-gray-600">owner-to-renter contact</p>
        </div>
      </div>
    </div>
  </div>
);

// Pricing Page
const PricingPage = ({ setCurrentPage }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="bg-emerald-700 text-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Fair Pricing</h1>
        <p className="text-xl text-emerald-100">
          Start free. Upgrade when you need more.
        </p>
      </div>
    </div>
    
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Tier */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Free</h2>
          <p className="text-gray-600 mb-6">Perfect to get started</p>
          
          <p className="text-4xl font-bold text-gray-900 mb-6">$0<span className="text-lg text-gray-500 font-normal">/month</span></p>
          
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 text-gray-700">
              <span className="text-emerald-600"><Icons.Check /></span>
              1 property listing
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <span className="text-emerald-600"><Icons.Check /></span>
              3 photos per listing
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <span className="text-emerald-600"><Icons.Check /></span>
              90-day listing duration
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <span className="text-emerald-600"><Icons.Check /></span>
              Direct contact display
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <span className="text-emerald-600"><Icons.Check /></span>
              Renew free anytime
            </li>
          </ul>
          
          <button 
            onClick={() => setCurrentPage('list')}
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Get Started Free
          </button>
        </div>
        
        {/* Premium Tier */}
        <div className="bg-white rounded-xl shadow-md p-8 border-2 border-emerald-500 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold">
            Most Popular
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium</h2>
          <p className="text-gray-600 mb-6">For active landlords</p>
          
          <p className="text-4xl font-bold text-emerald-600 mb-6">$9.99<span className="text-lg text-gray-500 font-normal">/month</span></p>
          
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 text-gray-700">
              <span className="text-emerald-600"><Icons.Check /></span>
              <strong>Unlimited</strong> property listings
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <span className="text-emerald-600"><Icons.Check /></span>
              <strong>12 photos</strong> per listing
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <span className="text-emerald-600"><Icons.Check /></span>
              <strong>Featured</strong> placement in search
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <span className="text-emerald-600"><Icons.Check /></span>
              <strong>Analytics</strong> - views &amp; inquiries
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <span className="text-emerald-600"><Icons.Check /></span>
              <strong>Premium badge</strong> on listings
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <span className="text-emerald-600"><Icons.Check /></span>
              <strong>Priority</strong> email support
            </li>
          </ul>
          
          <button 
            onClick={() => setCurrentPage('list')}
            className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Start Free, Upgrade Anytime
          </button>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-4">No Hidden Fees. Ever.</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Unlike other platforms, we never take a percentage of your rental income. 
          No booking fees, no service charges. What you charge is what you keep.
        </p>
      </div>
    </div>
  </div>
);

// Login Page (placeholder)
const LoginPage = ({ setCurrentPage }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-2xl">55</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Owner Login</h1>
        <p className="text-gray-600 mt-2">Sign in to manage your listings</p>
      </div>
      
      <button 
        className="w-full bg-white border-2 border-gray-200 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 mb-4"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </button>
      
      <p className="text-center text-gray-500 text-sm">
        By signing in, you agree to our <button onClick={() => setCurrentPage('terms')} className="text-emerald-600 hover:underline">Terms</button> and <button onClick={() => setCurrentPage('privacy')} className="text-emerald-600 hover:underline">Privacy Policy</button>.
      </p>
      
      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-gray-600">Don't have a listing yet?</p>
        <button onClick={() => setCurrentPage('list')} className="text-emerald-600 font-semibold hover:underline">
          List your home for free →
        </button>
      </div>
    </div>
  </div>
);

// Terms Page
const TermsPage = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="bg-emerald-700 text-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="text-emerald-100 mt-2">Last updated: December 2025</p>
      </div>
    </div>
    
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 prose prose-emerald max-w-none">
        <h2>1. Service Description</h2>
        <p>RentDirect55 ("we," "our," or "the Platform") is an online listing service that connects property owners ("Owners") with prospective renters ("Renters") in 55+ active adult communities. <strong>We are a listing platform only.</strong> We do not verify listings, screen tenants, participate in rental transactions, or guarantee any arrangements made between parties.</p>
        
        <h2>2. Platform Role &amp; Limitations</h2>
        <p>RentDirect55 provides a venue for Owners to list properties and for Renters to discover them. All rental negotiations, agreements, payments, and disputes are conducted directly between Owners and Renters. We are not a party to any rental agreement and assume no liability for:</p>
        <ul>
          <li>Accuracy of listing information</li>
          <li>Property condition or habitability</li>
          <li>Owner or Renter conduct</li>
          <li>Financial transactions between parties</li>
          <li>Lease disputes or legal matters</li>
        </ul>
        
        <h2>3. Owner Responsibilities</h2>
        <p>Property Owners agree to:</p>
        <ul>
          <li>Provide accurate, truthful listing information</li>
          <li>Comply with all applicable federal, state, and local laws, including the Fair Housing Act</li>
          <li>Maintain appropriate insurance coverage</li>
          <li>Handle all rental agreements, payments, and tenant relations independently</li>
          <li>Not engage in discriminatory practices</li>
        </ul>
        
        <h2>4. Fair Housing Compliance</h2>
        <p>All users must comply with the Fair Housing Act and related laws. Discrimination based on race, color, religion, sex, national origin, familial status, disability, or any other protected class is strictly prohibited. Age restrictions (55+) that comply with the Housing for Older Persons Act (HOPA) are permitted where applicable.</p>
        
        <h2>5. User Conduct</h2>
        <p>Users agree not to:</p>
        <ul>
          <li>Post false, misleading, or fraudulent content</li>
          <li>Use the platform for unlawful purposes</li>
          <li>Harass, threaten, or harm other users</li>
          <li>Circumvent platform features or security measures</li>
          <li>Scrape, copy, or republish listing data</li>
        </ul>
        
        <h2>6. Content &amp; Listings</h2>
        <p>We reserve the right to remove any listing or content at our sole discretion, without notice, for any reason including suspected fraud, policy violations, or complaints. Listings may expire after 90 days (Free tier) and must be renewed by the Owner.</p>
        
        <h2>7. Premium Subscriptions</h2>
        <p>Premium subscriptions are billed monthly. No refunds are provided for partial months. We reserve the right to modify pricing with 30 days notice. Premium features are provided "as-is" and may be modified or discontinued.</p>
        
        <h2>8. Limitation of Liability</h2>
        <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, RENTDIRECT55 SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE PRECEDING 12 MONTHS.</p>
        
        <h2>9. Indemnification</h2>
        <p>You agree to indemnify and hold harmless RentDirect55, its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of the platform, your listings, or your violation of these Terms.</p>
        
        <h2>10. Dispute Resolution</h2>
        <p>Any disputes shall be resolved through binding arbitration in accordance with the American Arbitration Association rules. You waive the right to participate in class actions.</p>
        
        <h2>11. Modifications</h2>
        <p>We may modify these Terms at any time. Continued use after changes constitutes acceptance. Material changes will be communicated via email or platform notification.</p>
        
        <h2>12. Contact</h2>
        <p>Questions about these Terms may be directed to: legal@rentdirect55.com</p>
        
        <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-amber-800 font-semibold mb-2">Important Notice</p>
          <p className="text-amber-700 text-sm">RentDirect55 is not affiliated with The Villages®, any community developer, or any homeowner association. The Villages® is a registered trademark of Holding Company of The Villages, Inc.</p>
        </div>
      </div>
    </div>
  </div>
);

// Privacy Page
const PrivacyPage = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="bg-emerald-700 text-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-emerald-100 mt-2">Last updated: December 2025</p>
      </div>
    </div>
    
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 prose prose-emerald max-w-none">
        <h2>1. Information We Collect</h2>
        
        <h3>Information You Provide</h3>
        <ul>
          <li><strong>Account Information:</strong> When you sign in with Google, we receive your name, email address, and profile picture from Google. We do not store your Google password.</li>
          <li><strong>Listing Information:</strong> Property details, photos, descriptions, and contact information you choose to include in your listings.</li>
        </ul>
        
        <h3>Automatically Collected Information</h3>
        <ul>
          <li><strong>Usage Data:</strong> Pages viewed, features used, and general platform interactions.</li>
          <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers.</li>
          <li><strong>Analytics:</strong> Aggregated, anonymized data about platform usage via Google Analytics.</li>
        </ul>
        
        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To provide and maintain the platform</li>
          <li>To display your listings to prospective renters</li>
          <li>To communicate with you about your account or listings</li>
          <li>To improve our services</li>
          <li>To enforce our Terms of Service</li>
        </ul>
        
        <h2>3. Information Sharing</h2>
        <p>We do not sell your personal information. We may share information:</p>
        <ul>
          <li><strong>Publicly:</strong> Listing information (including contact details you provide) is displayed publicly to all site visitors.</li>
          <li><strong>Service Providers:</strong> With third-party services that help us operate the platform (hosting, analytics).</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
        </ul>
        
        <h2>4. Data Retention</h2>
        <p>We retain your account information as long as your account is active. Listing data is retained for 90 days after expiration. You may request deletion of your account and data at any time.</p>
        
        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Delete your account and associated data</li>
          <li>Export your data</li>
          <li>Opt out of marketing communications</li>
        </ul>
        
        <h2>6. Cookies</h2>
        <p>We use essential cookies for platform functionality and analytics cookies (which can be disabled) to understand usage patterns. We do not use advertising cookies or sell data to advertisers.</p>
        
        <h2>7. Security</h2>
        <p>We implement reasonable security measures to protect your information. However, no system is completely secure. You are responsible for maintaining the security of your Google account credentials.</p>
        
        <h2>8. Children's Privacy</h2>
        <p>Our platform is designed for users 18 years and older. We do not knowingly collect information from children.</p>
        
        <h2>9. California Residents (CCPA)</h2>
        <p>California residents have additional rights under the CCPA, including the right to know what information is collected, request deletion, and opt out of sale (we do not sell personal information).</p>
        
        <h2>10. Changes to This Policy</h2>
        <p>We may update this policy periodically. Material changes will be communicated via email or platform notification.</p>
        
        <h2>11. Contact</h2>
        <p>Privacy questions may be directed to: privacy@rentdirect55.com</p>
      </div>
    </div>
  </div>
);

// Main App Component
export default function RentDirect55App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedListing, setSelectedListing] = useState(null);
  
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} setSelectedListing={setSelectedListing} />;
      case 'browse':
        return <BrowsePage setCurrentPage={setCurrentPage} setSelectedListing={setSelectedListing} />;
      case 'detail':
        return <DetailPage listing={selectedListing} setCurrentPage={setCurrentPage} />;
      case 'list':
        return <ListPage setCurrentPage={setCurrentPage} />;
      case 'pricing':
        return <PricingPage setCurrentPage={setCurrentPage} />;
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} setSelectedListing={setSelectedListing} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} setSelectedListing={setSelectedListing} />
      <main>
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
