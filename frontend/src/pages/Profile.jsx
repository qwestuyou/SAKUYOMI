import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Wishlist from "../components/Wishlist";
import UserReviews from "../components/UserReviews";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { FaPen, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, setUser, logout } = useAuth();
  const { theme } = useTheme();

  const [selectedTab, setSelectedTab] = useState("profile");
  const [preview, setPreview] = useState(user?.avatar || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:5000/api/reviews/user/${user.id}`)
        .then(res => res.json())
        .then(data => setReviews(data))
        .catch(err => console.error("Error fetching user reviews:", err));
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

  // Стили
  const cardBg = theme === "dark" ? "bg-[#2b2b2b] text-white" : "bg-white text-gray-800";
  const sectionBg = theme === "dark" ? "bg-[#333] text-gray-100" : "bg-[#fff0f2] text-gray-800";
  const reviewCardBg = theme === "dark" ? "bg-[#3a3a3a] border-[#555] text-gray-100" : "bg-[#fff6f4] border-[#fcd5d5] text-gray-700";

  // Функция смены таба
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // Обработчики загрузки аватара
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

  return (
    <div className={`${theme === "dark" ? "bg-[#1a1a1a] text-white" : "bg-[#fff6f4] text-gray-800"} min-h-screen`}>
      <Header />
      <div className="max-w-5xl mx-auto mt-10 flex gap-8 px-4 md:px-0">

        {/* Sidebar меню */}
        <nav className={`${cardBg} rounded-3xl p-6 w-60 flex flex-col space-y-6 sticky top-20 h-fit`}>

          {/* Блок с аватаром и данными */}
          <div className="flex flex-col items-center gap-3">
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
              className="w-20 h-20 rounded-full object-cover border-4 border-[#f59c9e] shadow-md"
            />
            <div className="text-center">
              <p className="font-semibold text-lg text-[#f59c9e] truncate max-w-[200px]">{user.name}</p>
              <p className="text-sm text-gray-400 truncate max-w-[200px]">{user.email}</p>
            </div>
          </div>

          {/* Меню */}
          <button
            onClick={() => handleTabClick("profile")}
            className={`text-left px-4 py-2 rounded-lg font-semibold transition ${
              selectedTab === "profile" ? "bg-[#f59c9e] text-white" : "hover:bg-pink-100 dark:hover:bg-pink-800"
            }`}
          >
            Профиль
          </button>
          <button
            onClick={() => handleTabClick("editProfile")}
            className={`text-left px-4 py-2 rounded-lg font-semibold transition ${
              selectedTab === "editProfile" ? "bg-[#f59c9e] text-white" : "hover:bg-pink-100 dark:hover:bg-pink-800"
            }`}
          >
            Редактировать профиль
          </button>
          <button
            onClick={() => handleTabClick("orders")}
            className={`text-left px-4 py-2 rounded-lg font-semibold transition ${
              selectedTab === "orders" ? "bg-[#f59c9e] text-white" : "hover:bg-pink-100 dark:hover:bg-pink-800"
            }`}
          >
            Заказы
          </button>
          <button
            onClick={() => handleTabClick("wishlist")}
            className={`text-left px-4 py-2 rounded-lg font-semibold transition ${
              selectedTab === "wishlist" ? "bg-[#f59c9e] text-white" : "hover:bg-pink-100 dark:hover:bg-pink-800"
            }`}
          >
            Вишлист
          </button>
          <button
            onClick={() => handleTabClick("reviews")}
            className={`text-left px-4 py-2 rounded-lg font-semibold transition ${
              selectedTab === "reviews" ? "bg-[#f59c9e] text-white" : "hover:bg-pink-100 dark:hover:bg-pink-800"
            }`}
          >
            Отзывы
          </button>
          <button
            onClick={logout}
            className="text-left px-4 py-2 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition mt-4"
          >
            Выйти
          </button>
        </nav>

        {/* Основной контент */}
        <main
          className="flex-1 rounded-3xl p-6 shadow-xl transition-colors duration-300"
          style={{ backgroundColor: theme === "dark" ? "#2b2b2b" : "#fff" }}
        >
          {selectedTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#f59c9e]">Профиль</h2>
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
            </div>
          )}

          {selectedTab === "editProfile" && (
            <div>
              <h2 className="text-2xl font-bold text-[#f59c9e]">Редактировать профиль</h2>
              {/* Тут форма редактирования профиля, можешь потом вынести в отдельный компонент */}
            </div>
          )}

          {selectedTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold text-[#f59c9e]">Заказы</h2>
              <p className="italic text-sm opacity-80">У тебя пока нет заказов</p>
            </div>
          )}

          {selectedTab === "wishlist" && (
            <Wishlist sectionBg={sectionBg} />
          )}

          {selectedTab === "reviews" && (
            <>
              <h2 className="text-2xl font-bold text-[#f59c9e] mb-4">Отзывы</h2>
              <UserReviews reviews={reviews} reviewCardBg={reviewCardBg} />
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
