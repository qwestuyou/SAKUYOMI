import ProductService from "../Services/ProductService.js";

const ProductController = {
    async index(req, res) {
        try {
            const products = await ProductService.getAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch products", message: error.message });
        }
    },

    async show(req, res) {
        try {
            const id = parseInt(req.params.id);
            const product = await ProductService.getById(id);
            if (!product) return res.status(404).json({ error: "Product not found" });
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch product", message: error.message });
        }
    },

    async store(req, res) {
        try {
            const product = await ProductService.create(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error: "Failed to create product", message: error.message });
        }
    },

    async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            const product = await ProductService.update(id, req.body);
            if (!product) return res.status(404).json({ error: "Product not found" });
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: "Failed to update product", message: error.message });
        }
    },

    async destroy(req, res) {
        try {
            const id = parseInt(req.params.id);
            const deleted = await ProductService.remove(id);
            if (!deleted) return res.status(404).json({ error: "Product not found" });
            res.json({ message: "Product deleted" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete product", message: error.message });
        }
    },
};

export default ProductController;
