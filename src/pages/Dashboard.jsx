import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Plus, Edit2, Trash2, Eye, Home, Loader2, AlertTriangle } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate('/')
      return
    }

    // For demo, show empty state
    // Uncomment when Firebase is connected
    // const q = query(
    //   collection(db, 'properties'),
    //   where('ownerId', '==', user.uid),
    //   orderBy('createdAt', 'desc')
    // )
    // 
    // const unsubscribe = onSnapshot(q, (snapshot) => {
    //   const listingData = snapshot.docs.map(doc => ({
    //     id: doc.id,
    //     ...doc.data()
    //   }))
    //   setListings(listingData)
    //   setLoading(false)
    // })
    //
    // return unsubscribe

    setLoading(false)
  }, [user, navigate])

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'properties', id))
      setDeleteConfirm(null)
    } catch (error) {
      console.error('Error deleting listing:', error)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-sand-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-display">My Listings</h1>
            <p className="text-gray-600 mt-1">
              Welcome back, {user.displayName?.split(' ')[0] || 'there'}!
            </p>
          </div>
          <Link to="/add-listing" className="btn-primary flex items-center gap-2 self-start">
            <Plus className="w-5 h-5" />
            Add New Listing
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-palm-600 animate-spin" />
          </div>
        ) : listings.length > 0 ? (
          <div className="space-y-4">
            {listings.map(listing => (
              <div key={listing.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="sm:w-48 h-40 sm:h-auto flex-shrink-0">
                    {listing.images?.[0] ? (
                      <img 
                        src={listing.images[0]} 
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full img-placeholder flex items-center justify-center">
                        <Home className="w-12 h-12 text-sand-400" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-grow p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 font-display">
                          {listing.title}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {listing.community} • {listing.propertyType}
                        </p>
                        <p className="text-palm-700 font-semibold mt-2">
                          ${listing.price?.toLocaleString()}/{listing.priceType}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link 
                          to={`/property/${listing.id}`}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                          title="View Listing"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        <Link 
                          to={`/edit-listing/${listing.id}`}
                          className="p-2 bg-palm-100 text-palm-700 rounded-lg hover:bg-palm-200 transition-colors"
                          title="Edit Listing"
                        >
                          <Edit2 className="w-5 h-5" />
                        </Link>
                        <button 
                          onClick={() => setDeleteConfirm(listing.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-palm-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home className="w-10 h-10 text-palm-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven't created any property listings yet. List your first property 
              and start connecting with potential renters!
            </p>
            <Link to="/add-listing" className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Your First Listing
            </Link>
          </div>
        )}

        {/* Free Tier Notice */}
        <div className="mt-8 bg-sunset-50 border border-sunset-200 rounded-xl p-6">
          <h3 className="font-semibold text-sunset-800 mb-2">Free Tier</h3>
          <p className="text-sunset-700">
            You're currently on the free tier with 1 listing and 3 photos per listing. 
            <span className="font-medium"> Premium features coming soon!</span>
          </p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold">Delete Listing?</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this listing? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setDeleteConfirm(null)}
                className="btn-outline"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDelete(deleteConfirm)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
