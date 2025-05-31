import prisma from "../../prisma/client.js";

const ProductService = {
    getAll() {
        return prisma.product.findMany({ include: { category: true } });
    },

    getById(id) {
        return prisma.product.findUnique({
            where: { id },
            include: { category: true },
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
                material: data.material || null,
                language: data.language || null,
                brand: data.brand || null,
                productType: data.productType || null,
                rating: data.rating ? parseFloat(data.rating) : null,
                inStock: typeof data.inStock === "boolean" ? data.inStock : true,
                color: data.color || null,
                gender: data.gender || null,
                ageRating: data.ageRating || null,
                features: data.features || null,
            },
        });
    },
};

export default ProductService;