// useAuth.js
import { useEffect, useContext } from "react";
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
import { AuthContext } from "@/context/AuthContext";

const mapFirebaseError = (errorCode) => {
  return firebaseErrorMessages[errorCode] || "Ocurrió un error inesperado";
};

const useAuthHook = () => {
  const { dispatch } = useContext(AuthContext);

  const handleError = (error) => {
    const errorMessage = mapFirebaseError(error.code);
    console.log("🚀 ~ file: useAuth.js:51 ~ signIn ~ error:", errorMessage);

    dispatch({ type: "AUTH_ERROR", error: errorMessage });
  };

  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({ type: "SIGNUP_SUCCESS", user: userCredential.user });
      return true; // Indica éxito
    } catch (error) {
      handleError(error);
      return false; // Indica falla
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({ type: "LOGIN_SUCCESS", user: userCredential.user });
      return true; // Indica éxito
    } catch (error) {
      handleError(error);
      return false; // Indica falla
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" }); // Actualiza el estado global
      return true; // Indica éxito
    } catch (error) {
      handleError(error);
      return false; // Indica falla
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      dispatch({ type: "LOGIN_SUCCESS", user: userCredential.user });
      return true; // Indica éxito
    } catch (error) {
      handleError(error);
      return false; // Indica falla
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true; // Indica éxito
    } catch (error) {
      handleError(error);
      return false; // Indica falla
    }
  };

  const updatePassword = async (newPassword) => {
    const user = auth.currentUser; // Obtener el usuario actual desde Firebase
    if (user) {
      try {
        await user.updatePassword(newPassword);
        // Si es necesario, actualiza el estado global aquí
        return true; // Indica éxito
      } catch (error) {
        handleError(error);
        return false; // Indica falla
      }
    } else {
      dispatch({ type: "AUTH_ERROR", error: "No user logged in" });
      return false; // Indica falla
    }
  };

  const deleteUserAccount = async () => {
    const user = auth.currentUser; // Obtener el usuario actual desde Firebase
    if (user) {
      try {
        await user.delete();
        dispatch({ type: "LOGOUT" });
        return true; // Indica éxito
      } catch (error) {
        handleError(error);
        return false; // Indica falla
      }
    } else {
      return false; // Indica falla
      dispatch({ type: "AUTH_ERROR", error: "No user logged in" });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          dispatch({ type: "LOGIN_SUCCESS", user });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      },
      handleError
    );

    return unsubscribe;
  }, []);

  return {
    signUp,
    signIn,
    logout,
    loginWithGoogle,
    resetPassword,
    updatePassword,
    deleteUserAccount,
  };
};

export default useAuthHook;
