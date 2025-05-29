import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function UserReviews({ reviews, reviewCardBg }) {
  if (!reviews || reviews.length === 0) {
    return <p className="italic text-sm opacity-80">You haven't left any reviews yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {reviews.map((review) => (
        <li
          key={review.id}
          className={`p-4 rounded-xl border shadow-sm hover:shadow-md transition duration-300 ${reviewCardBg}`}
        >
          <div className="flex justify-between items-center mb-2">
            <Link
              to={`/product/${review.product.id}`}
              className="text-[#f59c9e] font-semibold hover:underline"
            >
              {review.product.name}
            </Link>
            <span className="text-sm opacity-50">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={14}
                className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
