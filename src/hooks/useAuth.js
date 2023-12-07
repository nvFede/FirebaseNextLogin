// useAuth.js

import { auth } from "@/config/firebase";

import {
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import firebaseErrorMessages from "@/utils/firebaseErrors.json";

const mapFirebaseError = (errorCode) => {
  return firebaseErrorMessages[errorCode] || "Ocurrió un error inesperado";
};

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(mapFirebaseError(error.code));
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(mapFirebaseError(error.code));
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(mapFirebaseError(error.code));
  }
};

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error) {
    throw new Error(mapFirebaseError(error.code));
  }
};

export const observeAuthState = (callback) => {
  const unsubscribe = onAuthStateChanged(
    auth,
    (user) => {
      callback(user);
    },
    (error) => {
      throw new Error(mapFirebaseError(error.code));
    }
  );

  return unsubscribe;
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw new Error(mapFirebaseError(error.code));
  }
};


export const updatePassword = async (newPassword) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await user.updatePassword(newPassword);
    } catch (error) {
      throw new Error(mapFirebaseError(error.code));
    }
  } else {
    throw new Error('No user logged in');
  }
};


export const deleteUserAccount = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      await user.delete();
    } catch (error) {
      throw new Error(mapFirebaseError(error.code));
    }
  } else {
    throw new Error('No user logged in');
  }
};
