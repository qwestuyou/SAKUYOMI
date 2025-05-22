import React, { useState, useEffect } from "react";

const categories = [
    {
        name: "Figures",
        image: "/images/narutocategory.png",
        link: "/catalog?category=figures",
    },
    {
        name: "Clothing",
        image: "/images/futbolkacategory.png",
        link: "/catalog?category=clothing",
    },
    {
        name: "Accessories",
        image: "/images/acsesyarycategory.png",
        link: "/catalog?category=accessories",
    },
    {
        name: "Manga",
        image: "/images/mangacategory.png",
        link: "/catalog?category=manga",
    },
    {
        name: "Poster",
        image: "/images/postercategory.png",
        link: "/catalog?category=poster",
    },
    {
        name: "Badge",
        image: "/images/badgecategory.png",
        link: "/catalog?category=badge",
    },
    {
        name: "Funko Pop! Anime",
        image: "/images/funkocategory.png",
        link: "/catalog?category=funko pop! anime",
    },
    {
        name: "Stationery",
        image: "/images/stationerycategory.png",
        link: "/catalog?category=stationery"
    }
];

const GlowingImage = ({ src, alt }) => {
    const [glowIntensity, setGlowIntensity] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const glowColor = `rgba(245, 100, 120, ${glowIntensity * 0.9})`;

    useEffect(() => {
        let interval;
        if (isHovered) {
            interval = setInterval(() => {
                setGlowIntensity((prev) => Math.min(prev + 0.1, 1));
            }, 1);
        } else {
            interval = setInterval(() => {
                setGlowIntensity((prev) => Math.max(prev - 0.1, 0)); // Быстрое затухание
            }, 1);
        }
        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <div
            className="relative w-full h-56 sm:h-64 md:h-72 mb-4 flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Анимированное свечение с "накоплением" */}
            <div
                className="absolute inset-0 transition-all duration-1000 ease-out"
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
                    filter: `drop-shadow(0 0 ${glowIntensity * 20}px rgba(245, 100, 120, 0.7))`,
                }}
                loading="lazy"
            />
        </div>
    );
};

export default function CategoriesSection() {
    return (
        <section className="px-4 sm:px-8 md:px-12 lg:px-20 py-8 md:py-12 lg:py-16 bg-white">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#555]">
                Shop Categories
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="bg-[#fedfe1] p-5 rounded-3xl shadow-lg flex flex-col items-center hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2"
                    >
                        <GlowingImage src={category.image} alt={category.name} />

                        <h3 className="text-xl font-bold mb-4 text-center text-[#333]">
                            {category.name}
                        </h3>

                        <a
                            href={category.link}
                            className="bg-[#f59c9e] hover:bg-[#e87c7e] text-white font-medium px-7 py-2.5 rounded-xl transition-all duration-500 ease-out shadow-md hover:shadow-lg"
                        >
                            View all
                        </a>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <a
                    href="/catalog"
                    className="inline-block bg-[#f59c9e] hover:bg-[#e87c7e] text-white font-semibold px-10 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-105"
                >
                    View all products
                </a>
            </div>
        </section>
    );
}