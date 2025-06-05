import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Wishlist from "../components/Wishlist";
import UserReviews from "../components/UserReviews";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNotification } from "../components/Notification";
import { useNavigate, useLocation } from "react-router-dom";
import EditProfileModal from "../components/EditProfileModal";
import UserOrders from "../components/UserOrders";

export default function Profile() {
    const { user, setUser, logout } = useAuth();
    const { themeStyles } = useTheme();
    const notify = useNotification();
    const navigate = useNavigate();
    const location = useLocation();

    const styles = themeStyles.profile;
    const [selectedTab, setSelectedTab] = useState("editProfile");
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const queryTab = new URLSearchParams(location.search).get("tab");
        if (queryTab && queryTab !== selectedTab) {
            setSelectedTab(queryTab);
        }
    }, [location.search]);

    useEffect(() => {
        if (user?.id) {
            fetch(`/api/reviews/user/${user.id}`, {
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => setReviews(data))
                .catch((err) => {
                    console.error("Error fetching user reviews:", err);
                    notify("Failed to load your reviews", "error");
                });
        }
    }, [user?.id, notify]);

    if (!user) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center min-h-screen"
            >
                <p className="text-lg font-medium">Loading profile...</p>
            </motion.div>
        );
    }

    return (
        <div className={`${styles.bg} min-h-screen font-sans`}>
            <Header />
            <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 pb-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    <button
                        className="lg:hidden fixed top-20 left-1/2 transform -translate-x-1/2 z-50 p-3 rounded-lg bg-opacity-80 backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <svg
                            className="w-6 h-6 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>

                    <AnimatePresence>
                        {(isSidebarOpen || window.innerWidth >= 1024) && (
                            <motion.nav
                                initial={{ x: -300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -300, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`${styles.card} rounded-2xl p-6 w-full max-w-xs mx-auto lg:mx-0 lg:w-72 flex flex-col space-y-6 fixed lg:sticky top-24 h-fit shadow-lg z-40 lg:z-auto bg-opacity-95 backdrop-blur-sm lg:bg-opacity-100`}
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <motion.img
                                        src={`http://localhost:5000${user.avatar || ""}`}
                                        alt="avatar"
                                        className={`w-24 h-24 rounded-full object-cover border-4 ${styles.avatarBorder} shadow-lg`}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <div className="text-center space-y-1">
                                        <p className={`font-semibold text-xl ${styles.name} truncate max-w-[220px]`}>{user.name}</p>
                                        <p className="text-sm text-gray-400 truncate max-w-[220px]">{user.email}</p>
                                        <p className="text-sm text-gray-400 truncate max-w-[220px]">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    {["editProfile", "orders", "wishlist", "reviews"].map((tab) => (
                                        <motion.button
                                            key={tab}
                                            onClick={() => {
                                                setSelectedTab(tab);
                                                setIsSidebarOpen(false); // Close sidebar on mobile after selection
                                            }}
                                            className={`text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                                                selectedTab === tab
                                                    ? `${styles.tabActive} shadow-md`
                                                    : `${styles.tabHover} dark:${styles.tabHoverDark} hover:bg-opacity-10 hover:shadow-sm`
                                            }`}
                                            whileHover={{ x: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {tab === "editProfile" ? "Edit Profile" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        </motion.button>
                                    ))}

                                    <motion.button
                                        onClick={() => {
                                            logout();
                                            navigate("/");
                                        }}
                                        className={`text-left px-4 py-3 rounded-lg font-medium ${styles.logoutBtn} mt-4 hover:bg-opacity-80 transition-all duration-300`}
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Sign Out
                                    </motion.button>
                                </div>
                            </motion.nav>
                        )}
                    </AnimatePresence>

                    <motion.main
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={`flex-1 rounded-2xl p-8 ${styles.card} shadow-xl mt-16 lg:mt-0`}
                    >
                        <AnimatePresence mode="wait">
                            {selectedTab === "editProfile" && (
                                <motion.div
                                    key="editProfile"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <h2 className={`text-3xl font-bold ${styles.name}`}>Edit Profile</h2>
                                    <div className="space-y-4">
                                        <p className="text-lg">
                                            <span className={`font-semibold ${styles.name}`}>Name:</span> {user.name}
                                        </p>
                                        <p className="text-lg">
                                            <span className={`font-semibold ${styles.name}`}>Email:</span> {user.email}
                                        </p>
                                        <p className="text-lg">
                                            <span className={`font-semibold ${styles.name}`}>Member since:</span>{" "}
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </p>
                                        <motion.button
                                            onClick={() => setIsModalOpen(true)}
                                            className={`mt-4 px-6 py-2.5 rounded-xl shadow-md ${styles.saveBtn} font-medium hover:bg-opacity-90 transition-all duration-300`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Edit Info
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {selectedTab === "orders" && (
                                <motion.div
                                    key="orders"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className={`text-3xl font-bold mb-6 ${styles.name}`}>Orders</h2>
                                    <UserOrders cardStyle={styles.sectionBg} />
                                </motion.div>
                            )}

                            {selectedTab === "wishlist" && (
                                <motion.div
                                    key="wishlist"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Wishlist sectionBg={styles.sectionBg} />
                                </motion.div>
                            )}

                            {selectedTab === "reviews" && (
                                <motion.div
                                    key="reviews"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className={`text-3xl font-bold mb-6 ${styles.name}`}>Reviews</h2>
                                    <UserReviews reviews={reviews} reviewCardBg={styles.reviewCard} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.main>
                </div>
            </div>

            <EditProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <Footer />
        </div>
    );
}