import ReviewService from "../Services/ReviewService.js";

const ReviewController = {
    async getProductReviews(req, res) {
        try {
            const productId = parseInt(req.params.productId);
            const reviews = await ReviewService.getByProduct(productId);
            res.json(reviews);
        } catch (error) {
            console.error("GET /reviews/:productId Error:", error);
            res.status(500).json({ error: "Failed to fetch reviews", message: error.message });
        }
    },

    async getUserReviews(req, res) {
        try {
            const userId = parseInt(req.params.id);
            const reviews = await ReviewService.getByUser(userId);
            res.json(reviews);
        } catch (error) {
            console.error("GET /reviews/user/:id Error:", error);
            res.status(500).json({ error: "Failed to fetch user reviews", message: error.message });
        }
    },

    async createReview(req, res) {
        try {
            const { productId, content, rating, parentId } = req.body;
            const newReview = await ReviewService.create({
                userId: req.user.id,
                productId,
                content,
                rating,
                parentId,
            });
            res.status(201).json(newReview);
        } catch (error) {
            console.error("POST /reviews Error:", error);
            res.status(500).json({ error: "Failed to create review", message: error.message });
        }
    },

    async deleteReview(req, res) {
        const reviewId = parseInt(req.params.id);

        try {
            const review = await ReviewService.getById(reviewId);
            if (!review) return res.status(404).json({ message: "Review not found" });

            if (review.userId !== req.user.id && !req.user.isAdmin) {
                return res.status(403).json({ message: "Forbidden" });
            }

            await ReviewService.delete(reviewId);
            return res.json({ message: "Review deleted" });
        } catch (error) {
            console.error("DELETE /reviews/:id Error:", error);
            return res.status(500).json({ message: "Failed to delete review", error: error.message });
        }
    },
};

export default ReviewController;
