import WishlistService from "../Services/WishlistService.js";

class WishlistController {
    async getUserWishlist(req, res) {
        try {
            const products = await WishlistService.getUserWishlist(req.user.id);
            res.json(products);
        } catch (err) {
            console.error("Failed to get wishlist:", err);
            res.status(500).json({message: "Failed to load wishlist"});
        }
    }

    async addToWishlist(req, res) {
        try {
            const {productId} = req.body;
            await WishlistService.addToWishlist(req.user.id, productId);
            res.status(201).json({message: "Added to wishlist"});
        } catch (err) {
            console.error("Failed to add to wishlist:", err);
            res.status(500).json({message: "Failed to add to wishlist"});
        }
    }

    async removeFromWishlist(req, res) {
        try {
            const {productId} = req.params;
            await WishlistService.removeFromWishlist(req.user.id, parseInt(productId));
            res.json({message: "Removed from wishlist"});
        } catch (err) {
            console.error("Failed to remove from wishlist:", err);
            res.status(500).json({message: "Failed to remove from wishlist"});
        }
    }
}

export default new WishlistController();
