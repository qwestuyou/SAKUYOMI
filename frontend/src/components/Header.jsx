import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const bgMain = theme === "dark" ? "bg-[#1e1e1e]" : "bg-white";
  const bgDropdown = theme === "dark" ? "bg-[#1e1e1e]" : "bg-white";
  const textMain = theme === "dark" ? "text-white" : "text-gray-800";

  return (
      <nav className={`flex justify-between items-center px-6 py-4 shadow-md rounded-b-2xl relative transition-colors duration-300 ${bgMain}`}>
        {/* Logo */}
        <Link to="/" className={`flex items-center text-2xl font-bold gap-2 ${textMain}`}>
          <img src="/images/sakura (3).png" alt="Logo" className="w-8 h-8" />
          SAKUYOMI
        </Link>

        {/* Mobile menu button */}
        <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        {/* Menu block */}
        <div
            className={`md:flex md:items-center md:gap-4 ${
                isMenuOpen ? "flex animate-slideIn" : "hidden"
            } flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto ${bgDropdown} p-4 md:p-0 shadow-md md:shadow-none z-40 rounded-xl md:rounded-none transition-colors duration-300`}
        >
          {/* Theme toggle */}
          <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border-2 border-pink-300 flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            {theme === "dark" ? <Sun className="text-yellow-300" /> : <Moon className="text-[#f59c9e]" />}
          </button>

          {/* Auth Buttons */}
          {user ? (
              <>
                <div className="relative group">
                  <img
                      src={
                        user.avatar
                            ? `http://localhost:5000${user.avatar}`
                            : "/images/default-avatar.png"
                      }
                      alt="avatar"
                      className="w-15 h-15 rounded-full object-cover cursor-pointer border-2 border-[#f59c9e]"
                  />
                  <div className={`absolute right-0 w-32 ${bgDropdown} rounded-xl shadow-lg py-2 hidden group-hover:block z-50`}>
                    <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#feeae6]"
                    >
                      Profile
                    </Link>
                    <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#feeae6]"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
          ) : (
              <>
                <Link
                    to="/login"
                    className={`px-5 py-2 rounded-full text-sm mb-2 md:mb-0 transition-colors duration-300 nav-button ${
                        theme === "dark"
                            ? "bg-[#9b5f5f] text-white hover:bg-[#b87575]"
                            : "bg-[#f59c9e] text-white hover:bg-[#e0bcbc]"
                    }`}
                >
                  Login
                </Link>
                <Link
                    to="/register"
                    className={`px-5 py-2 rounded-full text-sm mb-2 md:mb-0 transition-colors duration-300 nav-button ${
                        theme === "dark"
                            ? "bg-[#9b5f5f] text-white hover:bg-[#b87575]"
                            : "bg-[#f59c9e] text-white hover:bg-[#e0bcbc]"
                    }`}
                >
                  Register
                </Link>
              </>
          )}
        </div>
      </nav>
  );
}
