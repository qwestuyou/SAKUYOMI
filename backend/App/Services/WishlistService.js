import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

class WishlistService {
    async getUserWishlist(userId) {
        const wishlist = await prisma.wishlist.findMany({
            where: {userId},
            include: {product: true},
        });

        return wishlist.map((item) => item.product);
    }

    async addToWishlist(userId, productId) {
        return prisma.wishlist.upsert({
            where: {userId_productId: {userId, productId}},
            update: {},
            create: {userId, productId},
        });
    }

    async removeFromWishlist(userId, productId) {
        return prisma.wishlist.delete({
            where: {userId_productId: {userId, productId}},
        });
    }
}

export default new WishlistService();
