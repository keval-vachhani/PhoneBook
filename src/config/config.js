// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeJ8Av7BNY8mC28Tt-UVLZf7whUcxx6Dw",
  authDomain: "vite-contact-app-69d57.firebaseapp.com",
  projectId: "vite-contact-app-69d57",
  storageBucket: "vite-contact-app-69d57.appspot.com",
  messagingSenderId: "982338437107",
  appId: "1:982338437107:web:7177cbaa67c63468a3dc86"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);