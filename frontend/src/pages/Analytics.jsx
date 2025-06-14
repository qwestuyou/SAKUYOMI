import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const COLORS = ["#f59c9e", "#84cc16", "#38bdf8", "#facc15", "#c084fc", "#ec4899", "#34d399", "#f97316"];

const endpointMap = [
    { url: "/api/analytics/product-category-distribution", key: "categoryData" },
    { url: "/api/analytics/average-rating-by-category", key: "ratingData", withParams: true },
    { url: "/api/analytics/average-price-by-category", key: "priceData" },
    { url: "/api/analytics/top-products-by-orders", key: "topProducts" },
    { url: "/api/analytics/revenue-by-category", key: "revenueData" },
    { url: "/api/analytics/sales-over-time", key: "salesData", withParams: true },
    { url: "/api/analytics/cart-to-order-funnel", key: "funnelData" },
    { url: "/api/analytics/price-range-distribution", key: "priceRange" },
];

export default function AnalyticsPage() {
    const { themeStyles } = useTheme();
    const { user, loading } = useAuth();
    const [data, setData] = useState({});
    const [filters, setFilters] = useState({ categoryId: "", startDate: "", endDate: "" });

    useEffect(() => {
        if (!user?.isAdmin) return;

        const fetchAll = async () => {
            const results = {};
            for (const { url, key, withParams } of endpointMap) {
                let fetchUrl = url;
                if (withParams) {
                    const params = new URLSearchParams();
                    if (filters.categoryId) params.append("categoryId", filters.categoryId);
                    if (filters.startDate && filters.endDate) {
                        params.append("startDate", filters.startDate);
                        params.append("endDate", filters.endDate);
                    }
                    fetchUrl += `?${params.toString()}`;
                }
                const res = await fetch(fetchUrl);
                const json = await res.json();
                results[key] = json;
            }
            setData(results);
        };
        fetchAll();
    }, [filters, user]);

    if (!loading && !user?.isAdmin) return <Navigate to="/" replace />;

    return (
        <div className={`${themeStyles.pageBg} min-h-screen flex flex-col`}>
            <main className="flex-grow container mx-auto p-6">
                <motion.h1
                    className={`text-4xl font-bold text-center mb-10 ${themeStyles.headingColor}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Admin Dashboard Analytics
                </motion.h1>

                <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                    <select
                        className="p-3 rounded-xl border"
                        value={filters.categoryId}
                        onChange={(e) => setFilters((prev) => ({ ...prev, categoryId: e.target.value }))}
                    >
                        <option value="">All Categories</option>
                        <option value="1">Manga</option>
                        <option value="2">Figure</option>
                        <option value="3">Poster</option>
                        <option value="4">Badge</option>
                        <option value="5">Clothing</option>
                        <option value="6">Accessories</option>
                        <option value="7">Funko Pop! Anime</option>
                        <option value="8">Stationery</option>
                    </select>

                    <input
                        type="date"
                        className="p-3 rounded-xl border"
                        value={filters.startDate}
                        onChange={(e) => setFilters((prev) => ({ ...prev, startDate: e.target.value }))}
                    />
                    <input
                        type="date"
                        className="p-3 rounded-xl border"
                        value={filters.endDate}
                        onChange={(e) => setFilters((prev) => ({ ...prev, endDate: e.target.value }))}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <ChartCard title="Products by Category">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie data={data.categoryData} dataKey="productCount" nameKey="category" outerRadius={100}>
                                    {data.categoryData?.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Average Rating by Category">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={data.ratingData}>
                                <XAxis dataKey="category" />
                                <YAxis domain={[0, 5]} />
                                <Tooltip />
                                <Bar dataKey="averageRating">
                                    {data.ratingData?.map((_, index) => (
                                        <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Average Price by Category">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={data.priceData}>
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="averagePrice" fill="#38bdf8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Top Products by Orders">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={data.topProducts} layout="vertical">
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" width={120} />
                                <Tooltip />
                                <Bar dataKey="orderCount" fill="#f97316" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Revenue by Category">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={data.revenueData}>
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="revenue" fill="#84cc16" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Sales Over Time">
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={data.salesData}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <Line type="monotone" dataKey="revenue" stroke="#c084fc" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Cart to Order Funnel">
                        <div className="text-lg px-4">
                            <p>Items in Cart: <strong>{data.funnelData?.cartItems}</strong></p>
                            <p>Items Ordered: <strong>{data.funnelData?.orderItems}</strong></p>
                        </div>
                    </ChartCard>

                    <ChartCard title="Price Range Distribution">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={data.priceRange}>
                                <XAxis dataKey="range" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#ec4899" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
            </main>
        </div>
    );
}

function ChartCard({ title, children }) {
    const { themeStyles } = useTheme();
    return (
        <motion.div
            className={`p-6 rounded-2xl shadow-lg ${themeStyles.modalBg} ${themeStyles.modalBorder}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h3 className={`text-xl font-semibold mb-4 ${themeStyles.headingColor}`}>{title}</h3>
            {children}
        </motion.div>
    );
}
