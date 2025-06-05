import prisma from "../../prisma/client.js";
import bcrypt from "bcrypt";

const ProfileService = {
    async setAvatar(userId, avatarUrl) {
        return prisma.user.update({
            where: {id: userId},
            data: {avatar: avatarUrl},
        });
    },

    async updateProfile({userId, name, email, avatar, oldPassword, newPassword}) {
        const user = await prisma.user.findUnique({where: {id: userId}});

        if (!user) throw new Error("User not found");

        const updateData = {
            name,
            email,
            avatar,
        };

        if (oldPassword && newPassword) {
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) throw new Error("Old password is incorrect");

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            updateData.password = hashedPassword;
        }

        return await prisma.user.update({
            where: {id: userId},
            data: updateData,
        });
    },
};

export default ProfileService;
