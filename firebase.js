// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcvXURlnwT37N8pQ1nnbDu3LIYE5IKdzg",
  authDomain: "shop-ce1b3.firebaseapp.com",
  databaseURL: "https://shop-ce1b3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shop-ce1b3",
  storageBucket: "shop-ce1b3.appspot.com",
  messagingSenderId: "680810717854",
  appId: "1:680810717854:web:8e4039c325525b5afd118f",
  measurementId: "G-SSQV4F6EZD"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const database = getDatabase(app);


export default app;
export {database}