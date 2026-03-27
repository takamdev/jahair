// Import the functions you need from the SDKs you need
import { initializeApp }from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";


export const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "jahairstyle-7ed77.firebaseapp.com",
  projectId: "jahairstyle-7ed77",
  storageBucket: "jahairstyle-7ed77.firebasestorage.app",
  messagingSenderId: "725382733393",
  appId:process.env.appId
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)

if(db) console.log("connect to success");
   else console.log("connection failed");
   
