import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const CategoriesPanel = ({ isCategoriesOpen, setIsCategoriesOpen, categories, currentCategory, catalogStyles }) => {
    return (
        <AnimatePresence>
            {isCategoriesOpen && (
                <motion.div
                    className={`mb-6 ${catalogStyles.modalBg} rounded-xl shadow-2xl p-4 z-40 border ${catalogStyles.modalBorder}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className="font-bold text-lg mb-3 flex items-center justify-between">
                        <span>Categories</span>
                        <button
                            onClick={() => setIsCategoriesOpen(false)}
                            className="p-1 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <FaTimes />
                        </button>
                    </h3>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                        <li>
                            <Link
                                to="/catalog"
                                className={`block p-3 rounded-lg text-center transition-all ${
                                    currentCategory === "all"
                                        ? `${catalogStyles.pagination.active} font-bold scale-105`
                                        : `${catalogStyles.pagination.hover} hover:scale-[1.02]`
                                }`}
                                onClick={() => setIsCategoriesOpen(false)}
                            >
                                All
                            </Link>
                        </li>
                        {categories.map((cat) => (
                            <motion.li key={cat.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Link
                                    to={`/catalog?category=${cat.slug}`}
                                    className={`block p-3 rounded-lg text-center transition-all ${
                                        currentCategory === cat.slug
                                            ? `${catalogStyles.pagination.active} font-bold scale-105`
                                            : `${catalogStyles.pagination.hover} hover:scale-[1.02]`
                                    }`}
                                    onClick={() => setIsCategoriesOpen(false)}
                                >
                                    {cat.name}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CategoriesPanel;