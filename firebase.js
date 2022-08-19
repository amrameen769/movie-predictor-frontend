// Import the functions you need from the SDKs you need
import {getApp, getApps, initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDc4Pvv0WUwbqOOBP212kM1jxJsUHt_RKo",
    authDomain: "movie-predictor-b566f.firebaseapp.com",
    projectId: "movie-predictor-b566f",
    storageBucket: "movie-predictor-b566f.appspot.com",
    messagingSenderId: "72281060338",
    appId: "1:72281060338:web:0b2f743e3e4ed7f8fd716b"
  };

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);