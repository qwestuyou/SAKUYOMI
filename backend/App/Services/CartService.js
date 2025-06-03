import prisma from "../../prisma/client.js";

const CartService = {
    async getCart(userId) {
        return prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: { product: true },
                },
            },
        });
    },

    async addToCart(userId, productId, quantity = 1) {
        let cart = await prisma.cart.findUnique({ where: { userId } });
        if (!cart) {
            cart = await prisma.cart.create({ data: { userId } });
        }

        const existingItem = await prisma.cartItem.findUnique({
            where: { cartId_productId: { cartId: cart.id, productId } },
        });

        if (existingItem) {
            return prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
        }

        return prisma.cartItem.create({
            data: { cartId: cart.id, productId, quantity },
        });
    },

    async removeFromCart(userId, productId) {
        const cart = await prisma.cart.findUnique({ where: { userId } });
        if (!cart) return null;

        return prisma.cartItem.deleteMany({
            where: { cartId: cart.id, productId },
        });
    },

    async updateQuantity(userId, productId, quantity) {
        const cart = await prisma.cart.findUnique({ where: { userId } });
        if (!cart) return null;

        return prisma.cartItem.updateMany({
            where: { cartId: cart.id, productId },
            data: { quantity },
        });
    },

    async clearCart(userId) {
        const cart = await prisma.cart.findUnique({ where: { userId } });
        if (!cart) return null;

        await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

        return prisma.cart.delete({ where: { id: cart.id } });
    },

    async checkout(userId) {
        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: true,
            },
        });

        if (!cart || cart.items.length === 0) {
            throw new Error("Cart is empty");
        }

        const order = await prisma.order.create({
            data: {
                userId,
                status: "pending",
                items: {
                    create: cart.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
        });

        await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
        await prisma.cart.delete({ where: { id: cart.id } });

        return order;
    }
};

export default CartService;
