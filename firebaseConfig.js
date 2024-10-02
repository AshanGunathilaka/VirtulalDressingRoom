import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCrT4qijbJJYVIjJZcQLRwDhSk5D6Unk-A",
  authDomain: "fitmefirebase-2e8bd.firebaseapp.com",
  projectId: "fitmefirebase-2e8bd",
  storageBucket: "fitmefirebase-2e8bd.appspot.com",
  messagingSenderId: "679605363026",
  appId: "1:679605363026:web:b1008f61a7a0c0c6c59a8b",
  measurementId: "G-9EZWDT6DFG"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };



