import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBO-rY1r0H9kCMG0rZ6YaQNeCztji9w5_Q",
  authDomain: "virtual-dressing-room-4f3b9.firebaseapp.com",
  projectId: "virtual-dressing-room-4f3b9",
  storageBucket: "virtual-dressing-room-4f3b9.appspot.com",
  messagingSenderId: "83457591094",
  appId: "1:83457591094:web:4321d4d1e92b2c996b9597",
  measurementId: "G-0JYFLWFMKB"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export Firestore (db) along with Auth (auth)
