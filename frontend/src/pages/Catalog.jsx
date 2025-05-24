import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

const categoriesList = [
  "All",
  "Manga",
  "Figures",
  "Poster",
  "Badge",
  "Clothing",
  "Accessories",
  "Funko Pop! Anime",
  "Stationery"
];

export default function Catalog() {
  const { theme } = useTheme();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const currentCategory = category?.toLowerCase() || "all";

  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sizeFilter, setSizeFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
        .then(res => res.json())
        .then(data => {
          if (category && category.toLowerCase() !== "all") {
            setProducts(
                data.filter(
                    p => p.category?.name.toLowerCase() === category.toLowerCase()
                )
            );
          } else {
            setProducts(data);
          }
        })
        .catch(console.error);
  }, [category]);

  const filteredProducts = products.filter(product => {
    if (currentCategory === "clothing" && sizeFilter) {
      return product.size === sizeFilter;
    }
    if (currentCategory === "manga" && languageFilter) {
      return product.language === languageFilter;
    }
    return (
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  });

  // Тема
  const pageBg = theme === "dark" ? "bg-[#1a1a1a] text-gray-200" : "bg-[#fff6f4] text-gray-800";
  const sidebarBg = theme === "dark" ? "bg-[#2b2b2b]" : "bg-white";
  const mainBg = theme === "dark" ? "bg-[#2b2b2b]" : "bg-white";
  const cardBg = theme === "dark" ? "bg-[#333] border-gray-600" : "bg-white border-pink-200";
  const headingColor = theme === "dark" ? "text-pink-200" : "text-[#f59c9e]";
  const linkActive = theme === "dark" ? "bg-pink-600 text-white" : "bg-[#f59c9e] text-white";
  const linkHover = theme === "dark" ? "hover:bg-pink-500" : "hover:bg-[#feeae6]";

  return (
      <div className={`${pageBg} min-h-screen transition-colors duration-300`}>
        <Header />

        <div className="p-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Сайдбар */}
          <aside className="w-full md:w-1/4">
            <div className={`${sidebarBg} p-4 rounded-2xl shadow-md transition-colors duration-300`}>
              <h2 className={`text-xl font-bold mb-4 ${headingColor}`}>Categories</h2>
              <ul className="space-y-2">
                {categoriesList.map(cat => {
                  const isActive = currentCategory === cat.toLowerCase();
                  return (
                      <li key={cat}>
                        <Link
                            to={cat === "All" ? "/catalog" : `/catalog?category=${cat.toLowerCase()}`}
                            className={`block p-2 rounded-xl transition ${isActive ? linkActive : linkHover}`}
                        >
                          {cat}
                        </Link>
                      </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Контент */}
          <main className="flex-1 space-y-8">
            {/* Фильтры */}
            <div className={`${mainBg} p-4 rounded-2xl shadow-md transition-colors duration-300`}>
              <h2 className={`text-lg font-bold mb-2 ${headingColor}`}>Filters</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Price */}
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

                {/* Size */}
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

                {/* Language */}
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
              </div>
            </div>

            {/* Товары */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                  <Link
                      to={`/product/${product.id}`}
                      key={product.id}
                      className={`${cardBg} rounded-2xl shadow hover:shadow-lg transform hover:scale-[1.02] p-4 transition-all duration-300`}
                  >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="rounded-xl mb-3 w-full h-48 object-cover"
                    />
                    <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm opacity-70 mb-2">{product.description}</p>
                    <p className={`font-bold ${headingColor}`}>{product.price} ₴</p>
                  </Link>
              ))}
            </div>
          </main>
        </div>

        <Footer />
      </div>
  );
}
