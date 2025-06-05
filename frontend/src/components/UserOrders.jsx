import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";
import {useTheme} from "../context/ThemeContext";

export default function UserOrders({cardStyle}) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeOrder, setActiveOrder] = useState(null);
    const {themeStyles} = useTheme();
    const styles = themeStyles.profile;
    const modalStyles = themeStyles.modal;
    const cartStyles = themeStyles.cart;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const res = await fetch("/api/orders", {
                    headers: {Authorization: `Bearer ${token}`},
                });
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const closeModal = () => setActiveOrder(null);

    const goToCheckout = (orderId) => {
        navigate(`/checkout/${orderId}`);
    };

    return (
        <div className="space-y-6 mt-4">
            {loading && <p className="opacity-70">Loading orders...</p>}

            {!loading && orders.length === 0 && (
                <p className="italic text-sm opacity-80">You don’t have any orders yet</p>
            )}

            {orders.map(order => (
                <button
                    key={order.id}
                    onClick={() => setActiveOrder(order)}
                    className={`rounded-xl border shadow-sm p-4 text-left w-full transition ${cardStyle} ${styles.tabHover}`}
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold text-md flex items-center gap-2">
                                🧾 Order #{order.id}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
                            </p>
                            <span
                                className={`inline-block text-xs font-semibold mt-1 px-2 py-0.5 rounded-full ${
                                    order.status === "paid"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                                {order.status === "paid" ? "Paid" : "Waiting for payment"}
                            </span>
                        </div>
                        <div className="text-sm font-semibold text-pink-500">
                            ₴ {order.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0).toFixed(2)}
                        </div>
                    </div>
                </button>
            ))}

            {/* MODAL */}
            <AnimatePresence>
                {activeOrder && (
                    <motion.div
                        className={modalStyles.overlay}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div
                            className={`${modalStyles.content} max-w-2xl max-h-[80vh] overflow-y-auto`}
                            initial={{scale: 0.9, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.9, opacity: 0}}
                            transition={{duration: 0.2}}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className={`${modalStyles.title} !text-left`}>
                                    Order #{activeOrder.id}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className={`${cartStyles.closeBtn} text-xl font-bold`}
                                >
                                    &times;
                                </button>
                            </div>

                            <p
                                className={`text-sm font-medium mb-4 px-3 py-1 w-fit rounded-full ${
                                    activeOrder.status === "paid"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                                {activeOrder.status === "paid" ? "Paid" : "Waiting for payment"}
                            </p>

                            <div className="space-y-4">
                                {activeOrder.items.map(item => (
                                    <div
                                        key={item.id}
                                        className={`${styles.sectionBg} flex items-center gap-4 p-3 rounded-xl transition`}
                                    >
                                        <Link to={`/product/${item.product.id}`}>
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-16 h-16 rounded-lg object-cover border shadow"
                                            />
                                        </Link>
                                        <div className="flex-1">
                                            <Link
                                                to={`/product/${item.product.id}`}
                                                className="text-sm font-semibold hover:underline"
                                            >
                                                {item.product.name}
                                            </Link>
                                            <p className={`text-xs ${cartStyles.subText} mt-1`}>
                                                Quantity: {item.quantity} × {item.product.price} ₴
                                            </p>
                                        </div>
                                        <div className="text-sm font-semibold">
                                            {(item.quantity * item.product.price).toFixed(2)} ₴
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {activeOrder.status === "paid" && activeOrder.fullName && (
                                <motion.div
                                    className="mt-6 text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-200"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.3}}
                                >
                                    <p className="font-semibold mb-2 text-gray-800">Shipping address:</p>
                                    <p>{activeOrder.fullName}</p>
                                    <p>{activeOrder.street}, {activeOrder.city}</p>
                                    <p>{activeOrder.postalCode}</p>
                                    <p>{activeOrder.phone}</p>
                                </motion.div>
                            )}


                            <div className="border-t pt-4 mt-4 flex justify-between items-center">
                                <div className="text-lg font-semibold">
                                    Total: {activeOrder.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0).toFixed(2)} ₴
                                </div>
                                {activeOrder.status !== "paid" && (
                                    <button
                                        onClick={() => goToCheckout(activeOrder.id)}
                                        className={`${cartStyles.cartButton} px-5 py-2 rounded-full shadow transition text-center`}
                                    >
                                        Proceed to Checkout
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
