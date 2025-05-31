import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "./Notification";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function EditProfileModal({ isOpen, onClose }) {
    const { user, setUser } = useAuth();
    const notify = useNotification();
    const { themeStyles } = useTheme();

    const styles = themeStyles.modal;

    const [form, setForm] = useState({
        name: user.name,
        email: user.email,
        oldPassword: "",
        newPassword: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(user.avatar || "");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSaveChanges = async () => {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        if (selectedFile) formData.append("avatar", selectedFile);
        if (form.oldPassword && form.newPassword) {
            formData.append("oldPassword", form.oldPassword);
            formData.append("newPassword", form.newPassword);
        }

        try {
            const res = await fetch("http://localhost:5000/api/users/update", {
                method: "POST",
                credentials: "include",
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                setUser(data.user);
                notify("Profile updated successfully", "success");
                onClose();
            } else {
                notify(data.message || "Failed to update profile", "error");
            }
        } catch (err) {
            console.error("Update error:", err);
            notify("An error occurred while updating profile", "error");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className={styles.content}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <h3 className={styles.title}>Update Profile</h3>

                        <label className={styles.label}>Avatar</label>
                        <div className="relative">
                            <input
                                id="avatar-upload"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <label
                                htmlFor="avatar-upload"
                                className="block w-40 text-center cursor-pointer px-4 py-2 rounded-xl bg-[#f59c9e] text-white hover:bg-[#ec8e91] transition"
                            >
                                {selectedFile ? "File selected" : "Choose Avatar"}
                            </label>
                        </div>

                        <label className={styles.label}>Name</label>
                        <input name="name" value={form.name} onChange={handleInputChange} className={styles.input} />

                        <label className={styles.label}>Email</label>
                        <input name="email" value={form.email} onChange={handleInputChange} className={styles.input} />

                        <label className={styles.label}>Old Password</label>
                        <input name="oldPassword" type="password" value={form.oldPassword} onChange={handleInputChange} className={styles.input} />

                        <label className={styles.label}>New Password</label>
                        <input name="newPassword" type="password" value={form.newPassword} onChange={handleInputChange} className={styles.input} />

                        <div className={styles.actions}>
                            <button onClick={handleSaveChanges} className={styles.saveBtn}>Save</button>
                            <button onClick={onClose} className={styles.cancelBtn}>Cancel</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
