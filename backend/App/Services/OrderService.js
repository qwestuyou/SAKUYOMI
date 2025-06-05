import prisma from "../../prisma/client.js";

const OrderService = {
    async getAllOrders(userId) {
        return prisma.order.findMany({
            where: {userId},
            orderBy: {createdAt: "desc"},
            include: {
                items: {
                    include: {product: true},
                },
            },
        });
    },

    async getOrderById(id) {
        return prisma.order.findUnique({
            where: {id},
            include: {
                items: {
                    include: {product: true},
                },
            },
        });
    },

    async updateOrder(id, data) {
        return prisma.order.update({
            where: {id},
            data,
        });
    },
};

export default OrderService;
