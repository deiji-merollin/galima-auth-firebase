// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhb1Jmt_y6_3z0NbJVfdywo28ttJ7iwW8",
  authDomain: "galima-auth.firebaseapp.com",
  projectId: "galima-auth",
  storageBucket: "galima-auth.firebasestorage.app",
  messagingSenderId: "888917924635",
  appId: "1:888917924635:web:6a79b16adbed99d4b9d1be",
  measurementId: "G-EF5E8YY633"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export authentication
export const auth = getAuth(app);