import React, { useState } from 'react';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function CartIcon() {
    const { cartItems, removeFromCart } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const bgMain =
        theme === 'dark'
            ? 'bg-[#1e1e1e]/90 text-white border-gray-700'
            : 'bg-white/80 text-gray-900 border-white/40';

    const divider =
        theme === 'dark' ? 'border-gray-700' : 'border-gray-300';

    const subText =
        theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

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
                        className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[380px] max-h-[90vh] shadow-2xl rounded-t-3xl sm:rounded-3xl backdrop-blur-2xl border z-50 overflow-hidden ${bgMain}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={`flex items-center justify-between p-4 border-b ${divider}`}>
                            <h2 className="text-lg font-semibold text-[#c97476]">Your Cart</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-red-500 transition"
                                aria-label="Close cart"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <div className="p-4 overflow-y-auto max-h-[65vh]">
                            {cartItems.length === 0 ? (
                                <p className={`text-center ${subText}`}>Your cart is empty</p>
                            ) : (
                                <ul className="space-y-3">
                                    {cartItems.map((item) => (
                                        <li key={item.id} className="flex items-start gap-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 rounded-xl object-cover border border-pink-200 shadow"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-sm truncate">{item.name}</p>
                                                <p className={`text-xs ${subText}`}>Qty: {item.quantity}</p>
                                                <p className={`text-xs ${subText}`}>Price: {item.price} ₴</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700 font-bold text-lg"
                                                aria-label={`Remove ${item.name} from cart`}
                                            >
                                                &times;
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className={`p-4 border-t ${divider}`}>
                                <Link
                                    to="/cart"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full text-center bg-[#f59c9e] text-white font-semibold py-2 rounded-full hover:bg-[#e48c8d] transition"
                                >
                                    Go to Cart
                                </Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
