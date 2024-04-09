// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAdwNQEd8s6kvucvcHC6tnLCTE6JrqkaUg",
    authDomain: "map-coloring.firebaseapp.com",
    projectId: "map-coloring",
    storageBucket: "map-coloring.appspot.com",
    messagingSenderId: "934372614328",
    appId: "1:934372614328:web:9dd3da12803e26fab2544d",
    measurementId: "G-4HDV5L531V"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
