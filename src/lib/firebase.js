// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKIIEdLFyvyugM8D3Pr5L-V0EzBLFpp98",
  authDomain: "comet-news-app.firebaseapp.com",
  projectId: "comet-news-app",
  storageBucket: "comet-news-app.firebasestorage.app",
  messagingSenderId: "41156810926",
  appId: "1:41156810926:web:7fb7a1b6f2f91ecdf8753f",
  measurementId: "G-GPVV60J73H",
  databaseURL: "https://comet-news-app-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const rtdb = getDatabase(app);

// Export the initialized services
export { app, analytics, db, auth, storage, rtdb };