import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useTheme} from "../context/ThemeContext";
import {useNotification} from "./Notification";

export default function Wishlist({sectionBg}) {
    const {themeStyles} = useTheme();
    const notify = useNotification();
    const styles = themeStyles.wishlist;

    const [wishlist, setWishlist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    useEffect(() => {
        fetch("/api/wishlist", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then(setWishlist)
            .catch((err) => {
                console.error("Failed to load wishlist", err);
                notify("Failed to load wishlist", "error");
            });
    }, []);

    const handleRemove = async (id) => {
        try {
            const res = await fetch(`/api/wishlist/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (res.ok) {
                setWishlist((prev) => prev.filter((item) => item.id !== id));
                notify("Removed from wishlist", "info");
            } else {
                notify("Failed to remove from wishlist", "error");
            }
        } catch (err) {
            console.error("Error removing from wishlist:", err);
            notify("Error removing from wishlist", "error");
        }
    };

    const totalPages = Math.ceil(wishlist.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const currentProducts = wishlist.slice(indexOfLastProduct - productsPerPage, indexOfLastProduct);

    return (
        <div className={`mt-6 p-6 rounded-3xl shadow-lg hover:shadow-xl transition duration-300 ${sectionBg}`}>
            <h2 className={`text-2xl font-bold ${styles.heading} mb-4`}>Wishlist</h2>

            {wishlist.length === 0 ? (
                <p className="italic text-sm opacity-80">Your wishlist is empty.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentProducts.map((product) => (
                            <div key={product.id} className={`rounded-2xl shadow p-4 relative ${styles.card}`}>
                                <Link to={`/product/${product.id}`}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="rounded-xl mb-3 w-full h-48 object-cover"
                                    />
                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                    <p className={`font-bold ${styles.price}`}>{product.price} ₴</p>
                                </Link>
                                <button
                                    onClick={() => handleRemove(product.id)}
                                    className={`absolute top-3 right-3 p-2 rounded-full shadow-md hover:scale-110 transition-all duration-300 border flex items-center justify-center
                  ${styles.closeBtnBg} ${styles.closeBtnBorder}`}
                                    title="Remove from wishlist"
                                    aria-label="Remove from wishlist"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`w-5 h-5 ${styles.closeIcon}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-6">
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            {Array.from({length: totalPages}, (_, index) => index + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                                        currentPage === page ? styles.pagination.active : styles.pagination.hover
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 disabled:opacity-50"
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
