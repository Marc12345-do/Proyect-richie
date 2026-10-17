import { useState, useEffect } from "react";
import { getProfileService } from "../services/auth.service";

export const useProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

    const fetchProfile = async () => {
    setLoading(true);
    setError("");

    const response = await getProfileService();

    if (response.success && response.user) {
      setUser(response.user);
    } else {
      setError(response.message || "No se pudo obtener la información");
      // Respaldo con el email guardado en login si falla la red
      const savedEmail = localStorage.getItem("userEmail");
      if (savedEmail) {
        setUser({ email: savedEmail });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    user,
    loading,
    error,
    refetchProfile: fetchProfile,
  };
};