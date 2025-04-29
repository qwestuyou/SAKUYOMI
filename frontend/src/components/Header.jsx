import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md rounded-b-2xl">
      <Link to="/" className="flex items-center text-2xl font-bold text-gray-800 gap-2">
        <img src="/images/sakura (3).png" alt="Logo" className="w-8 h-8" />
        SAKUYOMI
      </Link>
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <div
          className={`md:flex md:items-center md:gap-4 ${
            isMenuOpen ? "flex animate-slideIn mobile-menu" : "hidden"
          } flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none`}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="px-20 py-2 pl-10 rounded-xl border border-[#c97476] focus:outline-none focus:ring-2 focus:ring-[#f8c1c1]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c97476]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <button className="text-xl mb-2 md:mb-0 nav-button" aria-label="Cart">
            🛒
          </button>

          {user ? (
            <>
              <Link
                to="/add-product"
                className="px-5 py-2 bg-[#f59c9e] text-white rounded-full hover:bg-[#e0bcbc] text-sm mb-2 md:mb-0 transition-colors duration-300 nav-button"
              >
                Add Product
              </Link>
              <Link
                to="/profile"
                className="px-5 py-2 bg-[#f59c9e] text-white rounded-full hover:bg-[#e0bcbc] text-sm mb-2 md:mb-0 transition-colors duration-300 nav-button"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="px-5 py-2 bg-[#f59c9e] text-white rounded-full hover:bg-[#e0bcbc] text-sm transition-colors duration-300 nav-button"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 bg-[#f59c9e] text-white rounded-full hover:bg-[#e0bcbc] text-sm mb-2 md:mb-0 transition-colors duration-300 nav-button"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-[#f59c9e] text-white rounded-full hover:bg-[#e0bcbc] text-sm transition-colors duration-300 nav-button"
              >
                Register
              </Link>
              <Link
                to="/add-product"
                className="px-5 py-2 bg-[#f59c9e] text-white rounded-full hover:bg-[#e0bcbc] text-sm mb-2 md:mb-0 transition-colors duration-300 nav-button"
              >
                Add Product
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}