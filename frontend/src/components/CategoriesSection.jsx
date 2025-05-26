import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const GlowingImage = ({ src, alt, theme }) => {
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const glowColor =
    theme === "dark"
      ? `rgba(245, 160, 160, ${glowIntensity * 0.6})`
      : `rgba(245, 100, 120, ${glowIntensity * 0.9})`;

  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(() => {
        setGlowIntensity((prev) => Math.min(prev + 0.1, 1));
      }, 10);
    } else {
      interval = setInterval(() => {
        setGlowIntensity((prev) => Math.max(prev - 0.1, 0));
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      className="relative w-full h-56 sm:h-64 md:h-72 mb-4 flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 50%)`,
          filter: `blur(${20 + glowIntensity * 20}px)`,
          zIndex: 0,
          transform: `scale(${1 + glowIntensity * 0.2})`,
          opacity: glowIntensity,
        }}
      />
      <img
        src={src}
        alt={alt}
        className="relative w-full h-full object-contain z-10 transition-all duration-500 ease-out"
        style={{
          transform: `scale(${1 + glowIntensity * 0.05})`,
          filter: `drop-shadow(0 0 ${glowIntensity * 20}px ${glowColor})`,
        }}
        loading="lazy"
      />
    </div>
  );
};

export default function CategoriesSection() {
  const { theme } = useTheme();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Ошибка загрузки категорий:", err));
  }, []);

  const bgSection = theme === "dark" ? "bg-[#1a1a1a]" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-[#555]";
  const cardBg = theme === "dark" ? "bg-[#2b2b2b]" : "bg-[#fedfe1]";
  const headingColor = theme === "dark" ? "text-gray-100" : "text-[#333]";
  const buttonBase =
    theme === "dark"
      ? "bg-[#aa5f5f] hover:bg-[#d87c7e]"
      : "bg-[#f59c9e] hover:bg-[#e87c7e]";

  return (
    <section
      className={`px-4 sm:px-8 md:px-12 lg:px-20 py-8 md:py-12 lg:py-16 transition-colors duration-300 ${bgSection}`}
    >
      <h2
        className={`text-2xl md:text-3xl font-bold text-center mb-10 transition-colors duration-300 ${textColor}`}
      >
        Shop Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`${cardBg} p-5 rounded-3xl shadow-lg flex flex-col items-center hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2`}
          >
            <GlowingImage src={category.image} alt={category.name} theme={theme} />

            <h3
              className={`text-xl font-bold mb-4 text-center transition-colors duration-300 ${headingColor}`}
            >
              {category.name}
            </h3>

            <a
              href={`/catalog?category=${category.slug}`}
              className={`text-white font-medium px-7 py-2.5 rounded-xl transition-all duration-500 ease-out shadow-md hover:shadow-lg ${buttonBase}`}
            >
              View all
            </a>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="/catalog"
          className={`inline-block text-white font-semibold px-10 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-105 ${buttonBase}`}
        >
          View all products
        </a>
      </div>
    </section>
  );
}
