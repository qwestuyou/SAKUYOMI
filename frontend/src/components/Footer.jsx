import React from "react";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#fedfe1]">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-2 text-gray-800 gap-2">About Us</h3>
          <p className="text-sm">
            Sakuyomi — your favorite anime merch store with a kawaii soul 💕
            We bring cuteness to your doorstep!
          </p>
        </div>

        {/* Contact */}
        <div>
        <h3 className="font-bold text-lg mb-2 text-gray-800 gap-2">Contact</h3>
        <p className="text-sm flex items-center gap-2">
            <FaPhone className="text-gray-800 gap-2" /> +421 987 654 321
        </p>
        <p className="text-sm flex items-center gap-2">
            <FaEnvelope className="text-gray-800 gap-2" /> hello@sakuyomi.store
        </p>
        </div>

        {/* Stores */}
        <div>
        <h3 className="font-bold text-lg mb-2 text-gray-800 gap-2">Stores</h3>
        <p className="text-sm flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-800 gap-2" /> Bratislava, Obchodná 23
        </p>
        <p className="text-sm flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-800 gap-2" /> Košice, Hlavná 12
        </p>
        <p className="text-sm flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-800 gap-2" /> Lviv, просп. Свободи 5
        </p>
        </div>

        <div>
            <h3 className="font-bold text-lg mb-2 text-gray-800 gap-2">Follow Us</h3>
            <div className="flex gap-4 text-2xl mt-2">
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
      <div className="text-center text-sm text-gray-800 gap-2 py-4 border-t border-pink-100">
        © 2025 Sakuyomi. Made with ❤️ by Lina.
      </div>
    </footer>
  );
}
