import express from "express";
import WishlistController from "../../App/Controllers/WishlistController.js";
import AuthMiddleware from "../../App/Middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/", AuthMiddleware, WishlistController.getUserWishlist);
router.post("/", AuthMiddleware, WishlistController.addToWishlist);
router.delete("/:productId", AuthMiddleware, WishlistController.removeFromWishlist);

export default router;
