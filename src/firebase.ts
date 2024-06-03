// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxU1d0b4mcnQHIjobijBJv635lvt742Rw",
  authDomain: "twitterclone-87dac.firebaseapp.com",
  projectId: "twitterclone-87dac",
  storageBucket: "twitterclone-87dac.appspot.com",
  messagingSenderId: "656926980718",
  appId: "1:656926980718:web:5f66d33413931aaa11447f",
  measurementId: "G-NX5Y0FNQ16",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
