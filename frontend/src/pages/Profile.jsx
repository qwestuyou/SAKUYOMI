import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { FaPen } from "react-icons/fa";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [preview, setPreview] = useState(user?.avatar || "");
  const [selectedFile, setSelectedFile] = useState(null);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fff6f4] text-gray-800">
        <Header />
        <div className="text-center mt-20 text-xl text-gray-600">
          You are not logged in.
        </div>
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

  return (
    <div className="min-h-screen bg-[#fff6f4] text-gray-800">
      <Header />
      <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
        <div className="relative group w-32 h-32">
          <label htmlFor="avatar-upload">
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
              className="w-32 h-32 rounded-full object-cover border cursor-pointer"
            />
              <div className="absolute bottom-1 right-1 bg-[#f59c9e] text-white p-2 rounded-full shadow-md hover:bg-[#e0bcbc] transition">
                <FaPen size={12} />
              </div>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {selectedFile && (
            <button
              onClick={handleSaveAvatar}
              className="bg-[#f59c9e] text-white mt-5 px-6 py-2 rounded-xl hover:bg-[#e0bcbc] transition"
            >
              Save Avatar
            </button>
          )}

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

          {/* Order History */}
          <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-[#f59c9e] mb-4">Order History</h2>
            <p className="text-gray-600 italic">You have no orders yet.</p>
          </div>

          {/* Wishlist */}
          <div className="max-w-2xl mx-auto mt-6 mb-10 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-[#f59c9e] mb-4">Wishlist</h2>
            <p className="text-gray-600 italic">Your wishlist is empty.</p>
          </div>

      </div>
      <Footer />
    </div>
  );
}