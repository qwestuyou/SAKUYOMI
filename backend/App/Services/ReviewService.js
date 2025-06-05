import prisma from "../../prisma/client.js";

const ReviewService = {
    async getByProduct(productId) {
        return prisma.review.findMany({
            where: {productId, parentId: null},
            orderBy: {createdAt: "desc"},
            include: {
                user: true,
                replies: {
                    include: {
                        user: true,
                    },
                    orderBy: {createdAt: "asc"},
                },
            },
        });
    },

    async getByUser(userId) {
        return prisma.review.findMany({
            where: {userId},
            orderBy: {createdAt: "desc"},
            include: {product: true},
        });
    },

    async create({userId, productId, content, rating, parentId = null}) {
        return prisma.review.create({
            data: {
                content,
                rating,
                user: {connect: {id: userId}},
                product: {connect: {id: productId}},
                parent: parentId ? {connect: {id: parentId}} : undefined,
            },
            include: {
                user: true,
                replies: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    },

    getById(id) {
        return prisma.review.findUnique({where: {id}});
    },

    async delete(id) {
        await prisma.review.deleteMany({
            where: {parentId: id},
        });

        return prisma.review.delete({
            where: {id},
        });
    },
};

export default ReviewService;
