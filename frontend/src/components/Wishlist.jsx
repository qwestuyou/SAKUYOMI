import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Wishlist({ sectionBg }) {
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    if (wishlistIds.length === 0) {
      setWishlistProducts([]);
      setCurrentPage(1);
      return;
    }
    fetch(`http://localhost:5000/api/products`)
        .then(res => res.json())
        .then(products => {
          setWishlistProducts(products.filter(p => wishlistIds.includes(p.id)));
          setCurrentPage(1);
        })
        .catch(console.error);
  }, [wishlistIds]);

  const removeFromWishlist = (id) => {
    setWishlistIds(prev => {
      const newList = prev.filter(itemId => itemId !== id);
      localStorage.setItem("wishlist", JSON.stringify(newList));
      return newList;
    });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = wishlistProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(wishlistProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const linkActive = theme => theme === "dark" ? "bg-[#9b5f5f] text-white" : "bg-[#f59c9e] text-white";
  const linkHover = theme => theme === "dark" ? "hover:bg-[#242424]" : "hover:bg-[#feeae6]";
  const closeButtonBg = sectionBg.includes("dark") ? "bg-gray-800/80" : "bg-white/80";
  const closeButtonBorder = sectionBg.includes("dark") ? "border-gray-600" : "border-gray-200";

  return (
      <div className={`mt-6 p-6 rounded-3xl shadow-lg hover:shadow-xl transition duration-300 ${sectionBg}`}>
        <h2 className="text-2xl font-bold text-[#f59c9e] mb-4">Wishlist</h2>

        {wishlistProducts.length === 0 ? (
            <p className="italic text-sm opacity-80">Your wishlist is empty.</p>
        ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map(product => (
                    <div key={product.id} className="rounded-2xl shadow p-4 relative">
                      <Link to={`/product/${product.id}`}>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="rounded-xl mb-3 w-full h-48 object-cover"
                        />
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="font-bold text-pink-500">{product.price} ₴</p>
                      </Link>
                      <button
                          onClick={() => removeFromWishlist(product.id)}
                          className={`absolute top-3 right-3 ${closeButtonBg} ${closeButtonBorder} p-2 rounded-full shadow-md hover:scale-110 transition-all duration-300 border flex items-center justify-center`}
                          title="Remove from wishlist"
                          aria-label="Remove from wishlist"
                      >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-red-500 hover:text-red-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
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
                                currentPage === page ? linkActive(sectionBg.includes("dark") ? "dark" : "light") : linkHover(sectionBg.includes("dark") ? "dark" : "light")
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
            </>
        )}
      </div>
  );
}