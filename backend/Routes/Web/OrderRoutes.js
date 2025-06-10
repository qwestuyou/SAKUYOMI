import express from "express";
import OrderController from "../../App/Controllers/OrderController.js";
import AuthMiddleware from "../../App/Middlewares/AuthMiddleware.js";

const router = express.Router();

router.use(AuthMiddleware);
router.get("/", OrderController.index);
router.get("/:id", OrderController.show);
router.post("/:id/pay", OrderController.pay);
router.put("/:id", AuthMiddleware, OrderController.update);
router.post("/:id/cancel", OrderController.cancel);


export default router;
