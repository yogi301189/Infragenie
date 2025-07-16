// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Firebase config from environment variables
const firebaseConfig = {
  apiKey: "AIzaSyBWjcLCx7vio8uxrFrWsJjFVQwgRTraedU",
  authDomain: "infragenie-4e256.firebaseapp.com",
  projectId: "infragenie-4e256",
  storageBucket: "infragenie-4e256.firebasestorage.app",
  messagingSenderId: "928280669851",
  appId: "1:928280669851:web:cf5f762ef2ddc0f729a03e"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication instance
export const auth = getAuth(app);
export const db = getFirestore(app);