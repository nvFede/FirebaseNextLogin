// login.js

import React, { useContext, useState } from "react";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import { useRouter } from "next/router";
import Link from "next/link";
import useAuth from "@/hooks/useAuth"; // Asegúrate de que la ruta sea correcta
import { AuthContext } from "@/context/AuthContext";
import AuthCard from "@/components/AuthCard";

const Login = () => {
  const { signIn, loginWithGoogle } = useAuth();
  const { state } = useContext(AuthContext); // Utiliza useContext aquí

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const handleLogin = async () => {
    const success = await signIn(email, password);
    if (success) {
      router.push("/dashboard");
    }
  };

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle();
    if (success) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-10">
      <AuthCard>
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
          

          <div className="flex">
            Do you have an account? <Link href={`/signup`}>Sign Up</Link>
          </div>
          {/* Login form elements */}
          <button className="bg-red-400 p-5" onClick={handleGoogleLogin}>
            Login With Google
          </button>

          {state.error && <p className="text-red-500">Error: {state.error}</p>}

          <Link href="/password-reset">¿Olvidaste tu contraseña?</Link>
        
      </AuthCard>
    </div>
  );
};

export default Login;
