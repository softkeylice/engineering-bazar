import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8mp4oe1zghRMYlj5lp2BAG23KVNlNySM",
  authDomain: "engineering-bazar-e0925.firebaseapp.com",
  projectId: "engineering-bazar-e0925",
  storageBucket: "engineering-bazar-e0925.firebasestorage.app",
  messagingSenderId: "696520289923",
  appId: "1:696520289923:web:75415cab557f4cbb5bb5b6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);