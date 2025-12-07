import { useState } from 'react'
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, this would send to a backend or email service
    console.log('Contact form submitted:', formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-sand-50 py-20">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="w-16 h-16 bg-palm-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-palm-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4 font-display">
              Message Sent!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for reaching out. We'll get back to you as soon as possible.
            </p>
            <button 
              onClick={() => {
                setSubmitted(false)
                setFormData({ name: '', email: '', subject: '', message: '' })
              }}
              className="btn-outline"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sand-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 font-display">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Have a question, suggestion, or need help? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="w-12 h-12 bg-palm-100 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-palm-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm">
                For general inquiries and support
              </p>
              <a 
                href="mailto:support@rentdirect55.com" 
                className="text-palm-600 hover:underline mt-2 block"
              >
                support@rentdirect55.com
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="w-12 h-12 bg-sunset-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-sunset-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
              <p className="text-gray-600 text-sm">
                We typically respond within 24-48 hours during business days.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="label">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="listing">Help with My Listing</option>
                    <option value="report">Report an Issue</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback / Suggestion</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="label">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input-field"
                    placeholder="How can we help you?"
                  />
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FAQ Teaser */}
        <div className="mt-12 bg-palm-50 rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mb-4">
            Looking for quick answers? Check out our most common questions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-1">Is it really free to list?</h3>
              <p className="text-gray-600 text-sm">
                Yes! Basic listings are completely free. Premium features will be available soon.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-1">Do you handle payments?</h3>
              <p className="text-gray-600 text-sm">
                No, all rental arrangements are made directly between owners and renters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
