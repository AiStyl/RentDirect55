# RentDirect55

A free listing platform connecting property owners with renters in 55+ active adult communities.

## Features

- **For Owners**: List rental properties for free with photos and contact info
- **For Renters**: Browse listings and contact owners directly
- **Direct Communication**: No middleman, no booking fees
- **Built for 55+**: Designed specifically for active adult communities

## Tech Stack

- React + Vite
- Firebase (Auth, Firestore, Storage)
- Tailwind CSS
- Deployed on Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- Firebase project

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your Firebase config:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

### Firebase Setup

1. Create a new Firebase project at https://console.firebase.google.com
2. Enable Google Authentication
3. Create a Firestore database
4. Enable Storage
5. Add your web app and copy the config to `.env`

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Properties collection
    match /properties/{propertyId} {
      // Anyone can read properties
      allow read: if true;
      
      // Only authenticated users can create
      allow create: if request.auth != null;
      
      // Only owner can update/delete
      allow update, delete: if request.auth != null 
        && request.auth.uid == resource.data.ownerId;
    }
  }
}
```

## Deployment

Deploy to Vercel:

```bash
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

## License

MIT
