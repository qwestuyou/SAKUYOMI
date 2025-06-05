import React from "react";
import { motion } from "framer-motion";

const Pagination = ({ currentPage, totalPages, handlePageChange, catalogStyles }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        totalPages > 1 && (
            <motion.div
                className="flex justify-center items-center gap-2 mt-6 px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <motion.button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 sm:px-4 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 disabled:opacity-50"
                    aria-label="Previous page"
                    whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                >
                    Prev
                </motion.button>

                <div className="flex gap-2 overflow-x-auto max-w-full scrollbar-hide">
                    {pageNumbers.map((page) => (
                        <motion.button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ${
                                currentPage === page
                                    ? catalogStyles.pagination.active
                                    : catalogStyles.pagination.hover
                            }`}
                            aria-label={`Page ${page}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {page}
                        </motion.button>
                    ))}
                </div>

                <motion.button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 sm:px-4 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 disabled:opacity-50"
                    aria-label="Next page"
                    whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                >
                    Next
                </motion.button>
            </motion.div>
        )
    );
};

export default Pagination;
