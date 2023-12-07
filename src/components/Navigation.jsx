import Link from "next/link";
import React from "react";
import { logout } from "@/hooks/useAuth";
import { useAuth } from "@/hooks/AuthContext";

const Navigation = () => {
  const [state, dispatch] = useAuth();

  const handleLogout = async () => {
    try {
    await logout();
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full h-20 bg-slate-600 flex items-center justify-center text-white">
      <div className="flex w-96 gap-10 justify-center items-center bg-slate-700 p-2">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/music">Music</Link>
        <Link href="/dashboard/audio">Audio</Link>
        {state.user && <button onClick={handleLogout}>Log Out</button>}
      </div>
    </div>
  );
};

export default Navigation;
