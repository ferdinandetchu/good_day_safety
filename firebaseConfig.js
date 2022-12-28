import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCueKfyQEVX7V-_pzFErGuoEvpyvujz_Xg",
    authDomain: "good-safety-app.firebaseapp.com",
    projectId: "good-safety-app",
    storageBucket: "good-safety-app.appspot.com",
    messagingSenderId: "1026683641751",
    appId: "1:1026683641751:web:254ac26839f4eca8952ed2",
    measurementId: "G-1GVN1PDG33"
};
export const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
