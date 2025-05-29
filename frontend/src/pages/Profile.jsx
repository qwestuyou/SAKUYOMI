import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Wishlist from "../components/Wishlist";
import UserReviews from "../components/UserReviews";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { FaPen } from "react-icons/fa";

export default function Profile() {
  const { user, setUser, logout } = useAuth();
  const { theme, themeStyles } = useTheme();

  const styles = themeStyles.profile;

  const [selectedTab, setSelectedTab] = useState("editProfile");
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
        <div className={`${styles.bg} min-h-screen`}>
          <Header />
          <div className="text-center mt-20 text-xl text-gray-500">You are not logged in.</div>
          <Footer />
        </div>
    );
  }

  const handleTabClick = (tab) => setSelectedTab(tab);

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
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setUser(prev => ({ ...prev, avatar: data.avatar }));
        setPreview(data.avatar);
        setSelectedFile(null);
      }
    } catch (err) {
      console.error("Error uploading avatar:", err);
    }
  };

  return (
      <div className={`${styles.bg} min-h-screen`}>
        <Header />
        <div className="max-w-5xl mx-auto mt-10 flex gap-8 px-4 md:px-0">
          <nav className={`${styles.card} rounded-3xl p-6 w-60 flex flex-col space-y-6 sticky top-20 h-fit`}>
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
                  className={`w-20 h-20 rounded-full object-cover border-4 ${styles.avatarBorder} shadow-md`}
              />
              <div className="text-center">
                <p className={`font-semibold text-lg ${styles.name} truncate max-w-[200px]`}>{user.name}</p>
                <p className="text-sm text-gray-400 truncate max-w-[200px]">{user.email}</p>
                <p className="text-sm text-gray-400 truncate max-w-[200px]">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {["editProfile", "orders", "wishlist", "reviews"].map(tab => (
                <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`text-left px-4 py-2 rounded-lg font-semibold transition ${
                        selectedTab === tab
                            ? styles.tabActive
                            : `${styles.tabHover} dark:${styles.tabHoverDark}`
                    }`}
                >
                  {tab === "editProfile" ? "Edit profile" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}

            <button
                onClick={logout}
                className={`text-left px-4 py-2 rounded-lg font-semibold ${styles.logoutBtn} mt-4`}
            >
              Sign Out
            </button>
          </nav>

          <main className={`flex-1 rounded-3xl p-6 shadow-xl ${styles.card}`}>
            {selectedTab === "editProfile" && (
                <div className="space-y-6">
                  <h2 className={`text-2xl font-bold ${styles.name}`}>Edit profile</h2>
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
                          className={`w-32 h-32 rounded-full object-cover border-4 border-[#fcd5d5] shadow-lg transition-transform duration-500 group-hover:scale-105`}
                      />
                      <label
                          htmlFor="avatar-upload"
                          className={`absolute bottom-1 right-1 ${styles.editAvatar} p-2 rounded-full shadow-md transition duration-300 cursor-pointer`}
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
                      <p className="text-lg"><span className={`font-semibold ${styles.name}`}>Name:</span> {user.name}</p>
                      <p className="text-lg"><span className={`font-semibold ${styles.name}`}>Email:</span> {user.email}</p>
                      <p className="text-lg">
                        <span className={`font-semibold ${styles.name}`}>Member since:</span>{" "}
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                      {selectedFile && (
                          <div className="flex gap-4 mt-4">
                            <button onClick={handleSaveAvatar} className={`px-6 py-2 rounded-xl shadow-md ${styles.saveBtn}`}>
                              Save
                            </button>
                            <button
                                onClick={() => {
                                  setSelectedFile(null);
                                  setPreview(user.avatar || "");
                                }}
                                className={`px-6 py-2 rounded-xl shadow-md ${styles.cancelBtn}`}
                            >
                              Cancel
                            </button>
                          </div>
                      )}
                    </div>
                  </div>
                </div>
            )}

            {selectedTab === "orders" && (
                <div>
                  <h2 className={`text-2xl font-bold ${styles.name}`}>Orders</h2>
                  <p className="italic text-sm opacity-80">You don’t have any orders yet</p>
                </div>
            )}

            {selectedTab === "wishlist" && <Wishlist sectionBg={styles.sectionBg} />}

            {selectedTab === "reviews" && (
                <>
                  <h2 className={`text-2xl font-bold mb-4 ${styles.name}`}>Reviews</h2>
                  <UserReviews reviews={reviews} reviewCardBg={styles.reviewCard} />
                </>
            )}
          </main>
        </div>
        <Footer />
      </div>
  );
}
