import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-sand-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: December 2024</p>

          <div className="prose prose-lg max-w-none text-gray-700">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">1. Our Commitment to Privacy</h2>
              <p>
                RentDirect55 is committed to protecting your privacy. This Privacy Policy explains 
                what information we collect, how we use it, and your rights regarding your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">2. Information We Collect</h2>
              
              <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Account Information</h3>
              <p>
                When you sign in with Google, we receive your name, email address, and profile photo 
                from Google. We use this information solely to identify you and associate your listings 
                with your account.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Listing Information</h3>
              <p>
                Property owners voluntarily provide listing information including property details, 
                photos, and contact information. <strong>Contact information you provide in listings 
                is displayed publicly</strong> to allow potential renters to contact you directly.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Usage Information</h3>
              <p>
                We may collect basic usage data such as pages visited and actions taken on the site 
                to improve our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">3. Information We Do NOT Collect</h2>
              <p>We do not collect:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Social Security numbers or government IDs</li>
                <li>Financial or payment information</li>
                <li>Personal information from renters (no account required to browse)</li>
                <li>Precise location data</li>
                <li>Information about transactions between users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">4. How We Use Your Information</h2>
              <p>We use collected information to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Provide and maintain the Service</li>
                <li>Associate listings with your account</li>
                <li>Display your contact information on your listings (as you provide it)</li>
                <li>Improve and optimize the Service</li>
                <li>Communicate with you about your account if necessary</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">5. Information Sharing</h2>
              <p>We do not sell, rent, or share your personal information with third parties except:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Contact information you voluntarily include in listings (publicly displayed)</li>
                <li>When required by law or legal process</li>
                <li>To protect our rights or the safety of users</li>
                <li>With service providers who assist in operating the Service (bound by confidentiality)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">6. Data Security</h2>
              <p>
                We use industry-standard security measures to protect your information. However, 
                no method of transmission over the Internet is 100% secure. We cannot guarantee 
                absolute security of your data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Access the information we have about you</li>
                <li>Update or correct your listing information</li>
                <li>Delete your listings and account</li>
                <li>Opt out of any marketing communications</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, please <Link to="/contact" className="text-palm-600 hover:underline">contact us</Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">8. Cookies</h2>
              <p>
                We use essential cookies to maintain your session and remember your preferences. 
                We do not use tracking cookies or share cookie data with third parties for advertising.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">9. Third-Party Services</h2>
              <p>We use the following third-party services:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Google Sign-In:</strong> For authentication (subject to Google's Privacy Policy)</li>
                <li><strong>Firebase:</strong> For data storage and hosting (subject to Google's Privacy Policy)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">10. Children's Privacy</h2>
              <p>
                The Service is intended for users 18 years and older. We do not knowingly collect 
                information from children under 18.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any 
                significant changes by posting the new policy on this page with an updated date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">12. Contact Us</h2>
              <p>
                For questions about this Privacy Policy, please <Link to="/contact" className="text-palm-600 hover:underline">contact us</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
