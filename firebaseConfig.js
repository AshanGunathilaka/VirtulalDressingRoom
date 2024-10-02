// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) // Use AsyncStorage for persistence
});

export { app, auth }; // Export auth along with app
