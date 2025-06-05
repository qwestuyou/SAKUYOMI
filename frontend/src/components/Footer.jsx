import React from "react";
import {FaInstagram, FaTelegramPlane} from "react-icons/fa";
import {FaPhone, FaEnvelope, FaMapMarkerAlt} from "react-icons/fa";
import {SiTiktok} from "react-icons/si";
import {useTheme} from "../context/ThemeContext";

export default function Footer() {
    const {theme, themeStyles} = useTheme();
    const footerStyles = themeStyles.footer;

    return (
        <footer className={`${footerStyles.bg} transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h3 className={`font-bold text-lg mb-2 ${footerStyles.textMain}`}>
                        About Us
                    </h3>
                    <p className={`text-sm ${footerStyles.textMuted}`}>
                        Sakuyomi — your favorite anime merch store with a kawaii soul 💕
                        We bring cuteness to your doorstep!
                    </p>
                </div>

                <div>
                    <h3 className={`font-bold text-lg mb-2 ${footerStyles.textMain}`}>
                        Contact
                    </h3>
                    <p className={`text-sm flex items-center gap-2 ${footerStyles.textMuted}`}>
                        <FaPhone className={footerStyles.icon}/> +421 987 654 321
                    </p>
                    <p className={`text-sm flex items-center gap-2 ${footerStyles.textMuted}`}>
                        <FaEnvelope className={footerStyles.icon}/> hello@sakuyomi.store
                    </p>
                </div>

                <div>
                    <h3 className={`font-bold text-lg mb-2 ${footerStyles.textMain}`}>
                        Stores
                    </h3>
                    <p className={`text-sm flex items-center gap-2 ${footerStyles.textMuted}`}>
                        <FaMapMarkerAlt className={footerStyles.icon}/> Bratislava, Obchodná 23
                    </p>
                    <p className={`text-sm flex items-center gap-2 ${footerStyles.textMuted}`}>
                        <FaMapMarkerAlt className={footerStyles.icon}/> Košice, Hlavná 12
                    </p>
                    <p className={`text-sm flex items-center gap-2 ${footerStyles.textMuted}`}>
                        <FaMapMarkerAlt className={footerStyles.icon}/> Lviv, просп. Свободи 5
                    </p>
                </div>

                <div>
                    <h3 className={`font-bold text-lg mb-2 ${footerStyles.textMain}`}>
                        Follow Us
                    </h3>
                    <div className={`flex gap-4 text-2xl ${footerStyles.icon}`}>
                        <a
                            href="https://instagram.com/page"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${footerStyles.hover} transition-colors duration-200`}
                        >
                            <FaInstagram/>
                        </a>
                        <a
                            href="https://tiktok.com/@page"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${footerStyles.hover} transition-colors duration-200`}
                        >
                            <SiTiktok/>
                        </a>
                        <a
                            href="https://t.me/@username"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${footerStyles.hover} transition-colors duration-200`}
                        >
                            <FaTelegramPlane/>
                        </a>
                    </div>
                </div>
            </div>

            <div className={`text-center text-sm py-4 border-t ${footerStyles.border} ${footerStyles.textMuted}`}>
                © 2025 Sakuyomi. Made with ❤️ by Lina.
            </div>
        </footer>
    );
}