// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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
const analytics = getAnalytics(app);