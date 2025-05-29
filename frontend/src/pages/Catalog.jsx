import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { FaRegHeart, FaHeart, FaShoppingCart, FaSearch, FaFilter, FaList } from "react-icons/fa";
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
  const productsPerPage = 12;

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
        .then(res => res.json())
        .then(data => {
          if (category && category.toLowerCase() !== "all") {
            setProducts(data.filter(p => p.category?.slug === category.toLowerCase()));
          } else {
            setProducts(data);
          }
        })
        .catch(console.error);
  }, [category]);

  useEffect(() => {
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
    setCurrentPage(1);
  }, [currentCategory]);

  const filteredProducts = products.filter(product => {
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

  const catalogStyles = themeStyles.catalog;

  return (
      <div className={`${catalogStyles.pageBg} min-h-screen transition-colors duration-300`}>
        <Header />
        <div className="p-6 max-w-7xl mx-auto relative">
          {/* Header Block */}
          <motion.div
              className={`${catalogStyles.modalBg} backdrop-blur-lg rounded-2xl shadow-2xl p-4 mb-8 flex items-center justify-between sticky top-0 z-50 border ${catalogStyles.modalBorder}`}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4">
              {/* Categories Button and Modal */}
              <div className="relative">
                <motion.button
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    className={`${catalogStyles.pagination.active} px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 hover:shadow-lg`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                  <FaList /> Categories
                </motion.button>
                <AnimatePresence>
                  {isCategoriesOpen && (
                      <motion.div
                          className={`fixed top-20 left-4 md:left-auto md:top-[120px] w-48 ${catalogStyles.modalBg} rounded-xl shadow-2xl p-4 z-50 border ${catalogStyles.modalBorder}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                      >
                        <ul className="space-y-2">
                          <li>
                            <Link
                                to="/catalog"
                                className={`block p-2 rounded-lg ${currentCategory === "all" ? catalogStyles.pagination.active : catalogStyles.pagination.hover}`}
                                onClick={() => setIsCategoriesOpen(false)}
                            >
                              All
                            </Link>
                          </li>
                          {categories.map(cat => (
                              <li key={cat.id}>
                                <Link
                                    to={`/catalog?category=${cat.slug}`}
                                    className={`block p-2 rounded-lg ${currentCategory === cat.slug ? catalogStyles.pagination.active : catalogStyles.pagination.hover}`}
                                    onClick={() => setIsCategoriesOpen(false)}
                                >
                                  {cat.name}
                                </Link>
                              </li>
                          ))}
                        </ul>
                      </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Filters Button and Horizontal Filters */}
              <div className="relative">
                <motion.button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className={`${catalogStyles.pagination.active} px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 hover:shadow-lg`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                  <FaFilter /> Filters
                </motion.button>
                <AnimatePresence>
                  {isFiltersOpen && (
                      <motion.div
                          className={`fixed top-20 left-0 right-0 mx-auto ${catalogStyles.modalBg} rounded-xl shadow-2xl p-6 z-50 w-[90vw] max-w-4xl flex flex-wrap gap-6 border ${catalogStyles.modalBorder}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                      >
                        <div className="flex-1 min-w-[200px]">
                          <label className="block mb-1 font-semibold">Price Range (₴)</label>
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
                        {currentCategory === "clothing" && (
                            <div className="flex-1 min-w-[150px]">
                              <label className="block mb-1 font-semibold">Size</label>
                              <select
                                  value={sizeFilter}
                                  onChange={e => setSizeFilter(e.target.value)}
                                  className={`w-full border rounded-lg p-2 ${catalogStyles.inputBg} ${catalogStyles.inputBorder} transition-colors duration-300 hover:border-[#f59c9e]`}
                              >
                                <option value="">All</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                              </select>
                            </div>
                        )}
                        {currentCategory === "manga" && (
                            <div className="flex-1 min-w-[150px]">
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
                        <div className="flex-1 min-w-[150px]">
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
                        <div className="flex-1 min-w-[150px]">
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
                        <div className="flex-1 min-w-[150px]">
                          <label className="block mb-1 font-semibold">Minimum Rating</label>
                          <select
                              value={ratingFilter}
                              onChange={e => setRatingFilter(Number(e.target.value))}
                              className={`w-full border rounded-lg p-2 ${catalogStyles.inputBg} ${catalogStyles.inputBorder} transition-colors duration-300 hover:border-[#f59c9e]`}
                          >
                            <option value={0}>All</option>
                            <option value={1}>1 star & up</option>
                            <option value={2}>2 stars & up</option>
                            <option value={3}>3 stars & up</option>
                            <option value={4}>4 stars & up</option>
                            <option value={5}>5 stars</option>
                          </select>
                        </div>
                        <div className="flex-1 min-w-[150px]">
                          <label className="block mb-1 font-semibold">In Stock</label>
                          <select
                              value={inStockFilter === null ? "" : inStockFilter ? "true" : "false"}
                              onChange={e => {
                                const val = e.target.value;
                                if (val === "") setInStockFilter(null);
                                else setInStockFilter(val === "true");
                              }}
                              className={`w-full border rounded-lg p-2 ${catalogStyles.inputBg} ${catalogStyles.inputBorder} transition-colors duration-300 hover:border-[#f59c9e]`}
                          >
                            <option value="">All</option>
                            <option value="true">In Stock</option>
                            <option value="false">Out of Stock</option>
                          </select>
                        </div>
                        <div className="flex-1 min-w-[150px]">
                          <label className="block mb-1 font-semibold">Color</label>
                          <select
                              value={colorFilter}
                              onChange={e => setColorFilter(e.target.value)}
                              className={`w-full border rounded-lg p-2 ${catalogStyles.inputBg} ${catalogStyles.inputBorder} transition-colors duration-300 hover:border-[#f59c9e]`}
                          >
                            <option value="">All</option>
                            <option value="Red">Red</option>
                            <option value="Blue">Blue</option>
                            <option value="Black">Black</option>
                          </select>
                        </div>
                        <div className="flex-1 min-w-[150px]">
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
                        <div className="flex-1 min-w-[200px]">
                          <label className="block mb-1 font-semibold">Features</label>
                          <div className="flex flex-wrap gap-2">
                            {["Glowing", "Sound", "Limited Edition"].map(feature => (
                                <motion.label
                                    key={feature}
                                    className={`inline-flex items-center px-3 py-1 rounded-full ${catalogStyles.featureTagBg} text-sm cursor-pointer`}
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
                                      className="mr-2"
                                  />
                                  {feature}
                                </motion.label>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-64">
              <input
                  type="text"
                  placeholder="Search products..."
                  className={`w-full pl-10 pr-4 py-2 rounded-full border ${catalogStyles.inputBorder} ${catalogStyles.inputBg} focus:outline-none focus:border-[#f59c9e] transition-colors duration-300`}
                  disabled
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8">
            <main className="flex-1 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map(product => (
                    <Link
                        to={`/product/${product.id}`}
                        key={product.id}
                        className={`${catalogStyles.cardBg} relative rounded-3xl backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/10 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 overflow-hidden p-5 flex flex-col`}
                    >
                      <div className="relative mb-4 flex justify-center">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="rounded-xl w-[300px] h-[300px] object-cover"
                        />
                        <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleWishlist(product.id);
                            }}
                            className={`absolute top-3 right-3 text-2xl ${catalogStyles.wishlistBtnBg} ${catalogStyles.wishlistBtnBorder} p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-300 border`}
                            aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                            title={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          {wishlist.includes(product.id) ? (
                              <FaHeart className="text-red-500" />
                          ) : (
                              <FaRegHeart className={`${catalogStyles.wishlistEmptyHeartColor} hover:text-red-400 transition-colors`} />
                          )}
                        </button>
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold mb-1 truncate">{product.name}</h3>
                          <p className="text-sm opacity-70 line-clamp-2">{product.description}</p>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <p className={`font-bold ${catalogStyles.headingColor} text-xl leading-none`}>
                            {product.price} ₴
                          </p>
                          <button
                              onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                              }}
                              className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm shadow-md border border-white/30 backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:-translate-y-[1px] hover:scale-105 active:scale-95"
                              aria-label="Add to cart"
                              title="Add to cart"
                          >
                            <FaShoppingCart className="text-base" />
                            <span>Add to cart</span>
                          </button>
                        </div>
                      </div>
                    </Link>
                ))}
              </div>
              {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 disabled:opacity-50"
                        aria-label="Previous page"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                                currentPage === page ? catalogStyles.pagination.active : catalogStyles.pagination.hover
                            }`}
                            aria-label={`Page ${page}`}
                        >
                          {page}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 disabled:opacity-50"
                        aria-label="Next page"
                    >
                      Next
                    </button>
                  </div>
              )}
            </main>
          </div>
        </div>
        <Footer />
      </div>
  );
}