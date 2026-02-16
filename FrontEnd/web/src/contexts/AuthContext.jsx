import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiLogin, apiRegister } from "@/services/api.js";

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

function mapRoleToBackend(role) {
  // Front roles: "driver" | "user"
  return role === "driver" ? "DRIVER" : "PASSENGER";
}

function mapBackendUserToFront(u) {
  return {
    id: u?.id,
    email: u?.email,
    name: u?.fullName ?? u?.name ?? "User",
    role: u?.role === "DRIVER" ? "driver" : "user",
  };
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("smarttaxi_user");
    const storedToken = localStorage.getItem("smarttaxi_token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("smarttaxi_user");
        localStorage.removeItem("smarttaxi_token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    if (!email || !password) throw new Error("Email and password are required");
    const data = await apiLogin({ email, password }); // { token, user }
    const frontUser = mapBackendUserToFront(data.user);

    setUser(frontUser);
    setIsAuthenticated(true);
    localStorage.setItem("smarttaxi_user", JSON.stringify(frontUser));
    localStorage.setItem("smarttaxi_token", data.token);

    return frontUser;
  };

  const signup = async (email, password, role) => {
    if (!email || !password) throw new Error("Email and password are required");

    const backendRole = mapRoleToBackend(role);
    const fullName = role === "driver" ? "New Driver" : "New User";

    const data = await apiRegister({
      fullName,
      email,
      password,
      role: backendRole,
    }); // { token, user }

    const frontUser = mapBackendUserToFront(data.user);

    setUser(frontUser);
    setIsAuthenticated(true);
    localStorage.setItem("smarttaxi_user", JSON.stringify(frontUser));
    localStorage.setItem("smarttaxi_token", data.token);

    return frontUser;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("smarttaxi_user");
    localStorage.removeItem("smarttaxi_token");
  };

  const value = useMemo(
    () => ({ user, isAuthenticated, loading, login, signup, logout }),
    [user, isAuthenticated, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
