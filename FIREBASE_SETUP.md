# Firebase Setup Guide

This project uses Firebase Firestore to persist waiting list form data. Follow these steps to set up Firebase:

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Follow the setup wizard

## 2. Enable Firestore Database

1. In your Firebase project console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for development (you can secure it later)
4. Select a location for your database

## 3. Get Your Firebase Configuration

1. In your Firebase project console, go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select "Web"
4. Register your app with a nickname
5. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

## 4. Firebase Configuration

✅ **Already Configured!** Your Firebase configuration is already set up in `src/lib/firebase.ts` with the following project:

- **Project ID**: `citable-ae084`
- **Project Name**: CITABLE
- **Analytics**: Enabled (measurementId: G-PX7DRVK6BB)

The configuration includes:
- Firestore Database
- Firebase Analytics
- All necessary API keys and settings

## 5. Deploy Firestore Security Rules

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase in your project**:
   ```bash
   firebase init firestore
   ```
   - Select your project: `citable-ae084`
   - Use existing rules file: `firestore.rules`

4. **Deploy the security rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

The rules in `firestore.rules` allow read/write access to the waiting-list collection for development purposes.

## 6. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Fill out the waiting list form
3. Check your Firestore console to see the data being saved

## 7. View Waiting List Data

You can view the collected data in the Firebase Console:
1. Go to Firestore Database
2. Look for the "waiting-list" collection
3. Each document represents a form submission

## Troubleshooting

- **"Firebase: Error (auth/unauthorized)"**: Check your API key and project configuration
- **"Firebase: Error (permission-denied)"**: Check your Firestore security rules
- **Environment variables not loading**: Make sure your `.env.local` file is in the project root

## Production Considerations

1. **Security Rules**: Set up proper Firestore security rules
2. **Authentication**: Consider adding user authentication
3. **Rate Limiting**: Implement rate limiting to prevent spam
4. **Data Validation**: Add server-side validation
5. **Backup**: Set up regular backups of your Firestore data 