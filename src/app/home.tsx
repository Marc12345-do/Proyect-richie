import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import SideMenu from "../components/SideMenu";

export default function HomeScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>({ email: "ana@test.com" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = localStorage.getItem("token") || localStorage.getItem("authToken"); 

        if (!token) return;

        const response = await fetch("http://localhost:4000/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (response.ok && data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuOpen(true)}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>

        <Text style={styles.greeting}>
          Hola, {loading ? "..." : (user?.email || "Usuario")} 👋
        </Text>
        
        <Text style={styles.profile}>👤</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>¡Bienvenida!</Text>
        <Text style={styles.subtitle}>Nos alegra verte nuevamente.</Text>
      </View>

      <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    height: 70,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    elevation: 3,
  },
  menuIcon: {
    fontSize: 28,
    color: "#1F2937",
  },
  greeting: {
    flex: 1,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  profile: {
    fontSize: 25,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
});