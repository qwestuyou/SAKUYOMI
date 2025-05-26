import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { FaRegHeart, FaHeart, FaShoppingCart } from "react-icons/fa";

export default function Catalog() {
  const { theme } = useTheme();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const currentCategory = category?.toLowerCase() || "all";

  const [wishlist, setWishlist] = useState({});

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

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => {
        setCategories(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        if (category && category.toLowerCase() !== "all") {
          setProducts(
            data.filter(p => p.category?.slug === category.toLowerCase())
          );
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
    if (
      featuresFilter.length > 0 &&
      (!product.features || !featuresFilter.every(f => product.features.includes(f)))
    )
      return false;
    return true;
  });

  // Тема
  const pageBg = theme === "dark" ? "bg-[#1a1a1a] text-gray-200" : "bg-[#fff6f4] text-gray-800";
  const sidebarBg = theme === "dark" ? "bg-[#2b2b2b]" : "bg-white";
  const mainBg = theme === "dark" ? "bg-[#2b2b2b]" : "bg-white";
  const cardBg = theme === "dark" ? "bg-[#333] border-gray-600" : "bg-white border-pink-200";
  const headingColor = theme === "dark" ? "text-pink-200" : "text-[#f59c9e]";
  const linkActive = theme === "dark" ? "bg-pink-600 text-white" : "bg-[#f59c9e] text-white";
  const linkHover = theme === "dark" ? "hover:bg-pink-500" : "hover:bg-[#feeae6]";

  function toggleWishlist(id) {
    setWishlist(prev => {
      const newState = {...prev, [id]: !prev[id]};
      return newState;
    });
  }

  return (
      <div className={`${pageBg} min-h-screen transition-colors duration-300`}>
        <Header />

        <div className="p-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Сайдбар */}
          <aside className="w-full md:w-1/4">
            <div className={`${sidebarBg} p-4 rounded-2xl shadow-md transition-colors duration-300`}>
              <h2 className={`text-xl font-bold mb-4 ${headingColor}`}>Categories</h2>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/catalog"
                      className={`block p-2 rounded-xl transition ${currentCategory === "all" ? linkActive : linkHover}`}
                    >
                      All
                    </Link>
                  </li>
                  {categories.map(cat => {
                    const isActive = currentCategory === cat.slug;
                    return (
                      <li key={cat.id}>
                        <Link
                          to={`/catalog?category=${cat.slug}`}
                          className={`block p-2 rounded-xl transition ${isActive ? linkActive : linkHover}`}
                        >
                          {cat.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
            </div>
            
            <div className={`${mainBg} p-4 rounded-2xl shadow-md transition-colors duration-300 mt-10`}>
              <h2 className={`text-lg font-bold mb-2 ${headingColor}`}>Filters</h2>
              <div className="flex flex-col gap-4">

                {/* Цена */}
                <div>
                  <label className="block mb-1 font-semibold">Price Range (₴)</label>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([0, +e.target.value])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm opacity-70">
                    <span>0 ₴</span>
                    <span>{priceRange[1]} ₴</span>
                  </div>
                </div>

                {/* Размер (только для одежды) */}
                {currentCategory === "clothing" && (
                  <div>
                    <label className="block mb-1 font-semibold">Size</label>
                    <select
                      value={sizeFilter}
                      onChange={e => setSizeFilter(e.target.value)}
                      className="w-full border rounded p-2 bg-inherit text-inherit transition-colors duration-300"
                    >
                      <option value="">All</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                    </select>
                  </div>
                )}

                {/* Язык (только для манги) */}
                {currentCategory === "manga" && (
                  <div>
                    <label className="block mb-1 font-semibold">Language</label>
                    <select
                      value={languageFilter}
                      onChange={e => setLanguageFilter(e.target.value)}
                      className="w-full border rounded p-2 bg-inherit text-inherit transition-colors duration-300"
                    >
                      <option value="">All</option>
                      <option value="Japanese">Japanese</option>
                      <option value="English">English</option>
                      <option value="Ukrainian">Ukrainian</option>
                    </select>
                  </div>
                )}

                {/* Материал */}
                <div>
                  <label className="block mb-1 font-semibold">Material</label>
                  <select
                    value={materialFilter}
                    onChange={e => setMaterialFilter(e.target.value)}
                    className="w-full border rounded p-2 bg-inherit text-inherit transition-colors duration-300"
                  >
                    <option value="">All</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Polyester">Polyester</option>
                    <option value="Vinyl">Vinyl</option>
                    {/* Добавляй по своему списку */}
                  </select>
                </div>

                {/* Бренд */}
                <div>
                  <label className="block mb-1 font-semibold">Brand</label>
                  <select
                    value={brandFilter}
                    onChange={e => setBrandFilter(e.target.value)}
                    className="w-full border rounded p-2 bg-inherit text-inherit transition-colors duration-300"
                  >
                    <option value="">All</option>
                    <option value="Bandai">Bandai</option>
                    <option value="Good Smile">Good Smile</option>
                    <option value="Funko">Funko</option>
                    {/* Добавляй по своему списку */}
                  </select>
                </div>

                {/* Рейтинг */}
                <div>
                  <label className="block mb-1 font-semibold">Minimum Rating</label>
                  <select
                    value={ratingFilter}
                    onChange={e => setRatingFilter(Number(e.target.value))}
                    className="w-full border rounded p-2 bg-inherit text-inherit transition-colors duration-300"
                  >
                    <option value={0}>All</option>
                    <option value={1}>1 star & up</option>
                    <option value={2}>2 stars & up</option>
                    <option value={3}>3 stars & up</option>
                    <option value={4}>4 stars & up</option>
                    <option value={5}>5 stars</option>
                  </select>
                </div>
                {/* Наличие */}
                <div>
                  <label className="block mb-1 font-semibold">In Stock</label>
                  <select
                    value={inStockFilter === null ? "" : inStockFilter ? "true" : "false"}
                    onChange={e => {
                      const val = e.target.value;
                      if (val === "") setInStockFilter(null);
                      else setInStockFilter(val === "true");
                    }}
                    className="w-full border rounded p-2 bg-inherit text-inherit transition-colors duration-300"
                  >
                    <option value="">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>
                {/* Цвет */}
                <div>
                  <label className="block mb-1 font-semibold">Color</label>
                  <select
                    value={colorFilter}
                    onChange={e => setColorFilter(e.target.value)}
                    className="w-full border rounded p-2 bg-inherit text-inherit transition-colors duration-300"
                  >
                    <option value="">All</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Black">Black</option>
                    {/* Добавляй по своему списку */}
                  </select>
                </div>
                {/* Возрастные ограничения */}
                <div>
                  <label className="block mb-1 font-semibold">Age Rating</label>
                  <select
                    value={ageRatingFilter}
                    onChange={e => setAgeRatingFilter(e.target.value)}
                    className="w-full border rounded p-2 bg-inherit text-inherit transition-colors duration-300"
                  >
                    <option value="">All</option>
                    <option value="13+">13+</option>
                    <option value="18+">18+</option>
                  </select>
                </div>
                {/* Фичи (чекбоксы) */}
                <div>
                  <label className="block mb-1 font-semibold">Features</label>
                  {["Glowing", "Sound", "Limited Edition"].map(feature => (
                    <label key={feature} className="inline-flex items-center mr-4">
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
                        className="mr-1"
                      />
                      {feature}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 space-y-8">
            {/* Товары */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    className={`${cardBg} rounded-2xl shadow hover:shadow-lg transform hover:scale-[1.02] p-5 transition-all duration-300 relative`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="rounded-xl mb-3 w-full h-60 object-cover"
                    />
                    <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
                    <p className="text-sm opacity-70 mb-5">{product.description}</p>

                    <p className={`font-bold ${headingColor} text-center text-2xl mb-5`}>
                      {product.price} ₴
                    </p>

                    {/* Кнопка "вишлист" */}
                    <button
                      onClick={e => {
                        e.preventDefault();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-5 right-5 text-2xl focus:outline-none"
                      aria-label={wishlist[product.id] ? "Remove from wishlist" : "Add to wishlist"}
                      title={wishlist[product.id] ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {wishlist[product.id] ? (
                        <FaHeart className="text-red-600" />
                      ) : (
                        <FaRegHeart className="text-gray-400 hover:text-red-500 transition-colors duration-300" />
                      )}
                    </button>
                    {/* Кнопка корзины снизу справа */}
                    <button
                      onClick={e => {
                        e.preventDefault();
                        addToCart(product.id);
                      }}
                      className="absolute bottom-5 right-5 text-2xl focus:outline-none text-red-600 hover:text-green-600"
                      aria-label="Add to cart"
                      title="Add to cart"
                    >
                      <FaShoppingCart />
                    </button>
                  </Link>
                ))}
            </div>
          </main>
        </div>
        <Footer />
      </div>
  );
}
