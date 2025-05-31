import express from "express";
import ProductController from "../../App/Controllers/ProductController.js";
import AuthMiddleware from "../../App/Middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/", ProductController.index);
router.get("/:id", ProductController.show);
router.post("/", AuthMiddleware, ProductController.store);

export default router;
