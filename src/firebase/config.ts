// Import the functions you need from the SDKs you need
import { initializeApp }from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";


export const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "jahair-style.firebaseapp.com",
  projectId: "jahair-style",
  storageBucket: "jahair-style.appspot.com",
  messagingSenderId: "437994101250",
  appId:process.env.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)

if(db) console.log("connect to success");
   else console.log("connection failed");
   