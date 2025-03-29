import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMgZC5HN74lYjiJf9jj7VL4XGrEjeVj2k",
  authDomain: "hackathon-b03b7.firebaseapp.com",
  projectId: "hackathon-b03b7",
  storageBucket: "hackathon-b03b7.firebasestorage.app",
  messagingSenderId: "1047303005031",
  appId: "1:1047303005031:web:2a240271300be98695c5c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const AUTH = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const FIRESTORE = getFirestore(app);
