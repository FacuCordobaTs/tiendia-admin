// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZV-QQkisEmC6nKl25x-icUnGNuQy8TH0",
  authDomain: "fileit-ecommerce.firebaseapp.com",
  projectId: "fileit-ecommerce",
  storageBucket: "fileit-ecommerce.firebasestorage.app",
  messagingSenderId: "800115959517",
  appId: "1:800115959517:web:9b6e96d6777777d65b1d34",
  measurementId: "G-T0LDGSM1YQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const messaging = getMessaging(app);