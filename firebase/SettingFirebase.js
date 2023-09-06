// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO5LcJBfNqc0KOoNbAph8L8zgAMtz28BY",
  authDomain: "bcp-monitoring.firebaseapp.com",
  projectId: "bcp-monitoring",
  storageBucket: "bcp-monitoring.appspot.com",
  messagingSenderId: "500541012621",
  appId: "1:500541012621:web:269bd831f45ac8ece000c4",
  measurementId: "G-K158X8R0G4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// if (!firebase.getApps.length) {
//   firebase.initializeApp(firebaseConfig);
//   }

const auth=getAuth(app);
const db=getFirestore(app)
const storage=getStorage(app)

export {auth,db,storage}