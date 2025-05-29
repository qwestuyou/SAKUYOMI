import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const GlowingImage = ({ src, alt, theme }) => {
  const [glow, setGlow] = useState(false);

  const glowColor =
      theme === "dark"
          ? "rgba(245, 160, 160, 0.4)"
          : "rgba(245, 100, 120, 0.6)";

  return (
      <div
          className="relative w-full h-56 sm:h-64 md:h-72 mb-4 flex items-center justify-center"
          onMouseEnter={() => setGlow(true)}
          onMouseLeave={() => setGlow(false)}
      >
        <div
            className="absolute inset-0 rounded-2xl transition-all duration-700"
            style={{
              background: `radial-gradient(circle, ${glowColor} 0%, transparent 60%)`,
              filter: "blur(30px)",
              opacity: glow ? 1 : 0,
              transform: glow ? "scale(1.1)" : "scale(1)",
              zIndex: 0,
            }}
        />
        <img
            src={src}
            alt={alt}
            className="relative z-10 w-full h-full object-contain transition-transform duration-500"
            style={{
              transform: glow ? "scale(1.05)" : "scale(1)",
              filter: glow
                  ? `drop-shadow(0 0 15px ${glowColor})`
                  : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
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
          className={`px-4 sm:px-8 md:px-12 lg:px-20 py-12 md:py-16 lg:py-20 transition-colors duration-300 ${bgSection}`}
      >
        <h2
            className={`text-3xl md:text-4xl font-extrabold text-center mb-12 transition-colors duration-300 ${textColor}`}
        >
          Shop Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category) => (
              <div
                  key={category.id}
                  className={`${cardBg} p-6 rounded-3xl shadow-lg flex flex-col items-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2`}
              >
                <GlowingImage
                    src={category.image}
                    alt={category.name}
                    theme={theme}
                />
                <h3
                    className={`text-xl font-semibold mb-4 text-center transition-colors duration-300 ${headingColor}`}
                >
                  {category.name}
                </h3>
                <a
                    href={`/catalog?category=${category.slug}`}
                    className={`text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-500 shadow-md hover:shadow-lg ${buttonBase}`}
                >
                  View all
                </a>
              </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
              href="/catalog"
              className={`inline-block text-white font-semibold px-10 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 ${buttonBase}`}
          >
            View all products
          </a>
        </div>
      </section>
  );
}
