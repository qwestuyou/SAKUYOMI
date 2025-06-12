import prisma from "../../prisma/client.js";

const ProductService = {
    async getAll() {
        const products = await prisma.product.findMany({
            include: {
                category: true,
                reviews: {
                    select: {
                        rating: true,
                    },
                },
            },
        });

        return products.map((product) => {
            const ratings = product.reviews.map((r) => r.rating);
            const averageRating = ratings.length
                ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
                : null;

            return {
                ...product,
                averageRating: averageRating ? Math.round(averageRating * 10) / 10 : null,
            };
        });
    },

    getById(id) {
        return prisma.product.findUnique({
            where: {id},
            include: {category: true},
        });
    },

    create(data) {
        return prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                image: data.image,
                categoryId: parseInt(data.categoryId),
                anime: data.anime || null,
                size: data.size || null,
                language: data.language || null,
                productType: data.productType || null,
                rating: data.rating ? parseFloat(data.rating) : null,
                inStock: typeof data.inStock === "boolean" ? data.inStock : true,
                color: data.color || null,
                gender: data.gender || null,
                ageRating: data.ageRating || null,
                coverType: data.coverType || null,
                features: data.features || null,
            },
        });
    },

    update(id, data) {
        return prisma.product.update({
            where: {id},
            data: {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                image: data.image,
                categoryId: parseInt(data.categoryId),
                anime: data.anime || null,
                size: data.size || null,
                language: data.language || null,
                productType: data.productType || null,
                rating: data.rating ? parseFloat(data.rating) : null,
                inStock: typeof data.inStock === "boolean" ? data.inStock : true,
                color: data.color || null,
                gender: data.gender || null,
                ageRating: data.ageRating || null,
                coverType: data.coverType || null,
                features: data.features || null,
            },
        });
    },

    async remove(id) {
        await prisma.review.deleteMany({where: {productId: id}});
        await prisma.orderItem.deleteMany({where: {productId: id}});
        await prisma.wishlist.deleteMany({where: {productId: id}});
        return prisma.product.delete({where: {id}});
    }
};

export default ProductService;
