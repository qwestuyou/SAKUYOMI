import CategoryService from "../Services/CategoryService.js";

const CategoryController = {
    async index(req, res) {
        try {
            const categories = await CategoryService.getAll();
            res.json(categories);
        } catch (error) {
            res.status(500).json({error: "Failed to fetch categories", message: error.message});
        }
    },
};

export default CategoryController;
