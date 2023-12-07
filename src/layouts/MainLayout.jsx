import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const MainLayout = ({ children }) => {
  const [{ user }] = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redireccionar al login si no está autenticado
    }
  }, [user, router]);

  if (!user) {
    return <div>Cargando...</div>; // O un indicador de carga
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="flex flex-col">
        {Object.entries(user).map(([key, value]) => (
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
