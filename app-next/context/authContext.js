import { API_ROUTES } from "@/utils/api";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);

  const register = async (name, email, password, role) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_ROUTES.AUTH}/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data?.error || `Request failed (${res.status})`);

      setIsLoading(false);
      return data?.userId ?? null;
    } catch (err) {
      setError(err.message || "Register Failed");
      setIsLoading(false);
      return null;
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_ROUTES.AUTH}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data?.error || `Request failed (${res.status})`);
      console.log(data);
      setUser(data?.user ?? null);
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.message || "Login Failed");
      setIsLoading(false);
      return null;
    }
  };
  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_ROUTES.AUTH}/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      setUser(null);
      setIsLoading(false);
    } catch (err) {
      setError(err.message || "Logout Failed");
      setIsLoading(false);
    }
  };
  const values = {
    isLoading,
    setIsLoading,
    error,
    setError,
    user,
    setUser,
    login,
    register,
    logout,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export const useAuthContext = () => useContext(AuthContext);
