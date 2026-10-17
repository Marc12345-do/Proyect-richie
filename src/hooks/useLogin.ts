import { useState } from "react";
import { loginService } from "../services/auth.service";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await loginService({
        email: username,
        password: password,
      });

      setLoading(false);

      if (response.success) {
        // Guardamos el token y el correo real en el almacenamiento local
        if (response.token) {
          localStorage.setItem("token", response.token);
        }
        
        // Usamos una aserción de tipo para acceder a la propiedad email de forma segura
        const userObj = response.user as { email?: string; username?: string };
        const userEmail = userObj?.email || userObj?.username || username;
        
        localStorage.setItem("userEmail", userEmail);
        return true;
      } else {
        setError(response.message || "Usuario o contraseña incorrectos");
        return false;
      }
    } catch (err) {
      setLoading(false);
      setError("No se pudo conectar con el servidor. Verifica tu conexión.");
      return false;
    }
  };

  return {
    login,
    loading,
    error,
  };
};