import { Link } from 'react-router-dom'
import { Home, Mail, Shield, FileText } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-palm-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white font-display">RentDirect</span>
                <span className="text-2xl font-bold text-sunset-400 font-display">55</span>
              </div>
            </Link>
            <p className="text-gray-400 text-lg max-w-md mb-6">
              Connect directly with property owners in 55+ active adult communities.
              No fees, no middleman — just simple, direct rentals.
            </p>

            {/* Equal Housing */}
            <div className="flex items-center gap-3 bg-gray-800 rounded-lg p-3 inline-flex">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 8v2h20V8L12 2zM4 12v8h6v-6h4v6h6v-8H4z"/>
              </svg>
              <span className="text-sm">Equal Housing Opportunity</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/browse" className="hover:text-palm-400 transition-colors text-lg">
                  Browse Rentals
                </Link>
              </li>
              <li>
                <Link to="/add-listing" className="hover:text-palm-400 transition-colors text-lg">
                  List Your Property
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-palm-400 transition-colors text-lg">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="hover:text-palm-400 transition-colors text-lg flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-palm-400 transition-colors text-lg flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-center md:text-left">
                © {currentYear} RentDirect55. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm text-center md:text-right max-w-lg">
                RentDirect55 is a listing service only. We do not participate in rental transactions
                and are not responsible for agreements between owners and renters.
              </p>
            </div>
            <p className="text-gray-600 text-xs text-center">
              RentDirect55 is not affiliated with, endorsed by, or sponsored by The Villages® or any other communities listed. 
              All trademarks are property of their respective owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
