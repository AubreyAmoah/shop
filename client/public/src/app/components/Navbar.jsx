import React from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { user, logout } = React.useContext(AppContext);
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold max-[400px]:hidden">Simple Shop</h1>
      <div className="flex justify-end items-center w-full">
        {/* <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 border rounded-md"
        /> */}
        <button
          onClick={logout}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Navbar;
