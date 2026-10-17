import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useProfile } from "../hooks/useProfile";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, loading, error } = useProfile();

  const email = user?.email || user?.username || "Cargando...";
  const initial = email !== "Cargando..." ? email.charAt(0).toUpperCase() : "U";

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator size="large" color="#2563EB" />
        ) : (
          <>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initial}</Text>
            </View>
            <Text style={styles.title}>Perfil de Usuario</Text>

            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <>
                <Text style={styles.label}>Correo Electrónico:</Text>
                <Text style={styles.value}>{email}</Text>

                <Text style={styles.label}>Estado de Cuenta:</Text>
                <Text style={styles.value}>Activa / Autenticado 🟢</Text>
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: "#2563EB",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 12,
    alignItems: "center",
    elevation: 4,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111827",
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  errorText: {
    color: "#DC2626",
    fontSize: 14,
    marginTop: 10,
  },
});