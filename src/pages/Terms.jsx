import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <div className="min-h-screen bg-sand-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: December 2024</p>

          <div className="prose prose-lg max-w-none text-gray-700">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">1. Acceptance of Terms</h2>
              <p>
                By accessing or using RentDirect55 ("the Service"), you agree to be bound by these 
                Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">2. Description of Service</h2>
              <p>
                RentDirect55 is a listing platform that connects property owners with potential renters 
                in 55+ active adult communities. <strong>The Service is a listing service only.</strong> We do not:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Participate in any rental transactions between owners and renters</li>
                <li>Process payments or hold funds</li>
                <li>Verify the accuracy of listings or the identity of users</li>
                <li>Guarantee the availability, condition, or legality of any property</li>
                <li>Mediate disputes between owners and renters</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">3. User Responsibilities</h2>
              
              <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">For Property Owners:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>You represent that you have the legal right to rent the property listed</li>
                <li>All listing information must be accurate and current</li>
                <li>You are solely responsible for all rental agreements and transactions</li>
                <li>You must comply with all applicable local, state, and federal laws</li>
                <li>You are responsible for collecting and remitting any applicable taxes</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">For Renters:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>You are responsible for verifying all property information independently</li>
                <li>You should conduct your own due diligence before entering any rental agreement</li>
                <li>All rental arrangements are made directly with property owners</li>
                <li>We recommend getting all agreements in writing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">4. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, 
                EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>The Service will be uninterrupted or error-free</li>
                <li>Any listing information is accurate, complete, or reliable</li>
                <li>Any property meets your expectations or requirements</li>
                <li>Any transaction will be successful or satisfactory</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">5. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, RENTDIRECT55 AND ITS OWNERS, OPERATORS, 
                AFFILIATES, AND AGENTS SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Your use of or inability to use the Service</li>
                <li>Any transaction or interaction between users</li>
                <li>Any listing content or user-generated content</li>
                <li>Any property condition, availability, or suitability</li>
                <li>Any disputes between owners and renters</li>
                <li>Any unauthorized access to your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">6. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless RentDirect55 and its owners, operators, 
                affiliates, and agents from any claims, damages, losses, or expenses arising from 
                your use of the Service, your violation of these Terms, or your violation of any 
                third-party rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">7. Fair Housing</h2>
              <p>
                RentDirect55 is committed to compliance with the Fair Housing Act. All listings 
                must comply with applicable fair housing laws. Discrimination based on race, color, 
                religion, sex, national origin, familial status, or disability is prohibited.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">8. Content Removal</h2>
              <p>
                We reserve the right to remove any listing or content at our sole discretion, 
                including but not limited to content that:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Violates these Terms of Service</li>
                <li>Is fraudulent, misleading, or inaccurate</li>
                <li>Violates fair housing laws</li>
                <li>Infringes on intellectual property rights</li>
                <li>Is otherwise objectionable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">9. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. Continued use of the Service after any 
                changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">10. Contact</h2>
              <p>
                For questions about these Terms, please <Link to="/contact" className="text-palm-600 hover:underline">contact us</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
