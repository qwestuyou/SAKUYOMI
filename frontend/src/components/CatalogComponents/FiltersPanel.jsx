import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const FiltersPanel = ({
                          isFiltersOpen,
                          setIsFiltersOpen,
                          currentCategory,
                          priceRange,
                          setPriceRange,
                          sizeFilter,
                          setSizeFilter,
                          languageFilter,
                          setLanguageFilter,
                          materialFilter,
                          setMaterialFilter,
                          brandFilter,
                          setBrandFilter,
                          ratingFilter,
                          setRatingFilter,
                          inStockFilter,
                          setInStockFilter,
                          colorFilter,
                          setColorFilter,
                          ageRatingFilter,
                          setAgeRatingFilter,
                          featuresFilter,
                          setFeaturesFilter,
                          resetFilters,
                          catalogStyles,
                      }) => {
    return (
        <AnimatePresence>
            {isFiltersOpen && (
                <motion.div
                    className={`mb-6 ${catalogStyles.modalBg} rounded-xl shadow-2xl p-6 z-40 border ${catalogStyles.modalBorder}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg">Filters</h3>
                        <button
                            onClick={() => setIsFiltersOpen(false)}
                            className="p-1 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <label className="block mb-1 font-semibold">Price Range (₴)</label>
                            <div className="space-y-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="10000"
                                    step="100"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, +e.target.value])}
                                    className="w-full accent-[#f59c9e]"
                                />
                                <div className="flex justify-between text-sm opacity-70">
                                    <span>0 ₴</span>
                                    <span>{priceRange[1]} ₴</span>
                                </div>
                            </div>
                        </div>

                        {currentCategory === "clothing" && (
                            <div>
                                <label className="block mb-1 font-semibold">Size</label>
                                <div className="flex gap-2">
                                    {["S", "M", "L"].map((size) => (
                                        <motion.button
                                            key={size}
                                            onClick={() => setSizeFilter(sizeFilter === size ? "" : size)}
                                            className={`px-4 py-2 rounded-lg border transition-colors ${
                                                sizeFilter === size
                                                    ? "bg-[#f59c9e] border-[#f59c9e] text-white"
                                                    : `${catalogStyles.inputBorder} ${catalogStyles.inputBg}`
                                            }`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {size}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentCategory === "manga" && (
                            <div>
                                <label className="block mb-1 font-semibold">Language</label>
                                <select
                                    value={languageFilter}
                                    onChange={(e) => setLanguageFilter(e.target.value)}
                                    className={`w-full border rounded-lg p-2 ${catalogStyles.inputBg} ${catalogStyles.inputBorder} transition-colors duration-300 hover:border-[#f59c9e]`}
                                >
                                    <option value="">All</option>
                                    <option value="Japanese">Japanese</option>
                                    <option value="English">English</option>
                                    <option value="Ukrainian">Ukrainian</option>
                                </select>
                            </div>
                        )}

                        <div>
                            <label className="block mb-1 font-semibold">Material</label>
                            <select
                                value={materialFilter}
                                onChange={(e) => setMaterialFilter(e.target.value)}
                                className={`w-full border rounded-lg p-2 ${catalogStyles.inputBg} ${catalogStyles.inputBorder} transition-colors duration-300 hover:border-[#f59c9e]`}
                            >
                                <option value="">All</option>
                                <option value="Cotton">Cotton</option>
                                <option value="Polyester">Polyester</option>
                                <option value="Vinyl">Vinyl</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Brand</label>
                            <select
                                value={brandFilter}
                                onChange={(e) => setBrandFilter(e.target.value)}
                                className={`w-full border rounded-lg p-2 ${catalogStyles.inputBg} ${catalogStyles.inputBorder} transition-colors duration-300 hover:border-[#f59c9e]`}
                            >
                                <option value="">All</option>
                                <option value="Bandai">Bandai</option>
                                <option value="Good Smile">Good Smile</option>
                                <option value="Funko">Funko</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Minimum Rating</label>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.button
                                        key={star}
                                        onClick={() => setRatingFilter(ratingFilter === star ? 0 : star)}
                                        className={`text-2xl ${ratingFilter >= star ? "text-yellow-400" : "text-gray-300"}`}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        ★
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">In Stock</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="stock"
                                        checked={inStockFilter === null}
                                        onChange={() => setInStockFilter(null)}
                                        className="accent-[#f59c9e]"
                                    />
                                    All
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="stock"
                                        checked={inStockFilter === true}
                                        onChange={() => setInStockFilter(true)}
                                        className="accent-[#f59c9e]"
                                    />
                                    In Stock
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="stock"
                                        checked={inStockFilter === false}
                                        onChange={() => setInStockFilter(false)}
                                        className="accent-[#f59c9e]"
                                    />
                                    Out of Stock
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Color</label>
                            <div className="flex gap-2 flex-wrap">
                                {["Red", "Blue", "Black", "White", "Green"].map((color) => (
                                    <motion.button
                                        key={color}
                                        onClick={() => setColorFilter(colorFilter === color ? "" : color)}
                                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                                            colorFilter === color ? "border-[#f59c9e] scale-110" : "border-transparent"
                                        }`}
                                        style={{ backgroundColor: color.toLowerCase() }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 font-semibold">Age Rating</label>
                            <select
                                value={ageRatingFilter}
                                onChange={(e) => setAgeRatingFilter(e.target.value)}
                                className={`w-full border rounded-lg p-2 ${catalogStyles.inputBg} ${catalogStyles.inputBorder} transition-colors duration-300 hover:border-[#f59c9e]`}
                            >
                                <option value="">All</option>
                                <option value="13+">13+</option>
                                <option value="18+">18+</option>
                            </select>
                        </div>

                        <div className="md:col-span-2 lg:col-span-3">
                            <label className="block mb-1 font-semibold">Features</label>
                            <div className="flex flex-wrap gap-2">
                                {["Glowing", "Sound", "Limited Edition", "Collector's", "Exclusive"].map((feature) => (
                                    <motion.label
                                        key={feature}
                                        className={`inline-flex items-center px-3 py-1 rounded-full ${catalogStyles.featureTagBg} text-sm cursor-pointer transition-all ${
                                            featuresFilter.includes(feature) ? "ring-2 ring-[#f59c9e]" : ""
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={featuresFilter.includes(feature)}
                                            onChange={() => {
                                                setFeaturesFilter((prev) =>
                                                    prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
                                                );
                                            }}
                                            className="mr-2 opacity-0 absolute"
                                        />
                                        <span
                                            className={`w-4 h-4 rounded border mr-2 flex items-center justify-center ${
                                                featuresFilter.includes(feature) ? "bg-[#f59c9e] border-[#f59c9e]" : "border-gray-400"
                                            }`}
                                        >
                      {featuresFilter.includes(feature) && (
                          <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                              />
                          </svg>
                      )}
                    </span>
                                        {feature}
                                    </motion.label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <motion.button
                            onClick={resetFilters}
                            className="px-4 py-2 text-sm rounded-lg border border-[#f59c9e] text-[#f59c9e] hover:bg-[#f59c9e] hover:text-white transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Reset All Filters
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FiltersPanel;