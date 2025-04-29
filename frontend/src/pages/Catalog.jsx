import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useLocation } from 'react-router-dom'; 
import { useEffect, useState } from "react";

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
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const currentCategory = params.get("category")?.toLowerCase() || "all";

  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sizeFilter, setSizeFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  // отфильтрованные товары
  const filteredProducts = products.filter(product => {
    if (category?.toLowerCase() === "clothing" && sizeFilter) {
      return product.size === sizeFilter;
    }
    if (category?.toLowerCase() === "manga" && languageFilter) {
      return product.language === languageFilter;
    }
    // Фильтр цены для всех товаров
    return product.price >= priceRange[0] && product.price <= priceRange[1];
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        if (category && category.toLowerCase() !== "all") {
          const filtered = data.filter(
            product => product.category?.name.toLowerCase() === category.toLowerCase()
          );
          setProducts(filtered);
        } else {
          setProducts(data);
        }
      });
  }, [category]);

  return (
    <div className="min-h-screen bg-[#fff6f4] text-gray-800">
    <Header />
  
    <div className="p-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      
      {/* Сайдбар с категориями */}
      <aside className="w-full md:w-1/4">
        <div className="bg-white p-4 rounded-2xl shadow-md sticky top-24">
          <h2 className="text-xl font-bold mb-4 text-[#f59c9e]">Categories</h2>
          <ul className="space-y-2">
            {categoriesList.map((cat) => (
              <li key={cat}>
                <Link
                  to={cat === "All" ? "/catalog" : `/catalog?category=${cat.toLowerCase()}`}
                  className={`block p-2 rounded-xl transition ${
                    currentCategory === cat.toLowerCase()
                      ? "bg-[#f59c9e] text-white"
                      : "hover:bg-[#feeae6]"
                  }`}
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
  
      {/* Основной контент */}
      <main className="flex-1">
        
        {/* Фильтры над товарами */}
        <div className="bg-white p-4 rounded-2xl shadow-md mb-8">
          <h2 className="text-lg font-bold mb-2 text-[#f59c9e]">Filters</h2>
  
          {/* Блок фильтров */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  
            {/* Фильтр цены */}
            <div>
              <label className="block mb-1 font-semibold">Price Range (₴)</label>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>0 ₴</span>
                <span>{priceRange[1]} ₴</span>
              </div>
            </div>
  
            {/* Фильтр размеров */}
            {category?.toLowerCase() === "clothing" && (
              <div>
                <label className="block mb-1 font-semibold">Size</label>
                <select
                  value={sizeFilter}
                  onChange={(e) => setSizeFilter(e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option value="">All</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>
              </div>
            )}
  
            {/* Фильтр языка */}
            {category?.toLowerCase() === "manga" && (
              <div>
                <label className="block mb-1 font-semibold">Language</label>
                <select
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="w-full border rounded p-2"
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
  
        {/* Список товаров */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
              className="bg-white border border-pink-200 rounded-2xl shadow hover:shadow-lg transition-transform transform hover:scale-[1.02] p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="rounded-xl mb-3 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="text-[#f59c9e] font-bold mb-1">{product.price} ₴</p>
            </Link>
          ))}
        </div>
  
      </main>
    </div>
    <Footer />
  </div>
  
  );
}
