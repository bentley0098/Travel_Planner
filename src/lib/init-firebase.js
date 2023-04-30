// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMwkJwG8I8JftV0M69ZMPOWZrLZh90Sgc",
  authDomain: "trave-app-9011b.firebaseapp.com",
  projectId: "trave-app-9011b",
  storageBucket: "trave-app-9011b.appspot.com",
  messagingSenderId: "980007413136",
  appId: "1:980007413136:web:c941e1a61f9b1b6ef8ff15",
  measurementId: "G-QFYBWJ826D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);