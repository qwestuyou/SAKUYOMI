import React from "react";
import {motion} from "framer-motion";
import {FaList, FaFilter, FaSearch, FaTimes} from "react-icons/fa";

const CatalogHeader = ({
                           catalogStyles,
                           isCategoriesOpen,
                           setIsCategoriesOpen,
                           isFiltersOpen,
                           setIsFiltersOpen,
                           searchQuery,
                           setSearchQuery,
                       }) => {
    return (
        <motion.div
            className={`${catalogStyles.modalBg} backdrop-blur-lg rounded-2xl shadow-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border ${catalogStyles.modalBorder}`}
            initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.5, ease: "easeOut"}}
        >
            <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Categories Button */}
                <div className="relative">
                    <motion.button
                        onClick={() => {
                            setIsCategoriesOpen(!isCategoriesOpen);
                            if (isFiltersOpen) setIsFiltersOpen(false);
                        }}
                        className={`${catalogStyles.pagination.active} px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 hover:shadow-lg`}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                    >
                        <FaList/> Categories
                    </motion.button>
                </div>

                {/* Filters Button */}
                <div className="relative">
                    <motion.button
                        onClick={() => {
                            setIsFiltersOpen(!isFiltersOpen);
                            if (isCategoriesOpen) setIsCategoriesOpen(false);
                        }}
                        className={`${catalogStyles.pagination.active} px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 hover:shadow-lg`}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                    >
                        <FaFilter/> Filters
                    </motion.button>
                </div>
            </div>

            {/* Search Bar */}
            <motion.div
                className="relative w-full md:w-64"
                initial={{opacity: 0, x: 20}}
                animate={{opacity: 1, x: 0}}
                transition={{delay: 0.2}}
            >
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-full border ${catalogStyles.inputBorder} ${catalogStyles.inputBg} focus:outline-none focus:ring-2 focus:ring-[#f59c9e] transition-all duration-300`}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                {searchQuery && (
                    <motion.button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#f59c9e] transition-colors"
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        exit={{scale: 0}}
                    >
                        <FaTimes/>
                    </motion.button>
                )}
            </motion.div>
        </motion.div>
    );
};

export default CatalogHeader;