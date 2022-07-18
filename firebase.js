// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3Rj-glT88QuqmQcX9y5eRwzi6WsfYZgw",
    authDomain: "movie-pred.firebaseapp.com",
    projectId: "movie-pred",
    storageBucket: "movie-pred.appspot.com",
    messagingSenderId: "406240210412",
    appId: "1:406240210412:web:5ae3ad12e189882719a4c9"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);