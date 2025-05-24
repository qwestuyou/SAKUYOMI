import { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NotificationContext = createContext();

export function useNotification() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);

    const showNotification = useCallback((message, type = "info", duration = 3000) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), duration);
    }, []);

    return (
        <NotificationContext.Provider value={showNotification}>
            {children}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        key="notification"
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 
            px-6 py-3 rounded-xl shadow-2xl text-white text-center text-lg font-semibold 
            ${
                            notification.type === "error"
                                ? "bg-[#f26d7d]"
                                : notification.type === "success"
                                    ? "bg-[#f59c9e]"
                                    : "bg-[#fbb5c1]"
                        }`}
                        style={{
                            boxShadow: "0 0 20px rgba(245, 156, 158, 0.5)",
                            backdropFilter: "blur(6px)",
                            border: "1px solid rgba(255, 255, 255, 0.25)",
                            maxWidth: "90%",
                            width: "max-content",
                        }}
                    >
                        {notification.message}
                    </motion.div>
                )}
            </AnimatePresence>
        </NotificationContext.Provider>
    );
}
