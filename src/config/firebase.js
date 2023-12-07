// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG0jClgGZZ1UtJuLBBZ-IeMkfHSnutr1E",
  authDomain: "nextlogin-37f79.firebaseapp.com",
  projectId: "nextlogin-37f79",
  storageBucket: "nextlogin-37f79.appspot.com",
  messagingSenderId: "148680989563",
  appId: "1:148680989563:web:ef333af059260e971cbbde",
  measurementId: "G-0SXJCYBFE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;