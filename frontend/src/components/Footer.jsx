import React from "react";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
    const { theme } = useTheme();

    const bgFooter = theme === "dark" ? "bg-[#1a1a1a]" : "bg-[#fedfe1]";
    const textMain = theme === "dark" ? "text-gray-200" : "text-gray-800";
    const textMuted = theme === "dark" ? "text-gray-400" : "text-gray-600";
    const iconColor = theme === "dark" ? "text-white" : "text-gray-800";
    const borderTop = theme === "dark" ? "border-gray-700" : "border-pink-100";

    return (
        <footer className={`${bgFooter} transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* About */}
                <div>
                    <h3 className={`font-bold text-lg mb-2 ${textMain}`}>About Us</h3>
                    <p className={`text-sm ${textMuted}`}>
                        Sakuyomi — your favorite anime merch store with a kawaii soul 💕
                        We bring cuteness to your doorstep!
                    </p>
                </div>

                {/* Contact */}
                <div>
                    <h3 className={`font-bold text-lg mb-2 ${textMain}`}>Contact</h3>
                    <p className={`text-sm flex items-center gap-2 ${textMuted}`}>
                        <FaPhone className={`${iconColor}`} /> +421 987 654 321
                    </p>
                    <p className={`text-sm flex items-center gap-2 ${textMuted}`}>
                        <FaEnvelope className={`${iconColor}`} /> hello@sakuyomi.store
                    </p>
                </div>

                {/* Stores */}
                <div>
                    <h3 className={`font-bold text-lg mb-2 ${textMain}`}>Stores</h3>
                    <p className={`text-sm flex items-center gap-2 ${textMuted}`}>
                        <FaMapMarkerAlt className={`${iconColor}`} /> Bratislava, Obchodná 23
                    </p>
                    <p className={`text-sm flex items-center gap-2 ${textMuted}`}>
                        <FaMapMarkerAlt className={`${iconColor}`} /> Košice, Hlavná 12
                    </p>
                    <p className={`text-sm flex items-center gap-2 ${textMuted}`}>
                        <FaMapMarkerAlt className={`${iconColor}`} /> Lviv, просп. Свободи 5
                    </p>
                </div>

                {/* Socials */}
                <div>
                    <h3 className={`font-bold text-lg mb-2 ${textMain}`}>Follow Us</h3>
                    <div className={`flex gap-4 text-2xl mt-2 ${iconColor}`}>
                        <a
                            href="https://instagram.com/твоя_страница"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#f59c9e] transition-colors duration-200"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://tiktok.com/@твоя_страница"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#f59c9e] transition-colors duration-200"
                        >
                            <SiTiktok />
                        </a>
                        <a
                            href="https://t.me/твоя_страница"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#f59c9e] transition-colors duration-200"
                        >
                            <FaTelegramPlane />
                        </a>
                    </div>
                </div>
            </div>

            <div className={`text-center text-sm py-4 border-t ${borderTop} ${textMuted}`}>
                © 2025 Sakuyomi. Made with ❤️ by Lina.
            </div>
        </footer>
    );
}
