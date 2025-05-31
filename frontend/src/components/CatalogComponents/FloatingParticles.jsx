import React from "react";
import { motion } from "framer-motion";

const FloatingParticles = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-[#f59c9e] opacity-10 dark:opacity-5"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        width: Math.random() * 10 + 5,
                        height: Math.random() * 10 + 5,
                    }}
                    animate={{
                        y: [null, (Math.random() - 0.5) * 100],
                        x: [null, (Math.random() - 0.5) * 50],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingParticles;