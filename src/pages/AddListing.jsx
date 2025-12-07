import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import ListingForm from '../components/ListingForm'
import { LogIn } from 'lucide-react'

export default function AddListing() {
  const { user, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData) => {
    if (!user) return

    setIsLoading(true)
    try {
      const listingData = {
        ...formData,
        ownerId: user.uid,
        ownerName: user.displayName,
        ownerEmail: user.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }

      await addDoc(collection(db, 'properties'), listingData)
      navigate('/dashboard')
    } catch (error) {
      console.error('Error creating listing:', error)
      alert('Error creating listing. Please try again.')
    }
    setIsLoading(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-sand-50 py-20">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="w-16 h-16 bg-palm-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <LogIn className="w-8 h-8 text-palm-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4 font-display">
              Sign In to List Your Property
            </h1>
            <p className="text-gray-600 mb-6">
              Create a free account to list your property and connect with potential renters.
            </p>
            <button 
              onClick={signInWithGoogle}
              className="btn-primary w-full flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign In with Google
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sand-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-display">List Your Property</h1>
          <p className="text-gray-600 mt-2">
            Fill out the details below to create your listing. It's free!
          </p>
        </div>

        <ListingForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  )
}
