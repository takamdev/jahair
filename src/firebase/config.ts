// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDo0wd7nRSYOZQ2sdtf8RaxaDOX0MZ_9SM",
  authDomain: "jahair-84c44.firebaseapp.com",
  projectId: "jahair-84c44",
  storageBucket: "jahair-84c44.appspot.com",
  messagingSenderId: "785202371298",
  appId: "1:785202371298:web:602cb2119dc7b317c55cbb",
  measurementId: "G-EKGT2BH0C7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
if(db) console.log("connexion etablie");
   else console.log("echec de connexion");
   
