import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const GlowingImage = ({ src, alt, glowColor }) => {
    const [glow, setGlow] = useState(false);

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
    const { theme, themeStyles } = useTheme();
    const [categories, setCategories] = useState([]);
    const categoriesStyles = themeStyles.categories;

    useEffect(() => {
        fetch("/api/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error("Ошибка загрузки категорий:", err));
    }, []);

    return (
        <section
            className={`relative px-4 sm:px-8 md:px-12 lg:px-20 py-12 md:py-16 lg:py-20 transition-colors duration-300 overflow-hidden ${categoriesStyles.bgSection}`}
        >
            {/* Фоновая анимация частиц */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-pink-300 blur-sm opacity-50"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `-${Math.random() * 20 + 10}%`,
                        }}
                        animate={{
                            y: "110vh",
                            x: ["0vw", "10vw", "-10vw", "0vw"],
                            opacity: [0.5, 0.7, 0],
                        }}
                        transition={{
                            duration: 12 + Math.random() * 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>

            <h2
                className={`relative z-10 text-3xl md:text-4xl font-extrabold text-center mb-12 transition-colors duration-300 ${categoriesStyles.textColor}`}
            >
                Shop Categories
            </h2>

            <motion.div
                className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.15,
                        },
                    },
                }}
            >
                {categories.map((category) => (
                    <motion.div
                        key={category.id}
                        variants={{
                            hidden: { opacity: 0, y: 40, scale: 0.95 },
                            visible: { opacity: 1, y: 0, scale: 1 },
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={`${categoriesStyles.cardBg} p-6 rounded-3xl shadow-lg flex flex-col items-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2`}
                    >
                        <GlowingImage
                            src={category.image}
                            alt={category.name}
                            glowColor={categoriesStyles.glowColor}
                        />
                        <h3
                            className={`text-xl font-semibold mb-4 text-center transition-colors duration-300 ${categoriesStyles.headingColor}`}
                        >
                            {category.name}
                        </h3>
                        <a
                            href={`/catalog?category=${category.slug}`}
                            className={`text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-500 shadow-md hover:shadow-lg ${categoriesStyles.buttonBase}`}
                        >
                            View all
                        </a>
                    </motion.div>
                ))}
            </motion.div>

            <div className="relative z-10 text-center mt-14">
                <a
                    href="/catalog"
                    className={`inline-block text-white font-semibold px-10 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 ${categoriesStyles.buttonBase}`}
                >
                    View all products
                </a>
            </div>
        </section>
    );
}
