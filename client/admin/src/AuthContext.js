import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // To store the authenticated user
  const [loading, setLoading] = useState(false); // Loading state for actions

  const checkSession = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5500/api/admin/me", {
        withCredentials: true,
      });

      console.log(response.data);
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.log("No active session", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  // Function to log in
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5500/api/auth/admin/signin",
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user); // Save the logged-in user data
      toast.success("Login successful");
      checkSession();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Function to log out
  const logout = async () => {
    try {
      await axios.get("http://localhost:5500/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null); // Clear the user from context
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, setLoading, checkSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};
