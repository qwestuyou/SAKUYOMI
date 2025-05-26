import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function WelcomeBanner() {
    const { theme } = useTheme();

    const videoSrc =
        theme === "dark"
            ? "/videos/black.mp4"
            : "/videos/light.mp4";

    const textColor = theme === "dark" ? "text-pink-100" : "text-[#ffffff";
    const shadow =
        theme === "dark"
            ? "drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]"
            : "drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]";

    return (
        <section className="relative w-full h-[80vh] overflow-hidden">
            <video
                key={videoSrc}
                className="absolute inset-0 w-full h-full object-cover z-0"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="relative z-10 flex items-center justify-center h-full px-4">
                <div className="px-6 py-4 mt-145 rounded-2xl">
                    <h1
                        className={`text-5xl sm:text-4xl font-semibold text-center transition-colors duration-300 ${textColor} ${shadow}`}
                    >
                        キラキラマーケットへようこそ!
                    </h1>
                </div>
            </div>
        </section>
    );
}
