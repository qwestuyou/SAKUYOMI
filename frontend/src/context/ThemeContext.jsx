import { createContext, useContext, useEffect, useState } from "react";
import { themeConfig, getThemeStyles } from "./theme";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const themeStyles = getThemeStyles(theme);

    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () =>
        setTheme((prev) => (prev === "light" ? "dark" : "light"));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);