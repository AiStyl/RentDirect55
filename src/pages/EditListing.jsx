import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import ListingForm from '../components/ListingForm'
import { Loader2 } from 'lucide-react'

export default function EditListing() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/')
      return
    }

    const fetchListing = async () => {
      try {
        const docRef = doc(db, 'properties', id)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          const data = docSnap.data()
          // Verify ownership
          if (data.ownerId !== user.uid) {
            navigate('/dashboard')
            return
          }
          setListing({ id: docSnap.id, ...data })
        } else {
          navigate('/dashboard')
        }
      } catch (error) {
        console.error('Error fetching listing:', error)
        navigate('/dashboard')
      }
      setLoading(false)
    }

    fetchListing()
  }, [id, user, navigate])

  const handleSubmit = async (formData) => {
    if (!user || !listing) return

    setIsSubmitting(true)
    try {
      const docRef = doc(db, 'properties', id)
      await updateDoc(docRef, {
        ...formData,
        updatedAt: serverTimestamp()
      })
      navigate('/dashboard')
    } catch (error) {
      console.error('Error updating listing:', error)
      alert('Error updating listing. Please try again.')
    }
    setIsSubmitting(false)
  }

  if (!user) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-palm-600 animate-spin" />
      </div>
    )
  }

  if (!listing) {
    return null
  }

  return (
    <div className="min-h-screen bg-sand-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-display">Edit Listing</h1>
          <p className="text-gray-600 mt-2">
            Update your property details below.
          </p>
        </div>

        <ListingForm 
          initialData={listing} 
          onSubmit={handleSubmit} 
          isLoading={isSubmitting} 
        />
      </div>
    </div>
  )
}
