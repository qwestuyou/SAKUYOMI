import express from "express";
import CartController from "../../App/Controllers/CartController.js";
import AuthMiddleware from "../../App/Middlewares/AuthMiddleware.js";

const router = express.Router();

router.use(AuthMiddleware);

router.get("/", CartController.show);
router.post("/", CartController.add);
router.put("/", CartController.update);
router.delete("/:productId", CartController.remove);
router.delete("/", CartController.clear);
router.post("/checkout", CartController.checkout);

export default router;
