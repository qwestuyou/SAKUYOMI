import React from 'react';
import { useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import WelcomeBanner from "../components/WelcomeBanner";
import CategoriesSection from "../components/CategoriesSection";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const name = params.get("name");

    if (token && name) {
      localStorage.setItem("token", token);
      login({ name }, token);
      navigate("/");
    }
  }, [location.search]);

  return (
    <div>
      <Header />
      <WelcomeBanner />
      <CategoriesSection />
      <Footer />
    </div>
  );
}

