import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqu3z3F-YSUPXcmHd94NerFNSEdvbDz1s",
  authDomain: "millionaire-journey-ed8df.firebaseapp.com",
  projectId: "millionaire-journey-ed8df",
  storageBucket: "millionaire-journey-ed8df.appspot.com", // Note: fixed the storageBucket URL
  messagingSenderId: "1009190478365",
  appId: "1:1009190478365:web:d8af52f36ab402a8b15cf4",
  measurementId: "G-7P2ED91FBJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };