// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3JamkXUd8kpEg1184NzpjiZWPK_U9MLI",
  authDomain: "vue-3-a37f1.firebaseapp.com",
  projectId: "vue-3-a37f1",
  storageBucket: "vue-3-a37f1.firebasestorage.app",
  messagingSenderId: "776737041352",
  appId: "1:776737041352:web:882b4596f13387173aeefd"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth()

export { auth }