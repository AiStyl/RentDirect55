import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Home, Search, Plus, User, Menu, X, LogOut } from 'lucide-react'

export default function Navbar() {
  const { user, signInWithGoogle, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleAuth = async () => {
    if (user) {
      await logout()
    } else {
      try {
        await signInWithGoogle()
      } catch (error) {
        console.error('Auth error:', error)
      }
    }
  }

  const handleAddListing = () => {
    if (user) {
      navigate('/add-listing')
    } else {
      signInWithGoogle().then(() => {
        navigate('/add-listing')
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-palm-600 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-palm-700 font-display">RentDirect</span>
              <span className="text-2xl font-bold text-sunset-500 font-display">55</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/browse" 
              className="flex items-center gap-2 text-gray-700 hover:text-palm-600 font-medium text-lg transition-colors"
            >
              <Search className="w-5 h-5" />
              Browse Rentals
            </Link>
            
            <button 
              onClick={handleAddListing}
              className="flex items-center gap-2 btn-primary"
            >
              <Plus className="w-5 h-5" />
              List Property
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-palm-600 font-medium text-lg transition-colors"
                >
                  <User className="w-5 h-5" />
                  My Listings
                </Link>
                <button 
                  onClick={handleAuth}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleAuth}
                className="btn-outline"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-8 h-8 text-gray-700" />
            ) : (
              <Menu className="w-8 h-8 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link 
                to="/browse" 
                className="flex items-center gap-3 text-gray-700 hover:text-palm-600 font-medium text-xl py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Search className="w-6 h-6" />
                Browse Rentals
              </Link>
              
              <button 
                onClick={handleAddListing}
                className="flex items-center gap-3 text-palm-600 font-medium text-xl py-2"
              >
                <Plus className="w-6 h-6" />
                List Your Property
              </button>

              {user ? (
                <>
                  <Link 
                    to="/dashboard"
                    className="flex items-center gap-3 text-gray-700 hover:text-palm-600 font-medium text-xl py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-6 h-6" />
                    My Listings
                  </Link>
                  <button 
                    onClick={() => { handleAuth(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 text-gray-500 font-medium text-xl py-2"
                  >
                    <LogOut className="w-6 h-6" />
                    Sign Out
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => { handleAuth(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-3 text-sunset-500 font-medium text-xl py-2"
                >
                  <User className="w-6 h-6" />
                  Sign In with Google
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
