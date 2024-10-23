"use client"; // This file is a client component

import { useContext } from "react";
import { AppContext } from "./context/AppContext"; // Import AppContext
import AuthForm from "./pages/auth/auth";
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";

export default function ClientWrapper({ children }) {
  // Access the user and logout from AppContext using useContext
  const { user, logout } = useContext(AppContext); // Correctly access AppContext here

  return (
    <>
      {user ? (
        <div className="min-h-screen flex bg-gray-100">
          <SideBar />

          <div className="flex-1 bg-gray-100 p-6">
            <Navbar />
            <main>{children}</main>
          </div>
        </div>
      ) : (
        <AuthForm />
      )}
    </>
  );
}
