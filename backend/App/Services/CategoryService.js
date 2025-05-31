import prisma from "../../prisma/client.js";

const CategoryService = {
    getAll() {
        return prisma.category.findMany();
    },
};

export default CategoryService;
