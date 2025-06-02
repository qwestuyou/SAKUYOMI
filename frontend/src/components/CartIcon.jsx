import React, { useState } from 'react';
import { FaShoppingCart, FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function CartIcon() {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const { themeStyles } = useTheme();
    const cartStyles = themeStyles.cart;

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            updateQuantity(item.product.id, item.quantity - 1);
        } else {
            removeFromCart(item.product.id);
        }
    };

    const handleIncrease = (item) => {
        updateQuantity(item.product.id, item.quantity + 1);
    };

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-[#f59c9e] text-white p-4 rounded-full shadow-xl z-50 hover:scale-110 transition-transform duration-300"
                whileTap={{ scale: 0.95 }}
                aria-label="Open cart"
            >
                <FaShoppingCart size={24} />
                {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs rounded-full px-1.5 font-bold">
                        {totalItems}
                    </span>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[380px] max-h-[90vh] shadow-2xl rounded-t-3xl sm:rounded-3xl backdrop-blur-2xl border z-50 overflow-hidden ${cartStyles.bgMain}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={`flex items-center justify-between p-4 border-b ${cartStyles.divider}`}>
                            <h2 className="text-lg font-semibold text-[#c97476]">Your Cart</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className={`${cartStyles.closeBtn} transition`}
                                aria-label="Close cart"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <div className="p-4 overflow-y-auto max-h-[65vh]">
                            {cartItems.length === 0 ? (
                                <p className={`text-center ${cartStyles.subText}`}>Your cart is empty</p>
                            ) : (
                                <ul className="space-y-4">
                                    {cartItems.map((item) => (
                                        <li key={item.id} className="flex gap-4 items-center">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-16 h-16 rounded-xl object-cover border border-pink-200 shadow"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-sm truncate">{item.product.name}</p>
                                                <p className={`text-xs ${cartStyles.subText}`}>
                                                    Price: {item.product.price} ₴
                                                </p>

                                                <div className="flex items-center gap-2 mt-1">
                                                    <button
                                                        onClick={() => handleDecrease(item)}
                                                        className="px-2 py-1 rounded-full bg-pink-100 hover:bg-pink-200 text-sm"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <FaMinus size={10} />
                                                    </button>
                                                    <span className="text-sm">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleIncrease(item)}
                                                        className="px-2 py-1 rounded-full bg-pink-100 hover:bg-pink-200 text-sm"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <FaPlus size={10} />
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className={`${cartStyles.removeBtn} font-bold text-lg`}
                                                aria-label={`Remove ${item.product.name} from cart`}
                                            >
                                                &times;
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className={`p-4 border-t ${cartStyles.divider}`}>
                                <div className="flex justify-between items-center mb-2 text-sm font-medium">
                                    <span>Total:</span>
                                    <span>{totalPrice.toFixed(2)} ₴</span>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        to="/cart"
                                        onClick={() => setIsOpen(false)}
                                        className={`flex-1 text-center ${cartStyles.cartButton} font-semibold py-2 rounded-full transition`}
                                    >
                                        Go to Cart
                                    </Link>
                                    <button
                                        onClick={() => clearCart()}
                                        className="px-4 py-2 text-sm rounded-full bg-red-100 hover:bg-red-200 text-red-600 font-semibold transition"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
