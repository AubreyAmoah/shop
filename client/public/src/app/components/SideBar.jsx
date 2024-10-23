"use client";
import React from "react";
import Link from "next/link";

const SideBar = () => {
  const [isOpen, setIsOpen] = React.useState(false); // State to toggle sidebar

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0 max-[800px]:w-0 max-[800px]:hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold">E-commerce Dashboard</h2>
          <nav className="mt-10">
            <Link
              href="/"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            >
              Dashboard
            </Link>
            <Link
              href="/pages/shop"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            >
              Shop
            </Link>
            <Link
              href="/pages/cart"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            >
              Cart
            </Link>
          </nav>
        </div>
      </aside>

      {/* Hamburger Icon */}
      <div className="p-4 bg-gray-900 text-white md:hidden">
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          {/* Hamburger Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex-shrink-0 p-6 transition-transform duration-300 ease-in-out transform md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } hidden max-[800px]:block z-40`} // Hide sidebar on mobile by default, show when toggled
      >
        <h2 className="text-xl font-semibold">E-commerce Dashboard</h2>
        <nav className="mt-10">
          <Link
            href="/"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            href="/pages/shop"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Orders
          </Link>
          <Link
            href="/pages/cart"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Cart
          </Link>
        </nav>
      </aside>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default SideBar;
