// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_AUTH_KEY,
  authDomain: "prism-7b0d9.firebaseapp.com",
  projectId: "prism-7b0d9",
  storageBucket: "prism-7b0d9.appspot.com",
  messagingSenderId: "123516102550",
  appId: "1:123516102550:web:feceedbd7fff24e7f85fb7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);