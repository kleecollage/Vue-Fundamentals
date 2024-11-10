import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3JamkXUd8kpEg1184NzpjiZWPK_U9MLI",
  authDomain: "vue-3-a37f1.firebaseapp.com",
  projectId: "vue-3-a37f1",
  storageBucket: "vue-3-a37f1.firebasestorage.app",
  messagingSenderId: "776737041352",
  appId: "1:776737041352:web:882b4596f13387173aeefd"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp)
const auth = getAuth();
const db = getFirestore();

export { auth, db, storage };