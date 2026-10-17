export interface LoginRequest {
    email: string;
    password: string;
}
// data que se envia para iniciar sesión

export interface LoginResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: {
    id: string;
    username: string;
    };
}
// data de la respuesta esperada de inicio de seccion

export interface LoginFormProps {
    onLogin: (
    data: LoginRequest
  ) => void;

  loading: boolean;
  error: string;
}
// data de las propiedades del componente login form