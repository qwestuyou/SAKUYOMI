import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Wishlist from "../components/Wishlist";
import UserReviews from "../components/UserReviews";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNotification } from "../components/Notification";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "../components/EditProfileModal";

export default function Profile() {
  const { user, setUser, logout } = useAuth();
  const { themeStyles } = useTheme();
  const notify = useNotification();
  const navigate = useNavigate();

  const styles = themeStyles.profile;

  const [selectedTab, setSelectedTab] = useState("editProfile");
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/reviews/user/${user.id}`, {
        credentials: "include",
      })
          .then((res) => res.json())
          .then((data) => setReviews(data))
          .catch((err) => {
            console.error("Error fetching user reviews:", err);
            notify("Failed to load your reviews", "error");
          });
    }
  }, [user?.id]);

  if (!user) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg">Loading profile...</p>
        </div>
    );
  }

  return (
      <div className={`${styles.bg} min-h-screen`}>
        <Header />
        <div className="max-w-5xl mx-auto mt-10 flex gap-8 px-4 md:px-0">
          <nav className={`${styles.card} rounded-3xl p-6 w-60 flex flex-col space-y-6 sticky top-20 h-fit`}>
            <div className="flex flex-col items-center gap-3">
              <img
                  src={`http://localhost:5000${user.avatar || ""}`}
                  alt="avatar"
                  className={`w-20 h-20 rounded-full object-cover border-4 ${styles.avatarBorder} shadow-md`}
              />
              <div className="text-center">
                <p className={`font-semibold text-lg ${styles.name} truncate max-w-[200px]`}>{user.name}</p>
                <p className="text-sm text-gray-400 truncate max-w-[200px]">{user.email}</p>
                <p className="text-sm text-gray-400 truncate max-w-[200px]">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {["editProfile", "orders", "wishlist", "reviews"].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`text-left px-4 py-2 rounded-lg font-semibold transition ${
                        selectedTab === tab ? styles.tabActive : `${styles.tabHover} dark:${styles.tabHoverDark}`
                    }`}
                >
                  {tab === "editProfile" ? "Edit profile" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}

            <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className={`text-left px-4 py-2 rounded-lg font-semibold ${styles.logoutBtn} mt-4`}
            >
              Sign Out
            </button>
          </nav>

          <main className={`flex-1 rounded-3xl p-6 shadow-xl ${styles.card}`}>
            {selectedTab === "editProfile" && (
                <div className="space-y-6">
                  <h2 className={`text-2xl font-bold ${styles.name}`}>Edit profile</h2>
                  <div className="space-y-2">
                    <p className="text-lg">
                      <span className={`font-semibold ${styles.name}`}>Name:</span> {user.name}
                    </p>
                    <p className="text-lg">
                      <span className={`font-semibold ${styles.name}`}>Email:</span> {user.email}
                    </p>
                    <p className="text-lg">
                      <span className={`font-semibold ${styles.name}`}>Member since:</span> {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                    <button onClick={() => setIsModalOpen(true)} className={`mt-4 px-6 py-2 rounded-xl shadow-md ${styles.saveBtn}`}>
                      Edit Info
                    </button>
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

        <EditProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <Footer />
      </div>
  );
}
