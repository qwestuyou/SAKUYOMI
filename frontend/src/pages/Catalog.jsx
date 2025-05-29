import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { FaRegHeart, FaHeart, FaShoppingCart, FaSearch, FaFilter, FaList, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Catalog() {
  const { theme, themeStyles } = useTheme();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const currentCategory = category?.toLowerCase() || "all";
  const { addToCart } = useCart();

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sizeFilter, setSizeFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [inStockFilter, setInStockFilter] = useState(null);
  const [colorFilter, setColorFilter] = useState("");
  const [ageRatingFilter, setAgeRatingFilter] = useState("");
  const [featuresFilter, setFeaturesFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 12;

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Загрузка категорий
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    loadCategories();
  }, []);

  // Загрузка продуктов
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);

        // Первоначальная фильтрация
        let filtered = data;
        if (category && category.toLowerCase() !== "all") {
          filtered = data.filter(p => p.category?.slug === category.toLowerCase());
        }
        setFilteredProducts(filtered);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, [category]);

  // Фильтрация продуктов
  useEffect(() => {
    if (products.length === 0) return;

    let filtered = [...products];

    // Фильтр по категории
    if (currentCategory !== "all") {
      filtered = filtered.filter(p => p.category?.slug === currentCategory);
    }

    // Поиск
    if (searchQuery) {
      filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Остальные фильтры
    filtered = filtered.filter(product => {
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      if (currentCategory === "clothing" && sizeFilter && product.size !== sizeFilter) return false;
      if (currentCategory === "manga" && languageFilter && product.language !== languageFilter) return false;
      if (materialFilter && product.material !== materialFilter) return false;
      if (brandFilter && product.brand !== brandFilter) return false;
      if (ratingFilter && (!product.rating || product.rating < ratingFilter)) return false;
      if (inStockFilter !== null && product.inStock !== inStockFilter) return false;
      if (colorFilter && product.color !== colorFilter) return false;
      if (ageRatingFilter && product.ageRating !== ageRatingFilter) return false;
      if (featuresFilter.length > 0 && (!product.features || !featuresFilter.every(f => product.features.includes(f))))
        return false;
      return true;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1); // Сброс на первую страницу при изменении фильтров
  }, [
    products,
    currentCategory,
    searchQuery,
    priceRange,
    sizeFilter,
    languageFilter,
    materialFilter,
    brandFilter,
    ratingFilter,
    inStockFilter,
    colorFilter,
    ageRatingFilter,
    featuresFilter
  ]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
        prev.includes(productId)
            ? prev.filter(id => id !== productId)
            : [...prev, productId]
    );
  };

  const resetFilters = () => {
    setSizeFilter("");
    setLanguageFilter("");
    setPriceRange([0, 10000]);
    setMaterialFilter("");
    setBrandFilter("");
    setRatingFilter(0);
    setInStockFilter(null);
    setColorFilter("");
    setAgeRatingFilter("");
    setFeaturesFilter([]);
    setSearchQuery("");
  };

  const catalogStyles = themeStyles.catalog;

  // Анимации
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
      <div className={`${catalogStyles.pageBg} min-h-screen transition-colors duration-300`}>
        <Header />

        {/* Floating Particles Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(20)].map((_, i) => (
              <motion.div
                  key={i}
                  className="absolute rounded-full bg-[#f59c9e] opacity-10 dark:opacity-5"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    width: Math.random() * 10 + 5,
                    height: Math.random() * 10 + 5
                  }}
                  animate={{
                    y: [null, (Math.random() - 0.5) * 100],
                    x: [null, (Math.random() - 0.5) * 50],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
              />
          ))}
        </div>

        <div className="p-6 max-w-7xl mx-auto relative z-10">
          {/* Header Block */}
          <motion.div
              className={`${catalogStyles.modalBg} backdrop-blur-lg rounded-2xl shadow-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border ${catalogStyles.modalBorder}`}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                  <FaList /> Categories
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                  <FaFilter /> Filters
                </motion.button>
              </div>
            </div>

            {/* Search Bar */}
            <motion.div
                className="relative w-full md:w-64"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
              <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-full border ${catalogStyles.inputBorder} ${catalogStyles.inputBg} focus:outline-none focus:ring-2 focus:ring-[#f59c9e] transition-all duration-300`}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchQuery && (
                  <motion.button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#f59c9e] transition-colors"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                  >
                    <FaTimes />
                  </motion.button>
              )}
            </motion.div>
          </motion.div>

          {/* Categories Dropdown */}
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
                    {categories.map(cat => (
                        <motion.li
                            key={cat.id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
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

          {/* Filters Panel */}
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
                            onChange={e => setPriceRange([0, +e.target.value])}
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
                            {["S", "M", "L"].map(size => (
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
                              onChange={e => setLanguageFilter(e.target.value)}
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
                          onChange={e => setMaterialFilter(e.target.value)}
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
                          onChange={e => setBrandFilter(e.target.value)}
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
                        {[1, 2, 3, 4, 5].map(star => (
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
                        {["Red", "Blue", "Black", "White", "Green"].map(color => (
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
                          onChange={e => setAgeRatingFilter(e.target.value)}
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
                        {["Glowing", "Sound", "Limited Edition", "Collector's", "Exclusive"].map(feature => (
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
                                    setFeaturesFilter(prev =>
                                        prev.includes(feature)
                                            ? prev.filter(f => f !== feature)
                                            : [...prev, feature]
                                    );
                                  }}
                                  className="mr-2 opacity-0 absolute"
                              />
                              <span className={`w-4 h-4 rounded border mr-2 flex items-center justify-center ${
                                  featuresFilter.includes(feature) ? "bg-[#f59c9e] border-[#f59c9e]" : "border-gray-400"
                              }`}>
                          {featuresFilter.includes(feature) && (
                              <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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

          {/* Products Grid */}
          {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="w-12 h-12 border-4 border-[#f59c9e] border-t-transparent rounded-full"
                />
              </div>
          ) : (
              <motion.main
                  className="space-y-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
              >
                {currentProducts.length > 0 ? (
                    <>
                      <motion.div
                          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                          layout
                      >
                        {currentProducts.map(product => (
                            <motion.div
                                key={product.id}
                                variants={itemVariants}
                                layout
                            >
                              <Link
                                  to={`/product/${product.id}`}
                                  className={`${catalogStyles.cardBg} relative rounded-3xl backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/10 shadow-xl hover:shadow-2xl overflow-hidden p-10 flex flex-col h-full`}
                              >
                                <motion.div
                                    className="relative mb-4 flex justify-center"
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.3 }}
                                >
                                  <img
                                      src={product.image}
                                      alt={product.name}
                                      className="rounded-xl w-[250px] h-[300px] object-cover"
                                      loading="lazy"
                                  />
                                  <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        toggleWishlist(product.id);
                                      }}
                                      className={`absolute top-3 right-3 text-2xl ${catalogStyles.wishlistBtnBg} ${catalogStyles.wishlistBtnBorder} p-2 rounded-full shadow-md transition-all duration-300 border`}
                                      aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                                      title={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                                  >
                                    <motion.div
                                        animate={wishlist.includes(product.id) ? { scale: [1, 1.2, 1] } : {}}
                                        transition={{ duration: 0.3 }}
                                    >
                                      {wishlist.includes(product.id) ? (
                                          <FaHeart className="text-red-500" />
                                      ) : (
                                          <FaRegHeart className={`${catalogStyles.wishlistEmptyHeartColor} hover:text-red-400 transition-colors`} />
                                      )}
                                    </motion.div>
                                  </button>
                                </motion.div>
                                <div className="flex-1 flex flex-col justify-between">
                                  <div className="mb-4">
                                    <h3 className="text-lg font-semibold mb-1 truncate">{product.name}</h3>
                                    <p className="text-sm opacity-70 line-clamp-2">{product.description}</p>
                                  </div>
                                  <div className="flex items-center justify-between mt-auto">
                                    <p className={`font-bold ${catalogStyles.headingColor} text-xl leading-none`}>
                                      {product.price} ₴
                                    </p>
                                    <motion.button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          addToCart(product);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm shadow-md border border-white/30 backdrop-blur-md transition-all duration-300"
                                        aria-label="Add to cart"
                                        title="Add to cart"
                                        whileHover={{
                                          scale: 1.05,
                                          boxShadow: "0 5px 15px rgba(245, 156, 158, 0.4)"
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                      <motion.span
                                          animate={{ x: [0, 2, 0] }}
                                          transition={{ repeat: Infinity, duration: 2 }}
                                      >
                                        <FaShoppingCart className="text-base" />
                                      </motion.span>
                                      <span>Add to cart</span>
                                    </motion.button>
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                        ))}
                      </motion.div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                          <motion.div
                              className="flex justify-center items-center gap-2 mt-6"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                          >
                            <motion.button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 disabled:opacity-50"
                                aria-label="Previous page"
                                whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                                whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                            >
                              Previous
                            </motion.button>
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                                <motion.button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                                        currentPage === page ? catalogStyles.pagination.active : catalogStyles.pagination.hover
                                    }`}
                                    aria-label={`Page ${page}`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                  {page}
                                </motion.button>
                            ))}
                            <motion.button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 disabled:opacity-50"
                                aria-label="Next page"
                                whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                                whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                            >
                              Next
                            </motion.button>
                          </motion.div>
                      )}
                    </>
                ) : (
                    <motion.div
                        className={`${catalogStyles.modalBg} rounded-2xl p-8 text-center`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-xl font-bold mb-2">No products found</h3>
                      <p className="opacity-70 mb-4">Try adjusting your filters or search query</p>
                      <motion.button
                          onClick={resetFilters}
                          className="px-6 py-2 rounded-full bg-[#f59c9e] text-white font-semibold"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                      >
                        Reset Filters
                      </motion.button>
                    </motion.div>
                )}
              </motion.main>
          )}
        </div>
        <Footer />
      </div>
  );
}