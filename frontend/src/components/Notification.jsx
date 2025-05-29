import { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const NotificationContext = createContext();

export function useNotification() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);
    const { themeStyles } = useTheme();

    const showNotification = useCallback((message, type = "info", duration = 3000) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), duration);
    }, []);

    const typeClass = {
        info: themeStyles.notification.info,
        success: themeStyles.notification.success,
        error: themeStyles.notification.error
    };

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
                            ${themeStyles.notification.base} 
                            ${themeStyles.notification.backdrop} 
                            ${typeClass[notification.type]}`}
                        style={{
                            boxShadow: themeStyles.notification.shadow,
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
