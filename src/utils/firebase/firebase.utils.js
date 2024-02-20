import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsit-lnsmqfC8_2wgoIcqmUhjz0IY8Iac",
  authDomain: "crown-clothing-db-82595.firebaseapp.com",
  projectId: "crown-clothing-db-82595",
  storageBucket: "crown-clothing-db-82595.appspot.com",
  messagingSenderId: "700913822974",
  appId: "1:700913822974:web:0bdc1f00838b290e31c9af",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
  }

  return userDocRef;
};
