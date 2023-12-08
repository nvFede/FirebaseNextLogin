import Link from "next/link";
import React, { useContext } from "react";
import useAuth from "@/hooks/useAuth"; // Asegúrate de que la ruta sea correcta
import { AuthContext } from "@/context/AuthContext"; // Importa el contexto

const Navigation = () => {
  const { logout } = useAuth(); // Usa la función logout desde el hook useAuth
  const { state, dispatch } = useContext(AuthContext); // Usa useContext para consumir AuthContext

  const handleLogout = async () => {
    try {
      await logout();
      dispatch({ type: "LOGOUT" }); // Este dispatch podría ser opcional, dependiendo de cómo esté configurado tu hook
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
