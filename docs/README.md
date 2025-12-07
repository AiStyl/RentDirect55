# RentDirect55

> Connecting property owners directly with renters in 55+ active adult communities.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/rentdirect55)

## Overview

RentDirect55 is a rental listing platform specifically designed for 55+ active adult communities. Property owners list their homes, renters browse and contact owners directly. No middleman fees, no booking commissions.

**Live Site:** [rentdirect55.com](https://rentdirect55.com) *(coming soon)*

## Features

### For Renters
- Browse rental listings (no account required)
- Filter by home type, bedrooms, price, rental type
- View property details and photos
- Contact owners directly via phone or email
- Save favorites (local storage)

### For Property Owners
- Free listing (1 property, 3 photos)
- Google sign-in (no passwords)
- Self-service listing management
- Premium tier for power users ($9.99/mo)

### Premium Features
- Unlimited property listings
- 12 photos per listing
- Featured placement in search results
- Analytics dashboard (views, inquiries)
- Premium badge on listings
- Priority support

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Database:** Firebase Firestore
- **Auth:** Firebase Authentication (Google OAuth)
- **Storage:** Firebase Storage (images)
- **Hosting:** Vercel
- **Analytics:** Google Analytics 4

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project
- Google Cloud Console project (for OAuth)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/rentdirect55.git
cd rentdirect55

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Add your Firebase config to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

See `.env.example` for required variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

## Project Structure

```
rentdirect55/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   │   ├── ui/              # Reusable UI components
│   │   ├── layout/          # Header, Footer, etc.
│   │   └── listings/        # Listing-related components
│   ├── lib/                 # Utilities and helpers
│   │   ├── firebase.js      # Firebase configuration
│   │   └── utils.js         # Helper functions
│   └── styles/              # Global styles
├── public/                  # Static assets
├── docs/                    # Documentation
└── README.md
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual

```bash
npm run build
npm start
```

## Communities Supported

**Currently Live:**
- The Villages, FL

**Coming Soon:**
- Sun City, AZ
- Sun City West, AZ
- Laguna Woods Village, CA
- Sun City Center, FL
- And 15+ more...

## Business Model

| Tier | Price | Features |
|------|-------|----------|
| Free | $0/mo | 1 listing, 3 photos, 90-day duration |
| Premium | $9.99/mo | Unlimited listings, 12 photos, featured placement, analytics |

## Legal

- **Platform Role:** Listing service only. We do not verify listings, screen tenants, or participate in rental transactions.
- **Fair Housing:** All users must comply with Fair Housing Act.
- **Trademark:** RentDirect55 is not affiliated with The Villages® or any community developer.

## Contributing

This is a private project. Not accepting contributions at this time.

## License

Proprietary. All rights reserved.

## Contact

- **Website:** [rentdirect55.com](https://rentdirect55.com)
- **Email:** support@rentdirect55.com

---

Built with ☀️ for the 55+ community
