// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4di1xmJewm4WGR56zclikV41uvaSLVa0",
  authDomain: "fir-87a9a.firebaseapp.com",
  projectId: "fir-87a9a",
  storageBucket: "fir-87a9a.appspot.com",
  messagingSenderId: "254534474296",
  appId: "1:254534474296:web:26a98340f5886c09e9e4cd",
  measurementId: "G-W3XP9GRN12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;