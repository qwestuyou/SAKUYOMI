import CartService from "../Services/CartService.js";

const CartController = {
    async show(req, res) {
        try {
            const cart = await CartService.getCart(req.user.id);
            res.json(cart || {items: []});
        } catch (error) {
            res.status(500).json({error: "Failed to fetch cart", message: error.message});
        }
    },

    async add(req, res) {
        try {
            const {productId, quantity} = req.body;
            const item = await CartService.addToCart(req.user.id, productId, quantity);
            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({error: "Failed to add to cart", message: error.message});
        }
    },

    async remove(req, res) {
        try {
            const {productId} = req.params;
            await CartService.removeFromCart(req.user.id, Number(productId));
            res.status(204).end();
        } catch (error) {
            res.status(500).json({error: "Failed to remove from cart", message: error.message});
        }
    },

    async update(req, res) {
        try {
            const {productId, quantity} = req.body;
            await CartService.updateQuantity(req.user.id, productId, quantity);
            res.status(200).json({success: true});
        } catch (error) {
            res.status(500).json({error: "Failed to update cart", message: error.message});
        }
    },

    async clear(req, res) {
        try {
            await CartService.clearCart(req.user.id);
            res.status(200).json({success: true});
        } catch (error) {
            res.status(500).json({error: "Failed to clear cart", message: error.message});
        }
    },

    async checkout(req, res) {
        try {
            const order = await CartService.checkout(req.user.id);
            res.status(201).json({success: true, order});
        } catch (error) {
            res.status(400).json({error: "Failed to checkout", message: error.message});
        }
    },
};

export default CartController;
