import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import React from "react";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [user, setUser] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const closeSideBar = () => {
    setOpen(false);
  };

  const verifySession = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/api/auth/verify",
        { withCredentials: true }
      );
      if (response.status === 200) setUser(true);
    } catch (error) {
      console.error(error);
      setUser(false);
    }
  };

  const handleLogout = async () => {
    if (loading === true) {
      return;
    }
    setLoading(true);
    try {
      await axios.get("http://localhost:5500/api/auth/logout", {
        withCredentials: true,
      });
      toast.success("Logout success");
      closeSideBar();
      verifySession();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  React.useState(() => {
    verifySession();
  }, []);
  return (
    <div className="relative scrollbar-thin">
      <Toaster />
      <Navbar open={open} setOpen={setOpen} user={user} />
      <Sidebar open={open} user={user} handleLogout={handleLogout} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user === false ? (
                <Login
                  session={verifySession}
                  loading={loading}
                  setLoading={setLoading}
                />
              ) : (
                <Home loading={loading} handleLogout={handleLogout} />
              )
            }
          />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
