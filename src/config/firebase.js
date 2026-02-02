import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';

// Firebase configuration
// Replace with your actual Firebase config
const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Auth methods
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithFacebook = () => signInWithPopup(auth, facebookProvider);
export const signInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
export const signUpWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
export const signOut = () => firebaseSignOut(auth);
