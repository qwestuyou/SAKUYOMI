import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const navigate = useNavigate();

  // Завантаження даних про товар
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        fetchRelatedProducts(data.categoryId, data.id);
      });
  }, [id]);

  // Завантаження відгуків
  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/api/reviews/${id}`)
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [id]);

  // Завантаження схожих товарів
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

  // Додавання нового відгуку
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
    return <div className="text-center p-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#fff6f4] text-gray-800">
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-block mb-6 text-gray-800 px-6 py-3 rounded-full transition cursor-pointer"
        >
          ← Back
        </button>
      </div>
      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">
        <img src={product.image} alt={product.name} className="rounded-2xl w-full md:w-1/2 h-[500px] object-cover" />
        
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-[#f59c9e] mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl text-[#c97476] font-bold mb-6">{product.price} ₴</p>
          
          <button className="bg-[#f59c9e] text-white px-6 py-3 rounded-xl hover:bg-[#e0bcbc] transition">
            Add to Cart
          </button>
        </div>
      </div>
        {/* Related Products */}
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(rp => (
                <div key={rp.id} className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
                <img src={rp.image} alt={rp.name} className="rounded-xl mb-3 w-full h-40 object-cover" />
                <h3 className="text-lg font-semibold">{rp.name}</h3>
                <p className="text-[#f59c9e] font-bold">{rp.price} ₴</p>
                </div>
            ))}
            </div>
        </div>

      {/* Reviews */}
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-[#f59c9e]">Reviews</h2>

        {/* Форма для додавання відгуку */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6 bg-white p-4 rounded-xl shadow">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded resize-none"
            placeholder="Write your review..."
            rows="3"
            required
          />
          <div className="flex items-center justify-between">
            <select
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="border rounded p-2"
            >
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>{num} ⭐</option>
              ))}
            </select>
            <button type="submit" className="bg-[#f59c9e] text-white px-6 py-2 rounded hover:bg-[#e0bcbc] transition">
              Add Review
            </button>
          </div>
        </form>

        {/* Список відгуків */}
        <ul className="list-none space-y-4">
          {reviews.map(review => (
            <li key={review.id} className="bg-[#feeae6] p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400">{'⭐️'.repeat(review.rating)}</span>
                <span className="text-sm text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="font-semibold text-[#c97476]">{review.user?.name || 'Anonymous'}</p>
                <p>{review.content}</p>
            </li>
            ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
