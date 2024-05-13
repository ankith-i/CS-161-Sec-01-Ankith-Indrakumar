// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYdkr_7LTiloMNfMLfv0FEsdFZ6Lviz08",
  authDomain: "map-coloring-18ff5.firebaseapp.com",
  projectId: "map-coloring-18ff5",
  storageBucket: "map-coloring-18ff5.appspot.com",
  messagingSenderId: "385764321127",
  appId: "1:385764321127:web:5187a800917f208b6e71c2",
  measurementId: "G-XCRS0VSRK3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
