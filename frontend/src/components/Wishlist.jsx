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

  useEffect(() => {
    if (wishlistIds.length === 0) {
      setWishlistProducts([]);
      return;
    }
    fetch(`http://localhost:5000/api/products`)
      .then(res => res.json())
      .then(products => {
        setWishlistProducts(products.filter(p => wishlistIds.includes(p.id)));
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

  return (
    <div className={`mt-6 p-6 rounded-3xl shadow-lg hover:shadow-xl transition duration-300 ${sectionBg}`}>
      <h2 className="text-2xl font-bold text-[#f59c9e] mb-4">Wishlist</h2>

      {wishlistProducts.length === 0 ? (
        <p className="italic text-sm opacity-80">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map(product => (
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
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 font-bold text-lg"
                title="Remove from wishlist"
                aria-label="Remove from wishlist"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
