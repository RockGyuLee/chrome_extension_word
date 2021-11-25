// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-XTgFIEFMWxkohJj-i0M6YHYZu8lehgc",
  authDomain: "extension-eng-word.firebaseapp.com",
  projectId: "extension-eng-word",
  storageBucket: "extension-eng-word.appspot.com",
  messagingSenderId: "605780350399",
  appId: "1:605780350399:web:00d34c83713b6c13acbd0a",
  measurementId: "G-C1MLRE9C0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


export async function signInWithEmailAndPW(id, pw){
  return signInWithEmailAndPassword(auth, id, pw)
  // .then((userCredential)=>{
  //   return userCredential.user;
  // })
  // .catch((error)=>{
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   console.log(errorMessage);

  //   return errorMessage;
  // })
}