import prisma from "../../prisma/client.js";

const IsAdminMiddleware = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { isAdmin: true },
        });

        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export default IsAdminMiddleware;
