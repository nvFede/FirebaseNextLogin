import { useAuth } from "@/hooks/AuthContext";
import { signUp } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, dispatch] = useAuth();
  const router = useRouter();

  const handleSignup = async () => {

    
    if (password !== confirmPassword) {
      dispatch({ type: "SIGNUP_FAILURE", error: "Passwords don't match" });
      return;
    }
    
    try {
      const user = await signUp(email, password);
      console.log('aca s')
      dispatch({ type: "SIGNUP_SUCCESS", user });
      router.push("/dashboard"); // Redirect to dashboard
    } catch (error) {
      dispatch({ type: "SIGNUP_FAILURE", error: error.message });
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col bg-white">
        <input className="p-5 m-5"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input className="p-5 m-5"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input className="p-5 m-5"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <button onClick={handleSignup} className="bg-red-500 p-5 text-white">Sign Up</button>
        {state.error && <p>Error: {state.error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
