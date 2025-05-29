import React, {useState, useEffect} from "react";
import {FaStar} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useTheme} from "../context/ThemeContext";

export default function UserReviews({reviews}) {
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 12;

    const {theme, themeStyles} = useTheme();
    const styles = themeStyles.reviews;

    useEffect(() => {
        setCurrentPage(1);
    }, [reviews]);

    if (!reviews || reviews.length === 0) {
        return <p className="italic text-sm opacity-80">You haven't left any reviews yet.</p>;
    }

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    return (
        <div>
            <ul className="space-y-4">
                {currentReviews.map((review) => (
                    <li
                        key={review.id}
                        className={`p-4 rounded-xl border shadow-sm hover:shadow-md transition duration-300 ${styles.cardBg} ${styles.hoverBg}`}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <Link
                                to={`/product/${review.product.id}`}
                                className={`${styles.link} font-semibold hover:underline`}
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
                                    className={i < review.rating ? styles.starActive : styles.starInactive}
                                />
                            ))}
                        </div>
                        <p>{review.content}</p>
                    </li>
                ))}
            </ul>

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
                    {Array.from({length: totalPages}, (_, index) => index + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                                currentPage === page
                                    ? styles.pagination.active
                                    : styles.hoverBg
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
        </div>
    );
}
