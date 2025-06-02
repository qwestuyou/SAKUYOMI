import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CatalogHeader from "../components/CatalogComponents/CatalogHeader.jsx";
import CategoriesPanel from "../components/CatalogComponents/CategoriesPanel.jsx";
import FiltersPanel from "../components/CatalogComponents/FiltersPanel.jsx";
import ProductsGrid from "../components/CatalogComponents/ProductsGrid.jsx";
import Pagination from "../components/CatalogComponents/Pagination.jsx";
import FloatingParticles from "../components/CatalogComponents/FloatingParticles.jsx";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { useNotification } from "../components/Notification";

export default function Catalog() {
  const { theme, themeStyles } = useTheme();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const currentCategory = category?.toLowerCase() || "all";
  const { addToCart } = useCart();
  const notify = useNotification();

  const [wishlist, setWishlist] = useState([]);
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
    fetch("/api/wishlist", {
      credentials: "include",
    })
        .then((res) => res.json())
        .then((data) => setWishlist(data.map((p) => p.id)))
        .catch((err) => {
          console.error("Failed to load wishlist", err);
          notify("Failed to load wishlist", "error");
        });
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
        notify("Failed to load categories", "error");
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
        let filtered = data;
        if (category && category.toLowerCase() !== "all") {
          filtered = data.filter((p) => p.category?.slug === category.toLowerCase());
        }
        setFilteredProducts(filtered);
      } catch (error) {
        console.error("Error loading products:", error);
        notify("Failed to load products", "error");
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, [category]);

  useEffect(() => {
    if (products.length === 0) return;

    let filtered = [...products];

    if (currentCategory !== "all") {
      filtered = filtered.filter((p) => p.category?.slug === currentCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
          (p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter((product) => {
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      if (currentCategory === "clothing" && sizeFilter && product.size !== sizeFilter) return false;
      if (currentCategory === "manga" && languageFilter && product.language !== languageFilter) return false;
      if (materialFilter && product.material !== materialFilter) return false;
      if (brandFilter && product.brand !== brandFilter) return false;
      if (ratingFilter && (!product.rating || product.rating < ratingFilter)) return false;
      if (inStockFilter !== null && product.inStock !== inStockFilter) return false;
      if (colorFilter && product.color !== colorFilter) return false;
      if (ageRatingFilter && product.ageRating !== ageRatingFilter) return false;
      if (featuresFilter.length > 0 && (!product.features || !featuresFilter.every((f) => product.features.includes(f))))
        return false;
      return true;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
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
    featuresFilter,
  ]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleWishlist = async (productId) => {
    const isWished = wishlist.includes(productId);
    try {
      const res = await fetch(
          isWished ? `http://localhost:5000/api/wishlist/${productId}` : `http://localhost:5000/api/wishlist`,
          {
            method: isWished ? "DELETE" : "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: isWished ? null : JSON.stringify({ productId }),
          }
      );

      if (!res.ok) throw new Error();

      setWishlist((prev) => (isWished ? prev.filter((id) => id !== productId) : [...prev, productId]));

      notify(isWished ? "Removed from wishlist" : "Added to wishlist", isWished ? "info" : "success");
    } catch (err) {
      console.error("Failed to toggle wishlist", err);
      notify("Failed to update wishlist", "error");
    }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
      <div className={`${catalogStyles.pageBg} min-h-screen transition-colors duration-300`}>
        <Header />
        <FloatingParticles />
        <div className="p-6 max-w-7xl mx-auto relative z-10">
          <CatalogHeader
              catalogStyles={catalogStyles}
              isCategoriesOpen={isCategoriesOpen}
              setIsCategoriesOpen={setIsCategoriesOpen}
              isFiltersOpen={isFiltersOpen}
              setIsFiltersOpen={setIsFiltersOpen}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
          />
          <CategoriesPanel
              isCategoriesOpen={isCategoriesOpen}
              setIsCategoriesOpen={setIsCategoriesOpen}
              categories={categories}
              currentCategory={currentCategory}
              catalogStyles={catalogStyles}
          />
          <FiltersPanel
              isFiltersOpen={isFiltersOpen}
              setIsFiltersOpen={setIsFiltersOpen}
              currentCategory={currentCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sizeFilter={sizeFilter}
              setSizeFilter={setSizeFilter}
              languageFilter={languageFilter}
              setLanguageFilter={setLanguageFilter}
              materialFilter={materialFilter}
              setMaterialFilter={setMaterialFilter}
              brandFilter={brandFilter}
              setBrandFilter={setBrandFilter}
              ratingFilter={ratingFilter}
              setRatingFilter={setRatingFilter}
              inStockFilter={inStockFilter}
              setInStockFilter={setInStockFilter}
              colorFilter={colorFilter}
              setColorFilter={setColorFilter}
              ageRatingFilter={ageRatingFilter}
              setAgeRatingFilter={setAgeRatingFilter}
              featuresFilter={featuresFilter}
              setFeaturesFilter={setFeaturesFilter}
              resetFilters={resetFilters}
              catalogStyles={catalogStyles}
          />
          {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-12 h-12 border-4 border-[#f59c9e] border-t-transparent rounded-full"
                />
              </div>
          ) : (
              <motion.main variants={containerVariants} initial="hidden" animate="show">
                {currentProducts.length > 0 ? (
                    <>
                      <ProductsGrid
                          currentProducts={currentProducts}
                          wishlist={wishlist}
                          toggleWishlist={toggleWishlist}
                          addToCart={addToCart}
                          catalogStyles={catalogStyles}
                      />
                      <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          handlePageChange={handlePageChange}
                          catalogStyles={catalogStyles}
                      />
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