import Navigation from "@/components/Navigation";
import { AuthContext } from "@/context/AuthContext"; // Importa el contexto

import { useRouter } from "next/router";
import React, { useEffect, useContext } from "react"; // Importa useContext

const MainLayout = ({ children }) => {
  const { state } = useContext(AuthContext); // Usa useContext para consumir AuthContext
  const router = useRouter();

  useEffect(() => {
    if (!state.user) {
      router.push("/login"); // Redireccionar al login si no está autenticado
    }
  }, [state.user, router]);

  if (!state.user) {
    return <div>Cargando...</div>; // O un indicador de carga
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="flex flex-col">
        {Object.entries(state.user).map(([key, value]) => (
          <p key={key} className="text-2xl">
            {`${key.charAt(0).toUpperCase()}${key.slice(1)}: ${value}`}
          </p>
        ))}
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
