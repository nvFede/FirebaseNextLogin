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
          className="rounded-md shadow-sm w-full block mt-2 p-2 border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="rounded-md shadow-sm w-full block mt-2 p-2 border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <div className="flex justify-between my-4  border-b border-b-gray-200 pb-4">
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe ml-2">Recuérdame</label>
          </div>

          <button
            onClick={handleLogin}
            className="bg-red-500 py-2 px-4 rounded-lg text-white"
          >
            Send
          </button>
        </div>

        {/* Login form elements */}
        <button
          className="bg-[#EA4335] w-full px-4 py-2 rounded-lg text-white"
          onClick={handleGoogleLogin}
        >
          Login With Google
        </button>
        <div className="flex my-2 gap-4">
          Do you have an account? <Link href={`/signup`} >Sign Up</Link>
        </div>
        <div className="flex h-10 ">
          {state.error && <p className="text-red-500 ">Error: {state.error}</p>}
        </div>

        <Link href="/password-reset">¿Olvidaste tu contraseña?</Link>
      </AuthCard>
    </div>
  );
};

export default Login;
