
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config (replace <dummy> with actual key)
const firebaseConfig = {
  apiKey: "AIzaSyBWjcLCx7vio8uxrFrWsJjFVQwgRTraedU",
  authDomain: "infragenie-4e256.firebaseapp.com",
  projectId: "infragenie-4e256",
  storageBucket: "infragenie-4e256.appspot.com", // ✅ Correct this too!
  messagingSenderId: "928280669851",
  appId: "1:928280669851:web:cf5f762ef2ddc0f729a03e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Only export once (no reinitializing above)
export const auth = getAuth(app);
export const db = getFirestore(app);

// Optional: debug check
console.log("Firebase config being used:", firebaseConfig);

