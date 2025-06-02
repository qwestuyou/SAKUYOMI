import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useNotification } from "../components/Notification";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { themeStyles } = useTheme();
    const notify = useNotification();
    const formStyles = themeStyles.form;

    const [formData, setFormData] = useState(null);

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setFormData({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    image: data.image,
                    categoryId: data.categoryId,
                    anime: data.anime || "",
                    size: data.size || "",
                    material: data.material || "",
                    language: data.language || "",
                    brand: data.brand || "",
                    productType: data.productType || "",
                    rating: data.rating || "",
                    inStock: data.inStock,
                    color: data.color || "",
                    gender: data.gender || "",
                    ageRating: data.ageRating || "",
                    features: data.features || "",
                });
            })
            .catch(() => notify("Failed to load product", "error"));
    }, [id]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    categoryId: parseInt(formData.categoryId),
                    rating: formData.rating ? parseFloat(formData.rating) : null,
                    inStock: !!formData.inStock,
                }),
            });

            if (res.ok) {
                notify("Product updated successfully!", "success");
                navigate(`/product/${id}`);
            } else {
                notify("Failed to update product", "error");
            }
        } catch (err) {
            console.error(err);
            notify("An error occurred while updating the product", "error");
        }
    };

    if (!formData) {
        return <div className={`${themeStyles.textMain} text-center p-10`}>Loading...</div>;
    }

    return (
        <div className={`${themeStyles.pageBg} min-h-screen py-16 px-4`}>
            <motion.div
                className={`max-w-3xl mx-auto p-8 rounded-3xl border shadow-2xl ${themeStyles.modalBg} ${themeStyles.modalBorder} backdrop-blur-xl`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className={`text-3xl font-bold mb-6 text-center ${themeStyles.headingColor}`}>
                    Edit Product
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { name: "name", placeholder: "Name", type: "text" },
                        { name: "description", placeholder: "Description", type: "textarea" },
                        { name: "price", placeholder: "Price", type: "number" },
                        { name: "image", placeholder: "Image URL", type: "text" },
                        { name: "anime", placeholder: "Anime", type: "text" },
                        { name: "size", placeholder: "Size (S, M, L...)", type: "text" },
                        { name: "material", placeholder: "Material", type: "text" },
                        { name: "brand", placeholder: "Brand", type: "text" },
                        { name: "color", placeholder: "Color", type: "text" },
                        { name: "features", placeholder: "Features (comma-separated)", type: "text" },
                    ].map((field) =>
                        field.type === "textarea" ? (
                            <textarea
                                key={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                className={`p-3 rounded-xl ${formStyles.inputBg} ${formStyles.inputBorder} focus:outline-none transition`}
                                rows={3}
                            />
                        ) : (
                            <input
                                key={field.name}
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                className={`p-3 rounded-xl ${formStyles.inputBg} ${formStyles.inputBorder} focus:outline-none transition`}
                            />
                        )
                    )}

                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className={`p-3 rounded-xl ${formStyles.inputBg} ${formStyles.inputBorder} focus:outline-none transition`}
                        required
                    >
                        <option value="">Choose category</option>
                        <option value="1">Manga</option>
                        <option value="2">Figure</option>
                        <option value="3">Poster</option>
                        <option value="4">Badge</option>
                        <option value="5">Clothing</option>
                        <option value="6">Accessories</option>
                        <option value="7">Funko Pop! Anime</option>
                        <option value="8">Stationery</option>
                    </select>

                    <select
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className={`p-3 rounded-xl ${formStyles.inputBg} ${formStyles.inputBorder}`}
                    >
                        <option value="">Language</option>
                        <option value="Japanese">Japanese</option>
                        <option value="English">English</option>
                        <option value="Ukrainian">Ukrainian</option>
                    </select>

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={`p-3 rounded-xl ${formStyles.inputBg} ${formStyles.inputBorder}`}
                    >
                        <option value="">Gender (for clothing)</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="unisex">Unisex</option>
                    </select>

                    <select
                        name="ageRating"
                        value={formData.ageRating}
                        onChange={handleChange}
                        className={`p-3 rounded-xl ${formStyles.inputBg} ${formStyles.inputBorder}`}
                    >
                        <option value="">Age Rating</option>
                        <option value="0+">0+</option>
                        <option value="13+">13+</option>
                        <option value="18+">18+</option>
                    </select>

                    <label className="flex items-center gap-3 col-span-2 mt-2">
                        <input
                            type="checkbox"
                            name="inStock"
                            checked={formData.inStock}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, inStock: e.target.checked }))
                            }
                            className="accent-[#f59c9e] w-5 h-5"
                        />
                        <span className={`${themeStyles.textMain}`}>In Stock</span>
                    </label>

                    <motion.button
                        type="submit"
                        className={`col-span-2 mt-4 py-3 px-6 rounded-full font-bold shadow-md transition-all text-white bg-[#f59c9e] hover:bg-[#e9898c]`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Save Changes
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
