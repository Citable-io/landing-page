import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3RvTd0kOZO9YcL_DzBGMw0tnJM5oSzsY",
  authDomain: "citable-ae084.firebaseapp.com",
  projectId: "citable-ae084",
  storageBucket: "citable-ae084.firebasestorage.app",
  messagingSenderId: "853748386229",
  appId: "1:853748386229:web:8c020530caca139d7cf1fc",
  measurementId: "G-PX7DRVK6BB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (optional - only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app; 