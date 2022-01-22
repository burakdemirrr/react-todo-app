// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaq4KL46HA7v4hWRBly8OeHw529XWE3HI",
  authDomain: "crud-b6bb2.firebaseapp.com",
  projectId: "crud-b6bb2",
  storageBucket: "crud-b6bb2.appspot.com",
  messagingSenderId: "692799034331",
  appId: "1:692799034331:web:bc1e4f838a2e49a1220dfe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore();
