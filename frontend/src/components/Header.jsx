import React, {useState, useRef, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {useTheme} from "../context/ThemeContext";
import {Moon, Sun} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";

export default function Header() {
    const {user, logout} = useAuth();
    const {theme, toggleTheme, themeStyles} = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isAdmin = user?.isAdmin;


    return (
        <header className={`shadow-md ${themeStyles.bgMain} transition-colors duration-300`}>

            {isAdmin && (
                <div className="w-full bg-red-600 text-white text-center py-1 font-bold text-sm tracking-widest">
                    🔒 ADMIN MODE ENABLED
                </div>
            )}

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
                <Link to="/" className={`flex items-center gap-2 text-2xl font-bold ${themeStyles.textMain}`}>
                    <img src="/images/sakura (3).png" alt="Logo" className="w-8 h-8"/>
                    <span className="text-[#f59c9e]">SAKUYOMI</span>
                </Link>


                <div className="flex items-center gap-5">
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full border-2 border-pink-300 flex items-center justify-center hover:scale-110 transition-transform"
                    >
                        {theme === "dark" ? (
                            <Sun className="text-yellow-300"/>
                        ) : (
                            <Moon className="text-[#f59c9e]"/>
                        )}
                    </button>

                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`w-10 h-10 rounded-full border-2 ${themeStyles.avatarBorder} overflow-hidden transition-transform hover:scale-105`}
                            >
                                <img
                                    src={
                                        user.avatar
                                            ? `http://localhost:5000${user.avatar}`
                                            : "/images/default-avatar.png"
                                    }
                                    alt="avatar"
                                    className="w-full h-full object-cover"
                                />
                            </button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{opacity: 0, y: -20, scale: 0.9}}
                                        animate={{opacity: 1, y: 0, scale: 1}}
                                        exit={{opacity: 0, y: -10, scale: 0.95}}
                                        transition={{duration: 0.4, type: "spring", damping: 22}}
                                        className={`absolute right-0 mt-2 w-40 overflow-hidden backdrop-blur-lg rounded-xl shadow-2xl z-50 border border-pink-100 ${themeStyles.dropdown.bg}`}
                                    >
                                        <div className="absolute inset-0 pointer-events-none z-[-1]">
                                            <motion.div
                                                initial={{y: -30, x: 10, opacity: 0.6}}
                                                animate={{y: 90, x: -20, opacity: 0}}
                                                transition={{duration: 3, repeat: Infinity, ease: "easeInOut"}}
                                                className="absolute w-5 h-5 bg-pink-300 rounded-full blur-sm opacity-60"
                                                style={{rotate: "45deg"}}
                                            />
                                            <motion.div
                                                initial={{y: -20, x: 30, opacity: 0.5}}
                                                animate={{y: 80, x: -10, opacity: 0}}
                                                transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
                                                className="absolute w-3 h-3 bg-pink-200 rounded-full blur-sm opacity-40"
                                                style={{rotate: "30deg"}}
                                            />
                                        </div>

                                        <Link
                                            to="/profile"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className={`block px-4 py-2 text-sm ${themeStyles.dropdown.text} ${themeStyles.dropdown.hover}`}
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsDropdownOpen(false);
                                                navigate("/");
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm ${themeStyles.dropdown.text} ${themeStyles.dropdown.hover}`}
                                        >
                                            Sign Out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <Link
                                to="/login"
                                className={`px-5 py-2 rounded-full text-sm transition-colors nav-button ${themeStyles.navButton.bg} ${themeStyles.navButton.text} ${themeStyles.navButton.hover}`}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className={`px-5 py-2 rounded-full text-sm transition-colors nav-button ${themeStyles.navButton.bg} ${themeStyles.navButton.text} ${themeStyles.navButton.hover}`}
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
