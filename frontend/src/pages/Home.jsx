import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WelcomeBanner from "../components/WelcomeBanner";
import CategoriesSection from "../components/CategoriesSection";
import { useAuth } from "../context/AuthContext";

export default function Home() {
    const { login } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const name = params.get("name");

        if (token && name) {
            login({ name });
            navigate("/", { replace: true });
        }
    }, [location.search]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <WelcomeBanner />
                <CategoriesSection />
            </main>
            <Footer />
        </div>
    );
}
