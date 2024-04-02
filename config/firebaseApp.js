// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCJA1_LuULbSpOm-LlBTZys8_LLfFkvl7M",
    authDomain: "crossplatform-28fad.firebaseapp.com",
    projectId: "crossplatform-28fad",
    storageBucket: "crossplatform-28fad.appspot.com",
    messagingSenderId: "843836233579",
    appId: "1:843836233579:web:1107a9cb23ea7ffaf59e2e",
    measurementId: "G-X5L9FR7S0Z"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };