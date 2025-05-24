import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { FaPen, FaSignOutAlt, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, setUser, logout } = useAuth();
  const { theme } = useTheme();
  const [preview, setPreview] = useState(user?.avatar || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:5000/api/reviews/user/${user.id}`)
          .then((res) => res.json())
          .then((data) => setReviews(data))
          .catch((err) => console.error("Error fetching user reviews:", err));
    }
  }, [user?.id]);

  if (!user) {
    return (
        <div className={`${theme === "dark" ? "bg-[#1a1a1a] text-white" : "bg-[#fff6f4] text-gray-800"} min-h-screen`}>
          <Header />
          <div className="text-center mt-20 text-xl text-gray-500">You are not logged in.</div>
          <Footer />
        </div>
    );
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSaveAvatar = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const res = await fetch("http://localhost:5000/api/users/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setUser((prev) => ({ ...prev, avatar: data.avatar }));
        setPreview(data.avatar);
        setSelectedFile(null);
      }
    } catch (err) {
      console.error("Error uploading avatar:", err);
    }
  };

  const cardBg = theme === "dark" ? "bg-[#2b2b2b] text-white" : "bg-white text-gray-800";
  const sectionBg = theme === "dark" ? "bg-[#333] text-gray-100" : "bg-[#fff0f2] text-gray-800";
  const reviewCardBg = theme === "dark" ? "bg-[#3a3a3a] border-[#555] text-gray-100" : "bg-[#fff6f4] border-[#fcd5d5] text-gray-700";

  return (
      <div className={`${theme === "dark" ? "bg-[#1a1a1a] text-white" : "bg-[#fff6f4] text-gray-800"} min-h-screen`}>
        <Header />
        <div className={`max-w-4xl mx-auto p-6 mt-10 rounded-3xl shadow-xl relative transition-colors duration-300 ${cardBg}`}>
          <div className="flex justify-between items-start">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-32 h-32 group">
                <img
                    src={
                      preview
                          ? preview.startsWith("blob:")
                              ? preview
                              : `http://localhost:5000${preview}`
                          : user.avatar
                              ? `http://localhost:5000${user.avatar}`
                              : "/images/default-avatar.png"
                    }
                    alt="avatar"
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#fcd5d5] shadow-lg transition-transform duration-500 group-hover:scale-105"
                />
                <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-1 right-1 bg-[#f59c9e] text-white p-2 rounded-full shadow-md hover:bg-[#e87c7e] transition duration-300 cursor-pointer"
                >
                  <FaPen size={12} />
                </label>
                <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
              </div>

              <div className="flex-1 space-y-2">
                <div className="text-lg">
                  <span className="font-semibold text-[#f59c9e]">Name:</span> {user.name}
                </div>
                <div className="text-lg">
                  <span className="font-semibold text-[#f59c9e]">Email:</span> {user.email}
                </div>
                <div className="text-lg">
                  <span className="font-semibold text-[#f59c9e]">Member since:</span>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>
                {selectedFile && (
                    <div className="flex gap-4 mt-4">
                      <button
                          onClick={handleSaveAvatar}
                          className="bg-[#f59c9e] hover:bg-[#e87c7e] text-white font-medium px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-out"
                      >
                        Save
                      </button>
                      <button
                          onClick={() => {
                            setSelectedFile(null);
                            setPreview(user.avatar || "");
                          }}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-out"
                      >
                        Cancel
                      </button>
                    </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <Link
                  to="/edit-profile"
                  className="flex items-center gap-2 bg-[#f59c9e] text-white px-4 py-2 rounded-full hover:bg-[#e0bcbc] transition"
              >
                <FaPen size={14} /> Edit Profile
              </Link>
              <button
                  onClick={logout}
                  className="flex items-center gap-2 bg-[#f59c9e] text-white px-4 py-2 rounded-full hover:bg-[#e0bcbc] transition"
              >
                <FaSignOutAlt size={14} /> Sign Out
              </button>
            </div>
          </div>

          {/* Order History */}
          <div className={`mt-10 p-6 rounded-3xl shadow-lg hover:shadow-xl transition duration-300 ${sectionBg}`}>
            <h2 className="text-2xl font-bold text-[#f59c9e] mb-4">Order History</h2>
            <p className="italic text-sm opacity-80">You have no orders yet.</p>
          </div>

          {/* Wishlist */}
          <div className={`mt-6 p-6 rounded-3xl shadow-lg hover:shadow-xl transition duration-300 ${sectionBg}`}>
            <h2 className="text-2xl font-bold text-[#f59c9e] mb-4">Wishlist</h2>
            <p className="italic text-sm opacity-80">Your wishlist is empty.</p>
          </div>

          {/* Reviews */}
          <div className={`mt-6 mb-10 p-6 rounded-3xl shadow-lg hover:shadow-xl transition duration-300 ${sectionBg}`}>
            <h2 className="text-2xl font-bold text-[#f59c9e] mb-4">Your Reviews</h2>
            {reviews.length === 0 ? (
                <p className="italic text-sm opacity-80">You haven't left any reviews yet.</p>
            ) : (
                <ul className="space-y-4">
                  {reviews.map((review) => (
                      <li
                          key={review.id}
                          className={`p-4 rounded-xl border shadow-sm hover:shadow-md transition duration-300 ${reviewCardBg}`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <Link
                              to={`/product/${review.product.id}`}
                              className="text-[#f59c9e] font-semibold hover:underline"
                          >
                            {review.product.name}
                          </Link>
                          <span className="text-sm opacity-50">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                              <FaStar
                                  key={i}
                                  size={14}
                                  className={
                                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                                  }
                              />
                          ))}
                        </div>
                        <p>{review.content}</p>
                      </li>
                  ))}
                </ul>
            )}
          </div>
        </div>
        <Footer />
      </div>
  );
}
