import React from "react";
import {motion, AnimatePresence} from "framer-motion";
import {FaTimes} from "react-icons/fa";
import {Range} from "react-range";

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
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -50}}
                    transition={{duration: 0.4, ease: "easeOut"}}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-xl text-gray-800">Filters</h3>
                        <motion.button
                            onClick={() => setIsFiltersOpen(false)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.9}}
                        >
                            <FaTimes className="text-gray-600"/>
                        </motion.button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">Price Range (₴)</label>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => handlePriceInput(0, e.target.value)}
                                        placeholder="Min"
                                        className={`w-full border rounded-lg p-2 ${catalogStyles.inputBg} ${catalogStyles.inputBorder} focus:ring-2 focus:ring-[#f59c9e] focus:border-transparent transition-all duration-300`}
                                    />
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => handlePriceInput(1, e.target.value)}
                                        placeholder="Max"
                                        className={`w-full border rounded-lg p-2 ${catalogStyles.inputBg} ${catalogStyles.inputBorder} focus:ring-2 focus:ring-[#f59c9e] focus:border-transparent transition-all duration-300`}
                                    />
                                </div>
                                <Range
                                    step={100}
                                    min={0}
                                    max={10000}
                                    values={priceRange}
                                    onChange={(values) => setPriceRange(values)}
                                    renderTrack={({props, children}) => (
                                        <div
                                            {...props}
                                            className="h-2 w-full bg-gray-200 rounded-lg"
                                            style={{
                                                ...props.style,
                                                background: `linear-gradient(to right, 
                                                    #e5e7eb 0%, 
                                                    #e5e7eb ${((priceRange[0] - 0) / 10000) * 100}%, 
                                                    #f59c9e ${((priceRange[0] - 0) / 10000) * 100}%, 
                                                    #f59c9e ${((priceRange[1] - 0) / 10000) * 100}%, 
                                                    #e5e7eb ${((priceRange[1] - 0) / 10000) * 100}%, 
                                                    #e5e7eb 100%)`,
                                            }}
                                        >
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({props, index}) => (
                                        <div
                                            {...props}
                                            className="h-5 w-5 bg-[#f59c9e] rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#f59c9e] focus:ring-offset-2"
                                            style={{
                                                ...props.style,
                                                transform: "translateY(-1.5px)",
                                            }}
                                        />
                                    )}
                                />
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{priceRange[0]} ₴</span>
                                    <span>{priceRange[1]} ₴</span>
                                </div>
                            </div>
                        </div>

                        {currentCategory === "clothing" && (
                            <div>
                                <label className="block mb-2 font-semibold text-gray-700">Size</label>
                                <div className="flex gap-3">
                                    {["S", "M", "L"].map((size) => (
                                        <motion.button
                                            key={size}
                                            onClick={() => setSizeFilter(sizeFilter === size ? "" : size)}
                                            className={`px-5 py-2 rounded-lg border transition-all duration-300 ${
                                                sizeFilter === size
                                                    ? "bg-[#f59c9e] border-[#f59c9e] text-white"
                                                    : `${catalogStyles.inputBorder} ${catalogStyles.inputBg} hover:bg-gray-100`
                                            }`}
                                            whileHover={{scale: 1.1, boxShadow: "0 4px 12px rgba(0,0,0,0.1)"}}
                                            whileTap={{scale: 0.95}}
                                        >
                                            {size}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentCategory === "manga" && (
                            <div>
                                <label className="block mb-2 font-semibold text-gray-700">Language</label>
                                <motion.select
                                    value={languageFilter}
                                    onChange={(e) => setLanguageFilter(e.target.value)}
                                    className={`w-full border rounded-lg p-3 ${catalogStyles.inputBg} ${catalogStyles.inputBorder} focus:ring-2 focus:ring-[#f59c9e] focus:border-transparent transition-all duration-300`}
                                    whileHover={{scale: 1.02}}
                                >
                                    <option value="">All</option>
                                    <option value="Japanese">Japanese</option>
                                    <option value="English">English</option>
                                    <option value="Ukrainian">Ukrainian</option>
                                </motion.select>
                            </div>
                        )}

                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">Material</label>
                            <motion.select
                                value={materialFilter}
                                onChange={(e) => setMaterialFilter(e.target.value)}
                                className={`w-full border rounded-lg p-3 ${catalogStyles.inputBg} ${catalogStyles.inputBorder} focus:ring-2 focus:ring-[#f59c9e] focus:border-transparent transition-all duration-300`}
                                whileHover={{scale: 1.02}}
                            >
                                <option value="">All</option>
                                <option value="Cotton">Cotton</option>
                                <option value="Polyester">Polyester</option>
                                <option value="Vinyl">Vinyl</option>
                            </motion.select>
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">Brand</label>
                            <motion.select
                                value={brandFilter}
                                onChange={(e) => setBrandFilter(e.target.value)}
                                className={`w-full border rounded-lg p-3 ${catalogStyles.inputBg} ${catalogStyles.inputBorder} focus:ring-2 focus:ring-[#f59c9e] focus:border-transparent transition-all duration-300`}
                                whileHover={{scale: 1.02}}
                            >
                                <option value="">All</option>
                                <option value="Bandai">Bandai</option>
                                <option value="Good Smile">Good Smile</option>
                                <option value="Funko">Funko</option>
                            </motion.select>
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">Minimum Rating</label>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.button
                                        key={star}
                                        onClick={() => setRatingFilter(ratingFilter === star ? 0 : star)}
                                        className={`text-2xl ${ratingFilter >= star ? "text-yellow-400" : "text-gray-300"} transition-colors duration-200`}
                                        whileHover={{scale: 1.3, rotate: 10}}
                                        whileTap={{scale: 0.9}}
                                    >
                                        ★
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">In Stock</label>
                            <div className="flex gap-4">
                                <motion.label
                                    className="flex items-center gap-2 cursor-pointer"
                                    whileHover={{scale: 1.05}}
                                >
                                    <input
                                        type="radio"
                                        name="stock"
                                        checked={inStockFilter === null}
                                        onChange={() => setInStockFilter(null)}
                                        className="accent-[#f59c9e] w-5 h-5"
                                    />
                                    All
                                </motion.label>
                                <motion.label
                                    className="flex items-center gap-2 cursor-pointer"
                                    whileHover={{scale: 1.05}}
                                >
                                    <input
                                        type="radio"
                                        name="stock"
                                        checked={inStockFilter === true}
                                        onChange={() => setInStockFilter(true)}
                                        className="accent-[#f59c9e] w-5 h-5"
                                    />
                                    In Stock
                                </motion.label>
                                <motion.label
                                    className="flex items-center gap-2 cursor-pointer"
                                    whileHover={{scale: 1.05}}
                                >
                                    <input
                                        type="radio"
                                        name="stock"
                                        checked={inStockFilter === false}
                                        onChange={() => setInStockFilter(false)}
                                        className="accent-[#f59c9e] w-5 h-5"
                                    />
                                    Out of Stock
                                </motion.label>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">Color</label>
                            <div className="flex gap-3 flex-wrap">
                                {["Red", "Blue", "Black", "White", "Green"].map((color) => (
                                    <motion.button
                                        key={color}
                                        onClick={() => setColorFilter(colorFilter === color ? "" : color)}
                                        className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                                            colorFilter === color ? "border-[#f59c9e] scale-110" : "border-gray-200 hover:border-gray-400"
                                        }`}
                                        style={{backgroundColor: color.toLowerCase()}}
                                        whileHover={{scale: 1.2, boxShadow: "0 4px 12px rgba(0,0,0,0.2)"}}
                                        whileTap={{scale: 0.9}}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">Age Rating</label>
                            <motion.select
                                value={ageRatingFilter}
                                onChange={(e) => setAgeRatingFilter(e.target.value)}
                                className={`w-full border rounded-lg p-3 ${catalogStyles.inputBg} ${catalogStyles.inputBorder} focus:ring-2 focus:ring-[#f59c9e] focus:border-transparent transition-all duration-300`}
                                whileHover={{scale: 1.02}}
                            >
                                <option value="">All</option>
                                <option value="13+">13+</option>
                                <option value="18+">18+</option>
                            </motion.select>
                        </div>

                        <div className="md:col-span-2 lg:col-span-3">
                            <label className="block mb-2 font-semibold text-gray-700">Features</label>
                            <div className="flex flex-wrap gap-3">
                                {["Glowing", "Sound", "Limited Edition", "Collector's", "Exclusive"].map((feature) => (
                                    <motion.label
                                        key={feature}
                                        className={`inline-flex items-center px-4 py-2 rounded-full ${catalogStyles.featureTagBg} text-sm cursor-pointer transition-all duration-300 ${
                                            featuresFilter.includes(feature) ? "ring-2 ring-[#f59c9e] bg-[#f59c9e] text-white" : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                        whileHover={{scale: 1.1, boxShadow: "0 4px 12px rgba(0,0,0,0.1)"}}
                                        whileTap={{scale: 0.95}}
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
                                            className={`w-5 h-5 rounded border mr-2 flex items-center justify-center ${
                                                featuresFilter.includes(feature) ? "bg-white border-white" : "border-gray-400"
                                            }`}
                                        >
                                        {featuresFilter.includes(feature) && (
                                            <svg className="w-4 h-4 text-[#f59c9e]" viewBox="0 0 20 20" fill="currentColor">
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
                    <div className="mt-6 flex justify-end">
                        <motion.button
                            onClick={resetFilters}
                            className="px-6 py-2 text-sm rounded-lg border border-[#f59c9e] text-[#f59c9e] hover:bg-[#f59c9e] hover:text-white transition-all duration-300"
                            whileHover={{scale: 1.1, boxShadow: "0 4px 12px rgba(0,0,0,0.2)"}}
                            whileTap={{scale: 0.95}}
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