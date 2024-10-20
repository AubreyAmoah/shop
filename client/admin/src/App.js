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

function App() {
  const [user, setUser] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Navbar open={open} setOpen={setOpen} />
      <Sidebar open={open} user={user} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user === false ? <Login /> : <Home />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
