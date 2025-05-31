import express from "express";
import AuthMiddleware from "../../App/Middlewares/AuthMiddleware.js";
import ReviewController from "../../App/Controllers/ReviewController.js";

const router = express.Router();

router.get("/:productId", ReviewController.getProductReviews);
router.get("/user/:id", ReviewController.getUserReviews);
router.post("/", AuthMiddleware, ReviewController.createReview);

export default router;
