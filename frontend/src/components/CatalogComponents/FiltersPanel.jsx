import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { Range } from "react-range";

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
                          productTypeFilter,
                          setProductTypeFilter,
                          ratingFilter,
                          setRatingFilter,
                          inStockFilter,
                          setInStockFilter,
                          colorFilter,
                          setColorFilter,
                          ageRatingFilter,
                          setAgeRatingFilter,
                          genderFilter,
                          setGenderFilter,
                          coverTypeFilter,
                          setCoverTypeFilter,
                          animeFilter,
                          setAnimeFilter,
                          featuresFilter,
                          setFeaturesFilter,
                          resetFilters,
                          catalogStyles,
                      }) => {
    const handlePriceInput = (index, value) => {
        const newPrice = [...priceRange];
        newPrice[index] = Math.max(0, Math.min(10000, Number(value) || 0));
        if (index === 0 && newPrice[0] > newPrice[1]) newPrice[0] = newPrice[1];
        if (index === 1 && newPrice[1] < newPrice[0]) newPrice[1] = newPrice[0];
        setPriceRange(newPrice);
    };

    return (
        <AnimatePresence>
            {isFiltersOpen && (
                <motion.div
                    className={`mb-6 ${catalogStyles.modalBg} rounded-2xl shadow-xl p-8 z-40 border ${catalogStyles.modalBorder} backdrop-blur-sm bg-opacity-90`}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-xl text-gray-800">Filters</h3>
                        <motion.button
                            onClick={() => setIsFiltersOpen(false)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaTimes className="text-gray-600" />
                        </motion.button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Price */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">Price Range (₴)</label>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => handlePriceInput(0, e.target.value)}
                                        placeholder="Min"
                                        className={`w-full border rounded-lg p-2 ${catalogStyles.inputBg} ${catalogStyles.inputBorder}`}
                                    />
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => handlePriceInput(1, e.target.value)}
                                        placeholder="Max"
                                        className={`w-full border rounded-lg p-2 ${catalogStyles.inputBg} ${catalogStyles.inputBorder}`}
                                    />
                                </div>
                                <Range
                                    step={100}
                                    min={0}
                                    max={10000}
                                    values={priceRange}
                                    onChange={setPriceRange}
                                    renderTrack={({ props, children }) => (
                                        <div
                                            {...props}
                                            className="h-2 w-full bg-gray-200 rounded-lg"
                                            style={{
                                                ...props.style,
                                                background: `linear-gradient(to right, 
                          #e5e7eb 0%, 
                          #e5e7eb ${(priceRange[0] / 10000) * 100}%, 
                          #f59c9e ${(priceRange[0] / 10000) * 100}%, 
                          #f59c9e ${(priceRange[1] / 10000) * 100}%, 
                          #e5e7eb ${(priceRange[1] / 10000) * 100}%, 
                          #e5e7eb 100%)`,
                                            }}
                                        >
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => (
                                        <div
                                            {...props}
                                            className="h-5 w-5 bg-[#f59c9e] rounded-full shadow-md"
                                            style={{ ...props.style, transform: "translateY(-1.5px)" }}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        {/* Anime */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">Anime</label>
                            <input
                                type="text"
                                value={animeFilter}
                                onChange={(e) => setAnimeFilter(e.target.value)}
                                placeholder="e.g., Naruto"
                                className={`w-full border rounded-lg p-3 ${catalogStyles.inputBg} ${catalogStyles.inputBorder}`}
                            />
                        </div>

                        {/* Product Type */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">Product Type</label>
                            <motion.select
                                value={productTypeFilter}
                                onChange={(e) => setProductTypeFilter(e.target.value)}
                                className={`w-full border rounded-lg p-3 ${catalogStyles.inputBg} ${catalogStyles.inputBorder}`}
                            >
                                <option value="">All</option>
                                <option value="figure">Figure</option>
                                <option value="poster">Poster</option>
                                <option value="clothing">Clothing</option>
                                <option value="badge">Badge</option>
                                <option value="manga">Manga</option>
                                <option value="accessories">Accessories</option>
                                <option value="funko">Funko Pop</option>
                                <option value="stationery">Stationery</option>
                            </motion.select>
                        </div>

                        {/* Size (Clothing only) */}
                        {currentCategory === "clothing" && (
                            <div>
                                <label className="block mb-2 font-semibold text-gray-700">Size</label>
                                <div className="flex gap-3">
                                    {["S", "M", "L", "XL"].map((size) => (
                                        <motion.button
                                            key={size}
                                            onClick={() => setSizeFilter(sizeFilter === size ? "" : size)}
                                            className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                                                sizeFilter === size
                                                    ? "bg-[#f59c9e] border-[#f59c9e] text-white"
                                                    : `${catalogStyles.inputBorder} ${catalogStyles.inputBg}`
                                            }`}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {size}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Gender (Clothing only) */}
                        {currentCategory === "clothing" && (
                            <div>
                                <label className="block mb-2 font-semibold text-gray-700">Gender</label>
                                <motion.select
                                    value={genderFilter}
                                    onChange={(e) => setGenderFilter(e.target.value)}
                                    className={`w-full border rounded-lg p-3 ${catalogStyles.inputBg} ${catalogStyles.inputBorder}`}
                                >
                                    <option value="">All</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="unisex">Unisex</option>
                                </motion.select>
                            </div>
                        )}

                        {/* Language & Cover Type (Manga only) */}
                        {currentCategory === "manga" && (
                            <>
                                <div>
                                    <label className="block mb-2 font-semibold text-gray-700">Language</label>
                                    <motion.select
                                        value={languageFilter}
                                        onChange={(e) => setLanguageFilter(e.target.value)}
                                        className={`w-full border rounded-lg p-3 ${catalogStyles.inputBg} ${catalogStyles.inputBorder}`}
                                    >
                                        <option value="">All</option>
                                        <option value="Japanese">Japanese</option>
                                        <option value="English">English</option>
                                        <option value="Ukrainian">Ukrainian</option>
                                    </motion.select>
                                </div>

                                <div>
                                    <label className="block mb-2 font-semibold text-gray-700">Cover Type</label>
                                    <motion.select
                                        value={coverTypeFilter}
                                        onChange={(e) => setCoverTypeFilter(e.target.value)}
                                        className={`w-full border rounded-lg p-3 ${catalogStyles.inputBg} ${catalogStyles.inputBorder}`}
                                    >
                                        <option value="">All</option>
                                        <option value="soft">Soft</option>
                                        <option value="hard">Hard</option>
                                    </motion.select>
                                </div>
                            </>
                        )}

                        {/* In Stock */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">In Stock</label>
                            <div className="flex gap-4">
                                {[["All", null], ["In Stock", true], ["Out of Stock", false]].map(([label, value]) => (
                                    <motion.label key={label} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="stock"
                                            checked={inStockFilter === value}
                                            onChange={() => setInStockFilter(value)}
                                            className="accent-[#f59c9e] w-5 h-5"
                                        />
                                        {label}
                                    </motion.label>
                                ))}
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">Minimum Rating</label>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.button
                                        key={star}
                                        onClick={() => setRatingFilter(ratingFilter === star ? 0 : star)}
                                        className={`text-2xl ${ratingFilter >= star ? "text-yellow-400" : "text-gray-300"}`}
                                        whileHover={{ scale: 1.3 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        ★
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Color */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">Color</label>
                            <div className="flex gap-3 flex-wrap">
                                {["Red", "Blue", "Black", "White", "Green"].map((color) => (
                                    <motion.button
                                        key={color}
                                        onClick={() => setColorFilter(colorFilter === color ? "" : color)}
                                        className={`w-10 h-10 rounded-full border-2 ${
                                            colorFilter === color ? "border-[#f59c9e] scale-110" : "border-gray-300"
                                        }`}
                                        style={{ backgroundColor: color.toLowerCase() }}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Age Rating */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">Age Rating</label>
                            <motion.select
                                value={ageRatingFilter}
                                onChange={(e) => setAgeRatingFilter(e.target.value)}
                                className={`w-full border rounded-lg p-3 ${catalogStyles.inputBg} ${catalogStyles.inputBorder}`}
                            >
                                <option value="">All</option>
                                <option value="0+">0+</option>
                                <option value="13+">13+</option>
                                <option value="18+">18+</option>
                            </motion.select>
                        </div>

                        {/* Features */}
                        <div className="md:col-span-2 lg:col-span-3">
                            <label className="block mb-2 font-semibold text-gray-700">Features</label>
                            <div className="flex flex-wrap gap-3">
                                {["Glowing", "Sound", "Limited Edition", "Collector's", "Exclusive"].map((feature) => (
                                    <motion.label
                                        key={feature}
                                        className={`inline-flex items-center px-4 py-2 rounded-full ${
                                            featuresFilter.includes(feature)
                                                ? "ring-2 ring-[#f59c9e] bg-[#f59c9e] text-white"
                                                : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                        whileHover={{ scale: 1.1 }}
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
                                        {feature}
                                    </motion.label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Reset Button */}
                    <div className="mt-6 flex justify-end">
                        <motion.button
                            onClick={resetFilters}
                            className="px-6 py-2 text-sm rounded-lg border border-[#f59c9e] text-[#f59c9e] hover:bg-[#f59c9e] hover:text-white transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
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
