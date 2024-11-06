import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "SECRET_KEY",
  authDomain: "vue-3-a37f1.firebaseapp.com",
  projectId: "vue-3-a37f1",
  storageBucket: "vue-3-a37f1.firebasestorage.app",
  messagingSenderId: "776737041352",
  appId: "1:776737041352:web:882b4596f13387173aeefd"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db }