import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({children}) {
    const [cartItems, setCartItems] = useState([]);

    const token = localStorage.getItem("access_token");

    const api = axios.create({
        baseURL: "/api/cart",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const fetchCart = async () => {
        try {
            const res = await api.get("/");
            setCartItems(res.data.items || []);
        } catch (err) {
            console.error("Failed to load cart", err);
        }
    };

    useEffect(() => {
        if (token) fetchCart();
    }, [token]);

    const addToCart = async (product, quantity = 1) => {
        try {
            await api.post("/", {productId: product.id, quantity});
            await fetchCart();
        } catch (err) {
            console.error("Failed to add to cart", err);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await api.delete(`/${productId}`);
            await fetchCart();
        } catch (err) {
            console.error("Failed to remove item", err);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            await api.put("/", {productId, quantity});
            await fetchCart();
        } catch (err) {
            console.error("❌ Failed to update quantity", err);
        }
    };

    const clearCart = async () => {
        try {
            await api.delete("/");
            setCartItems([]);
        } catch (err) {
            console.error("❌ Failed to clear cart", err);
        }
    };

    return (
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, updateQuantity, clearCart}}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
