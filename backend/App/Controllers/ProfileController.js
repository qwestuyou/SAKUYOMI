import ProfileService from "../Services/ProfileService.js";

const ProfileController = {
    async updateAvatar(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            const avatarUrl = `/uploads/avatars/${req.file.filename}`;
            const updatedUser = await ProfileService.setAvatar(req.user.id, avatarUrl);

            res.json({ avatar: avatarUrl, user: updatedUser });
        } catch (error) {
            console.error("Update Avatar Error:", error);
            res.status(500).json({
                error: "Failed to upload avatar",
                message: error.message,
                stack: error.stack,
            });
        }
    },

    async updateProfile(req, res) {
        try {
            const userId = req.user.id;
            const { name, email, oldPassword, newPassword } = req.body;

            let avatar = req.user.avatar;
            if (req.file) {
                avatar = `/uploads/avatars/${req.file.filename}`;
            }

            const updatedUser = await ProfileService.updateProfile({
                userId,
                name,
                email,
                avatar,
                oldPassword,
                newPassword,
            });

            res.json({ user: updatedUser });
        } catch (error) {
            console.error("Update Profile Error:", error);
            res.status(400).json({ message: error.message });
        }
    },
};

export default ProfileController;
