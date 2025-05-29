import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
    const { id } = useParams();
    const { themeStyles } = useTheme();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const styles = themeStyles.productDetails;

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(5);

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                fetchRelatedProducts(data.categoryId, data.id);
            });
    }, [id]);

    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:5000/api/reviews/${id}`)
            .then(res => res.json())
            .then(data => setReviews(data));
    }, [id]);

    const fetchRelatedProducts = (categoryId, currentProductId) => {
        fetch("http://localhost:5000/api/products")
            .then(res => res.json())
            .then(allProducts => {
                const related = allProducts.filter(
                    (p) => p.categoryId === categoryId && p.id !== currentProductId
                );
                setRelatedProducts(related.slice(0, 4));
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        const newReview = {
            productId: Number(id),
            content,
            rating,
            userId: user?.id,
        };

        const res = await fetch('http://localhost:5000/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReview),
        });

        if (res.ok) {
            const added = await res.json();
            setReviews(prev => [
                {
                    ...added,
                    user: { name: user.name }
                },
                ...prev
            ]);
            setContent('');
            setRating(5);
        } else {
            alert('Помилка при додаванні відгуку');
        }
    };

    if (!product) {
        return <div className={`text-center p-10 ${styles.subText}`}>Loading...</div>;
    }

    return (
        <div className={`${styles.bg} min-h-screen transition-colors duration-300`}>
            <Header />

            <div className="max-w-6xl mx-auto p-6">
                <button
                    onClick={() => navigate(-1)}
                    className={`inline-block mb-6 ${styles.subText} px-6 py-3 rounded-full transition cursor-pointer`}
                >
                    ← Back
                </button>
            </div>

            <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">
                <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-2xl w-full md:w-1/2 h-[500px] object-cover"
                />

                <div className="flex-1">
                    <h1 className={`text-4xl font-bold mb-4 ${styles.heading}`}>{product.name}</h1>
                    <p className={`mb-4 ${styles.subText}`}>{product.description}</p>
                    <p className={`text-2xl font-bold mb-6 ${styles.price}`}>{product.price} ₴</p>
                    <button
                        onClick={() => addToCart(product)}
                        className={`py-3 px-6 rounded ${styles.btn}`}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Similar Products */}
            <div className="p-6 max-w-6xl mx-auto">
                <h2 className={`text-2xl font-semibold mb-4 ${styles.text}`}>Similar Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedProducts.map(rp => (
                        <div key={rp.id} className={`${styles.card} p-4 rounded-2xl shadow hover:shadow-lg transition`}>
                            <img src={rp.image} alt={rp.name} className="rounded-xl mb-3 w-full h-40 object-cover" />
                            <h3 className="text-lg font-semibold">{rp.name}</h3>
                            <p className={`${styles.heading} font-bold`}>{rp.price} ₴</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reviews */}
            <div className="p-6 max-w-6xl mx-auto">
                <h2 className={`text-2xl font-bold mb-4 ${styles.heading}`}>Reviews</h2>

                <form onSubmit={handleSubmit} className={`space-y-4 mb-6 ${styles.card} p-4 rounded-xl shadow`}>
          <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full p-2 border rounded resize-none bg-inherit ${styles.subText}`}
              placeholder="Write your review..."
              rows="3"
              required
          />
                    <div className="flex items-center justify-between">
                        <select
                            value={rating}
                            onChange={(e) => setRating(parseInt(e.target.value))}
                            className="border rounded p-2 bg-inherit"
                        >
                            {[5, 4, 3, 2, 1].map(num => (
                                <option key={num} value={num}>{num} ⭐</option>
                            ))}
                        </select>
                        <button type="submit" className={`px-6 py-2 rounded ${styles.btn}`}>
                            Add Review
                        </button>
                    </div>
                </form>

                <ul className="list-none space-y-4">
                    {reviews.map((review) => (
                        <li
                            key={review.id}
                            className={`${styles.card} p-4 rounded-2xl shadow-sm border ${styles.border} hover:shadow-md transition`}
                        >
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={
                                            review.user?.avatar
                                                ? `http://localhost:5000${review.user.avatar}`
                                                : "/images/default-avatar.png"
                                        }
                                        alt="User Avatar"
                                        className={`w-10 h-10 rounded-full object-cover border ${styles.avatarBorder}`}
                                    />
                                    <p className={`font-semibold ${styles.reviewAuthor}`}>
                                        {review.user?.name || "Anonymous"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 text-sm opacity-70">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-yellow-400">{'⭐️'.repeat(review.rating)}</span>
                                    </div>
                                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <p className={styles.subText}>{review.content}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <Footer />
        </div>
    );
}
