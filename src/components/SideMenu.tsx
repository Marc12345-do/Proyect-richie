import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { SideMenuProps } from "../interfaces/menu.interface";
import MenuItem from "./MenuItem";

export default function SideMenu({ visible, onClose }: SideMenuProps) {
  const [userEmail, setUserEmail] = useState("char@test.com");
  const router = useRouter();

  useEffect(() => {
    async function fetchSideMenuData() {
      if (!visible) return;
      try {
        const token = localStorage.getItem("token");
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
          setUserEmail(data.user.email || data.user.username || "char@test.com");
        }
      } catch (error) {
        console.error("Error al obtener perfil en menú:", error);
      }
    }

    fetchSideMenuData();
  }, [visible]);

  if (!visible) {
    return null;
  }

  const initial = userEmail ? userEmail.charAt(0).toUpperCase() : "C";

  const handleGoToProfile = () => {
    onClose(); // Cerramos el menú lateral
    router.push("/profile"); // Navegamos a la pestaña/pantalla de perfil
  };

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.background} onPress={onClose} />

      <View style={styles.menu}>
        <View style={styles.userContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <Text style={styles.name}>Usuario Activo</Text>
          <Text style={styles.email}>{userEmail}</Text>
        </View>

        <MenuItem title="Inicio" onPress={onClose} />
        
        <MenuItem 
          title="Mi Perfil" 
          onPress={handleGoToProfile} 
        />

        <MenuItem title="Configuración" onPress={() => {}} />

        <View style={styles.spacer} />

        <TouchableOpacity 
          style={styles.logout} 
          onPress={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            window.location.href = "/";
          }}
        >
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    zIndex: 1000,
  },
  menu: {
    width: "80%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
    paddingBottom: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  userContainer: {
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    alignItems: "center",
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  name: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#6B7280",
  },
  spacer: {
    flex: 1,
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  logoutIcon: {
    fontSize: 22,
    width: 40,
  },
  logoutText: {
    fontSize: 16,
    color: "#DC2626",
    fontWeight: "600",
  },
  background: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
});