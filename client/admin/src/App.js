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
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import { AuthContext } from "./AuthContext";
import CategoryCreate from "./pages/CategoryCreate";
import ViewCategory from "./pages/ViewCategory";
import ViewItems from "./pages/ViewItems";
import ItemCreate from "./pages/ItemCreate";

function App() {
  const { user } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  const closeSideBar = () => {
    setOpen(false);
  };
  return (
    <div className="relative scrollbar-thin">
      <Toaster />
      <Navbar open={open} setOpen={setOpen} user={user} />
      <Sidebar open={open} closeSidebar={closeSideBar} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/setting" element={user ? <Profile /> : <Login />} />
          <Route
            path="/createcategory"
            element={user ? <CategoryCreate /> : <Login />}
          />

          <Route
            path="/viewcategories"
            element={user ? <ViewCategory /> : <Login />}
          />

          <Route
            path="/createitem"
            element={user ? <ItemCreate /> : <Login />}
          />
          <Route path="/viewitems" element={user ? <ViewItems /> : <Login />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
