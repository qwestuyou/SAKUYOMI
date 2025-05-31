import prisma from "../../prisma/client.js";

const ReviewService = {
    async getByProduct(productId) {
        return prisma.review.findMany({
            where: { productId },
            orderBy: { createdAt: "desc" },
            include: { user: true },
        });
    },

    async getByUser(userId) {
        return prisma.review.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            include: { product: true },
        });
    },

    async create({ userId, productId, content, rating }) {
        return prisma.review.create({
            data: {
                content,
                rating,
                user: { connect: { id: userId } },
                product: { connect: { id: productId } },
            },
        });
    },

    getById(id) {
        return prisma.review.findUnique({ where: { id } });
    },

    delete(id) {
        return prisma.review.delete({ where: { id } });
    },
};

export default ReviewService;
