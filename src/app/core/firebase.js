// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjbzzZJGDJbJQdv0nOs53YrOKzIROPrFI",
  authDomain: "sowesign-e9d81.firebaseapp.com",
  projectId: "sowesign-e9d81",
  storageBucket: "sowesign-e9d81.appspot.com",
  messagingSenderId: "20483194941",
  appId: "1:20483194941:web:023d5f750f0515fa976a54",
  measurementId: "G-8WTY0TP30S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig),
  auth = getAuth(app),
  db = getFirestore(app);

export { auth, db };
