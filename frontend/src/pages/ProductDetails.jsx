import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useNotification } from "../components/Notification";

export default function ProductDetails() {
    const { id } = useParams();
    const { themeStyles } = useTheme();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const notify = useNotification();
    const navigate = useNavigate();

    const styles = themeStyles.productDetails;

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(5);

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                fetchRelatedProducts(data.categoryId, data.id);
            })
            .catch(() => notify("Failed to load product", "error"));
    }, [id]);

    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:5000/api/reviews/${id}`)
            .then((res) => res.json())
            .then((data) => setReviews(data))
            .catch(() => notify("Failed to load reviews", "error"));
    }, [id]);

    const fetchRelatedProducts = (categoryId, currentProductId) => {
        fetch("http://localhost:5000/api/products")
            .then((res) => res.json())
            .then((allProducts) => {
                const related = allProducts.filter(
                    (p) => p.categoryId === categoryId && p.id !== currentProductId
                );
                setRelatedProducts(related.slice(0, 4));
            })
            .catch(() => notify("Failed to load similar products", "error"));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            notify("You need to login to leave a review", "error");
            return;
        }

        if (!content.trim()) {
            notify("Review content cannot be empty", "error");
            return;
        }

        const newReview = {
            productId: Number(id),
            content,
            rating,
            userId: user.id,
        };

        try {
            const res = await fetch("http://localhost:5000/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(newReview),
            });

            if (res.ok) {
                const added = await res.json();
                setReviews((prev) => [
                    {
                        ...added,
                        user: { name: user.name, avatar: user.avatar },
                    },
                    ...prev,
                ]);
                setContent("");
                setRating(5);
                notify("Review submitted successfully", "success");
            } else {
                notify("Failed to submit review", "error");
            }
        } catch (err) {
            console.error(err);
            notify("Network error while submitting review", "error");
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (!confirmed) return;

        try {
            const res = await fetch(`http://localhost:5000/api/products/${product.id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (res.ok) {
                notify("Product deleted successfully", "success");
                navigate("/catalog");
            } else {
                notify("Failed to delete product", "error");
            }
        } catch (err) {
            notify("Error deleting product", "error");
        }
    };

    if (!product) {
        return (
            <div className={`text-center p-10 ${styles.subText}`}>
                Loading...
            </div>
        );
    }

    return (
        <div className={`${styles.bg} min-h-screen transition-colors duration-300 relative`}>
            <Header />

            <div className="max-w-6xl mx-auto p-6">
                <motion.button
                    onClick={() => navigate(-1)}
                    className={`inline-flex items-center gap-2 mb-6 ${styles.subText} px-6 py-3 rounded-full transition cursor-pointer border ${styles.border} hover:bg-[#f59c9e] hover:text-white`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </motion.button>
            </div>

            <motion.div
                className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-2xl w-full md:w-1/2 h-[500px] object-cover shadow-md"
                />

                <div className="flex-1 space-y-6">
                    <h1 className={`text-4xl font-bold ${styles.heading}`}>
                        {product.name}
                    </h1>
                    <p className={`text-lg ${styles.subText}`}>
                        {product.description}
                    </p>
                    <p className={`text-2xl font-bold ${styles.price}`}>
                        {product.price} ₴
                    </p>

                    <div className="flex flex-wrap gap-4 items-center">
                        <motion.button
                            onClick={() => addToCart(product)}
                            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-[#f59c9e] border border-[#f59c9e] hover:bg-[#f59c9e] hover:text-white font-semibold transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6H17m-7-6V6m0 0h4m-4 0v7" />
                            </svg>
                            Add to Cart
                        </motion.button>

                        {user?.isAdmin && (
                            <>
                                <motion.button
                                    onClick={() => navigate(`/edit-product/${product.id}`)}
                                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-yellow-600 border border-yellow-500 hover:bg-yellow-500 hover:text-white font-semibold transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 019 17H6v-3a2 2 0 012-2z" />
                                    </svg>
                                    Edit
                                </motion.button>

                                <motion.button
                                    onClick={handleDelete}
                                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-red-600 border border-red-500 hover:bg-red-500 hover:text-white font-semibold transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Delete
                                </motion.button>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>

            <div className="p-6 max-w-6xl mx-auto">
                <h2 className={`text-2xl font-semibold mb-6 ${styles.text}`}>Similar Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {relatedProducts.map((rp) => (
                        <motion.div
                            key={rp.id}
                            className={`${styles.card} p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <img
                                src={rp.image}
                                alt={rp.name}
                                className="rounded-xl mb-4 w-full h-40 object-cover"
                            />
                            <h3 className="text-lg font-semibold truncate">{rp.name}</h3>
                            <p className={`${styles.heading} font-bold`}>{rp.price} ₴</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="p-6 max-w-6xl mx-auto">
                <h2 className={`text-2xl font-bold mb-6 ${styles.heading}`}>Reviews</h2>

                {user && (
                    <motion.form
                        onSubmit={handleSubmit}
                        className={`space-y-4 mb-8 ${styles.card} p-6 rounded-xl shadow-md`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className={`w-full p-3 border rounded-lg resize-none bg-inherit ${styles.subText} focus:ring-2 focus:ring-[#f59c9e] transition-all duration-200`}
                            placeholder="Write your review..."
                            rows="4"
                            required
                        />
                        <div className="flex items-center justify-between">
                            <select
                                value={rating}
                                onChange={(e) => setRating(parseInt(e.target.value))}
                                className="border rounded-lg p-2 bg-inherit focus:ring-2 focus:ring-[#f59c9e] transition-all duration-200"
                            >
                                {[5, 4, 3, 2, 1].map((num) => (
                                    <option key={num} value={num}>
                                        {num} ⭐
                                    </option>
                                ))}
                            </select>
                            <motion.button
                                type="submit"
                                className={`px-6 py-3 rounded-lg ${styles.btn} hover:bg-[#f59c9e] hover:text-white transition-all duration-200`}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                Add Review
                            </motion.button>
                        </div>
                    </motion.form>
                )}

                <ul className="list-none space-y-6">
                    {reviews.map((review) => (
                        <motion.li
                            key={review.id}
                            className={`${styles.card} p-6 rounded-2xl shadow-md border ${styles.border} transition-all duration-300`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={
                                            review.user?.avatar
                                                ? `http://localhost:5000${review.user.avatar}`
                                                : "/images/default-avatar.png"
                                        }
                                        alt="User Avatar"
                                        className={`w-12 h-12 rounded-full object-cover border ${styles.avatarBorder}`}
                                    />
                                    <p className={`font-semibold ${styles.reviewAuthor}`}>
                                        {review.user?.name || "Anonymous"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 text-sm opacity-70">
                                    <span className="text-yellow-400">{'⭐️'.repeat(review.rating)}</span>
                                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <p className={`${styles.subText} flex-1`}>{review.content}</p>

                                {(user?.id === review.userId || user?.isAdmin) && (
                                    <motion.button
                                        onClick={async () => {
                                            const confirmed = window.confirm("Delete this review?");
                                            if (!confirmed) return;

                                            try {
                                                const res = await fetch(`http://localhost:5000/api/reviews/${review.id}`, {
                                                    method: "DELETE",
                                                    credentials: "include",
                                                });

                                                if (res.ok) {
                                                    setReviews((prev) => prev.filter((r) => r.id !== review.id));
                                                    notify("Review deleted", "success");
                                                } else {
                                                    notify("Failed to delete review", "error");
                                                }
                                            } catch (err) {
                                                notify("Network error", "error");
                                            }
                                        }}
                                        className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Delete
                                    </motion.button>
                                )}
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </div>

            <Footer />
        </div>
    );
}