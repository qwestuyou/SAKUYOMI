import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function Header() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const bgMain = theme === "dark" ? "bg-[#1e1e1e]" : "bg-white";
    const bgDropdown = theme === "dark" ? "bg-[#1e1e1e]" : "bg-white";
    const textMain = theme === "dark" ? "text-white" : "text-gray-800";

    return (
        <header className={`shadow-md ${bgMain} transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
                {/* Logo */}
                <Link to="/" className={`flex items-center gap-2 text-2xl font-bold ${textMain}`}>
                    <img src="/images/sakura (3).png" alt="Logo" className="w-8 h-8" />
                    <span className="text-[#f59c9e]">SAKUYOMI</span>
                </Link>

                {/* Mobile menu toggle */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? "✕" : "☰"}
                </button>

                {/* Menu */}
                <div
                    className={`absolute md:static top-16 left-0 w-full md:w-auto z-40 rounded-xl md:rounded-none md:flex-row md:flex md:items-center gap-5 p-4 md:p-0 shadow-md md:shadow-none transition-all duration-300 ${
                        isMenuOpen ? "flex flex-col" : "hidden md:flex"
                    } ${bgDropdown}`}
                >
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full border-2 border-pink-300 flex items-center justify-center hover:scale-110 transition-transform"
                    >
                        {theme === "dark" ? (
                            <Sun className="text-yellow-300" />
                        ) : (
                            <Moon className="text-[#f59c9e]" />
                        )}
                    </button>

                    {/* Auth */}
                    {user ? (
                        <div className="relative group">
                            <img
                                src={
                                    user.avatar
                                        ? `http://localhost:5000${user.avatar}`
                                        : "/images/default-avatar.png"
                                }
                                alt="avatar"
                                className="w-10 h-10 rounded-full object-cover border-2 border-[#f59c9e] cursor-pointer"
                            />
                            <div className="absolute top-12 right-0 w-36 rounded-xl shadow-lg py-2 z-50 hidden group-hover:block transition-all border border-pink-100 bg-white">
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
                    ) : (
                        <div className="flex gap-3">
                            <Link
                                to="/login"
                                className={`px-5 py-2 rounded-full text-sm transition-colors nav-button ${
                                    theme === "dark"
                                        ? "bg-[#9b5f5f] text-white hover:bg-[#b87575]"
                                        : "bg-[#f59c9e] text-white hover:bg-[#e0bcbc]"
                                }`}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className={`px-5 py-2 rounded-full text-sm transition-colors nav-button ${
                                    theme === "dark"
                                        ? "bg-[#9b5f5f] text-white hover:bg-[#b87575]"
                                        : "bg-[#f59c9e] text-white hover:bg-[#e0bcbc]"
                                }`}
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
