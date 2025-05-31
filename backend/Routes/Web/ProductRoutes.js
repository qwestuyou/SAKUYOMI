import express from "express";
import ProductController from "../../App/Controllers/ProductController.js";
import AuthMiddleware from "../../App/Middlewares/AuthMiddleware.js";
import IsAdminMiddleware from "../../App/Middlewares/IsAdminMiddleware.js";

const router = express.Router();

router.get("/", ProductController.index);
router.get("/:id", ProductController.show);

router.post("/", AuthMiddleware, IsAdminMiddleware, ProductController.store);
router.put("/:id", AuthMiddleware, IsAdminMiddleware, ProductController.update);
router.delete("/:id", AuthMiddleware, IsAdminMiddleware, ProductController.destroy);

export default router;
