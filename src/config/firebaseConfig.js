import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyDiXrLIdZyCdyrpO5yxiYF3KJCzBslecRw",
    authDomain: "modnus-92048.firebaseapp.com",
    projectId: "modnus-92048",
    storageBucket: "modnus-92048.appspot.com",
    messagingSenderId: "738907476533",
    appId: "1:738907476533:web:02e6767fede3a622e3977c",
    measurementId: "G-NJSZGWLG91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db };