import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useNotification} from "../components/Notification";
import {useTheme} from "../context/ThemeContext";
import {motion, AnimatePresence} from "framer-motion";

export default function CheckoutPage() {
    const {id: orderId} = useParams();
    const notify = useNotification();
    const navigate = useNavigate();
    const {themeStyles} = useTheme();
    const styles = themeStyles.form;
    const buttonStyle = themeStyles.cart.cartButton;

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        street: "",
        city: "",
        postalCode: "",
        phone: "",
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const res = await fetch(`/api/orders/${orderId}`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                const data = await res.json();
                setOrder(data);
            } catch (err) {
                notify("Failed to load order", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, notify]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPaymentModal(true);
    };

    const handleFinalPayment = async () => {
        try {
            const token = localStorage.getItem("access_token");
            await fetch(`/api/orders/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({...formData, status: "paid"}),
            });

            notify("Payment successful!", "success");
            navigate("/profile");
        } catch (err) {
            notify("Payment failed", "error");
        }
    };

    if (loading) {
        return (
            <motion.div
                className="p-6 text-center text-gray-500 text-sm font-medium"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3}}
            >
                Loading checkout...
            </motion.div>
        );
    }

    if (!order) {
        return (
            <motion.div
                className="p-6 text-center text-red-500 text-sm font-medium"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3}}
            >
                Order not found
            </motion.div>
        );
    }

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-[#fceaeb] via-[#ffe3e3] to-[#ffeaea] py-10 px-4"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.4}}
        >
            <motion.div
                className="max-w-2xl mx-auto p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-[#f59c9e]/30 relative"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4, ease: "easeOut"}}
            >
                <h1 className="text-3xl font-bold mb-8 text-center text-[#e26d6f] tracking-tight">
                    🚚 Shipping Info — Order #{order.id}
                </h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className={`${styles.label} block mb-2 font-semibold text-gray-700`}>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className={`${styles.input} w-full border rounded-lg p-3 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-[#f59c9e] focus:border-transparent transition-all duration-300`}
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div>
                        <label className={`${styles.label} block mb-2 font-semibold text-gray-700`}>Street</label>
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            required
                            className={`${styles.input} w-full border rounded-lg p-3 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-[#f59c9e] focus:border-transparent transition-all duration-300`}
                            placeholder="Enter your street address"
                        />
                    </div>
                    <div>
                        <label className={`${styles.label} block mb-2 font-semibold text-gray-700`}>City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className={`${styles.input} w-full border rounded-lg p-3 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-[#f59c9e] focus:border-transparent transition-all duration-300`}
                            placeholder="Enter your city"
                        />
                    </div>
                    <div>
                        <label className={`${styles.label} block mb-2 font-semibold text-gray-700`}>Postal Code</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            required
                            className={`${styles.input} w-full border rounded-lg p-3 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-[#f59c9e] focus:border-transparent transition-all duration-300`}
                            placeholder="Enter your postal code"
                        />
                    </div>
                    <div>
                        <label className={`${styles.label} block mb-2 font-semibold text-gray-700`}>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className={`${styles.input} w-full border rounded-lg p-3 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-[#f59c9e] focus:border-transparent transition-all duration-300`}
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        className={`${buttonStyle} w-full text-center py-3 bg-[#f59c9e] text-white rounded-xl shadow-md hover:bg-[#e88b8d] transition-all duration-300 text-sm font-semibold`}
                        whileHover={{scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.2)"}}
                        whileTap={{scale: 0.95}}
                    >
                        Proceed to Payment
                    </motion.button>
                </form>

                <AnimatePresence>
                    {showPaymentModal && (
                        <>
                            {/* BACKDROP */}
                            <motion.div
                                className="fixed inset-0 bg-black/50 z-40"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.3}}
                            />

                            {/* MODAL */}
                            <motion.div
                                initial={{scale: 0.9, opacity: 0, y: 20}}
                                animate={{scale: 1, opacity: 1, y: 0}}
                                exit={{scale: 0.9, opacity: 0, y: 20}}
                                transition={{duration: 0.3, ease: "easeOut"}}
                                className="fixed z-50 inset-0 flex items-center justify-center"
                            >
                                <div className="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl">
                                    <h2 className="text-lg font-semibold mb-5 text-gray-800 text-center">
                                        Enter Card Details
                                    </h2>

                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Card Number"
                                            className="w-full border rounded-lg p-3 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-[#f59c9e] focus:border-transparent transition-all duration-300"
                                            required
                                        />
                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                placeholder="Expiry Date"
                                                className="w-full border rounded-lg p-3 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-[#f59c9e] focus:border-transparent transition-all duration-300"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                className="w-full border rounded-lg p-3 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-[#f59c9e] focus:border-transparent transition-all duration-300"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-6 justify-end">
                                        <button
                                            onClick={() => setShowPaymentModal(false)}
                                            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300 text-sm font-semibold"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleFinalPayment}
                                            className="px-5 py-2 bg-[#f59c9e] text-white rounded-lg shadow-md hover:bg-[#e88b8d] transition-all duration-300 text-sm font-semibold"
                                        >
                                            Pay Now
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}
