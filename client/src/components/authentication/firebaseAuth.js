

import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxIgnu1aUC973MTTXVfono4Wn1dF8Fp68",
  authDomain: "betareeqak-8fd62.firebaseapp.com",
  projectId: "betareeqak-8fd62",
  storageBucket: "betareeqak-8fd62.appspot.com",
  messagingSenderId: "124157446924",
  appId: "1:124157446924:web:b080970da991bb93a41729"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db= getFirestore(app);

export {auth,db} ;