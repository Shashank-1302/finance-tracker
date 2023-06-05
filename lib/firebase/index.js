// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyDyZsxiXXNbDvGcgNLmG4-XSvxUeYXw7c8",
  authDomain:"finance-tracker-f499f.firebaseapp.com",
  projectId: "finance-tracker-f499f",
  storageBucket: "finance-tracker-f499f.appspot.com" ,
  messagingSenderId: "271213927837",
  appId: "1:271213927837:web:b09954da54b32a2357e374"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
