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
            const { productId, content, rating } = req.body;
            const newReview = await ReviewService.create({
                userId: req.user.id,
                productId,
                content,
                rating,
            });
            res.status(201).json(newReview);
        } catch (error) {
            console.error("POST /reviews Error:", error);
            res.status(500).json({ error: "Failed to create review", message: error.message });
        }
    },
};

export default ReviewController;
