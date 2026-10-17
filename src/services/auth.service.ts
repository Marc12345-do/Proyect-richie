import { LoginRequest, LoginResponse } from "../interfaces/auth.interface";

// Obtenemos la URL base desde las variables de entorno de Expo (apunta a http://localhost:4000/api)
const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000/api";

export const loginService = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Credenciales incorrectas o error en el servidor",
      };
    }

    return {
      success: true,
      message: result.message || "Login correcto",
      token: result.token,
      user: result.user
        ? {
            id: String(result.user.id),
            username: String(result.user.username || result.user.email),
          }
        : undefined,
    };
  } catch (error) {
    console.error("Error de red en loginService:", error);
    return {
      success: false,
      message: "No se pudo conectar con el servidor. Verifica tu conexión.",
    };
  }
};

/**
  Servicio para obtener los datos del perfil del usuario autenticado (/auth/me)
 */
export const getProfileService = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return {
        success: false,
        message: "No se encontró el token de sesión.",
      };
    }

    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Error al consultar la información del perfil.",
      };
    }

    return {
      success: true,
      user: result.user,
    };
  } catch (error) {
    console.error("Error de red en getProfileService:", error);
    return {
      success: false,
      message: "No se pudo conectar con el servidor. Verifica tu conexión.",
    };
  }
};