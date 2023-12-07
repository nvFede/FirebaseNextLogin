import React, { useState } from "react";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import { useAuth } from "@/hooks/AuthContext";

import { login, loginWithGoogle } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
  const [state, dispatch] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      // Establecer la persistencia basada en la elección del usuario
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      const user = await login(email, password);
      dispatch({ type: "LOGIN_SUCCESS", user });
      router.push("/dashboard"); // Redirect to dashboard
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", error: error.message });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      dispatch({ type: "LOGIN_SUCCESS", user });
      router.push("/dashboard"); // Redirect to dashboard
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", error: error.message });
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* {state.error && <p>{state.error}</p>} */}

      <div className="flex min-h-screen justify-center items-center">
        <div className="flex flex-col bg-white">
          <input
            className="p-5 m-5"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="p-5 m-5"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe">Recuérdame</label>

          <button onClick={handleLogin} className="bg-red-500 p-5 text-white">
            Submit
          </button>
          {state.error && <p>Error: {state.error}</p>}

          <div className="flex">
            Do you have an account? <Link href={`/signup`}>Sign Up</Link>
          </div>
          {/* Login form elements */}
          <button className="bg-red-400 p-5" onClick={handleGoogleLogin}>
            Login With Google
          </button>
          <Link href="/password-reset">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
