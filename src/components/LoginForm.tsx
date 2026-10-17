import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Pressable
} from "react-native";

interface LoginFormProps {
    onLogin: (username: string, password: string) => void;
    loading: boolean;
    error: string;
}

export default function LoginForm({
    onLogin,
    loading,
    error
}: LoginFormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleUsernameChange = (text: string) => {
        setUsername(text);
        if (text.trim() !== "") {
            setUsernameError("");
        }
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (text.trim() !== "") {
            setPasswordError("");
        }
    };

    const handleLogin = () => {
        let valid = true;

        setUsernameError("");
        setPasswordError("");

        if (username.trim() === "") {
            setUsernameError("El correo es obligatorio");
            valid = false;
        }

        if (password.trim() === "") {
            setPasswordError("La contraseña es obligatoria");
            valid = false;
        }

        if (!valid) {
            return;
        }

        onLogin(username, password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Iniciar sesión
            </Text>

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
                style={[
                    styles.input,
                    usernameError !== "" ? styles.inputError : null
                ]}
                placeholder="Ingresa tu correo"
                value={username}
                onChangeText={handleUsernameChange}
                autoCapitalize="none"
                autoCorrect={false}
            />

            {usernameError !== "" && (
                <Text style={styles.error}>
                    {usernameError}
                </Text>
            )}

            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[
                        styles.passwordInput,
                        passwordError !== "" ? styles.inputError : null
                    ]}
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                />

                <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.showButton}
                >
                    <Text>
                        {showPassword ? "Ocultar" : "Mostrar"}
                    </Text>
                </Pressable>
            </View>

            {passwordError !== "" && (
                <Text style={styles.error}>
                    {passwordError}
                </Text>
            )}

            {error !== "" && (
                <Text style={styles.error}>
                    {error}
                </Text>
            )}

            <Button
                title={loading ? "Validando..." : "Iniciar sesión"}
                onPress={handleLogin}
                disabled={loading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 5,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 5,
    },
    passwordInput: {
        flex: 1,
        padding: 12,
    },
    showButton: {
        padding: 10,
    },
    inputError: {
        borderColor: "red",
    },
    error: {
        color: "red",
        marginBottom: 15,
    },
});