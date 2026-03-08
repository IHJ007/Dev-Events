// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAN17zY6lU-pphxjGLnbC0lb0EWCUaWYnk",
  authDomain: "dev-events-33e93.firebaseapp.com",
  projectId: "dev-events-33e93",
  storageBucket: "dev-events-33e93.firebasestorage.app",
  messagingSenderId: "739510535072",
  appId: "1:739510535072:web:6ddeaff2fcbfbe7158dac5",
  measurementId: "G-EVWR1WG69G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);