import express from "express";
import CategoryController from "../../App/Controllers/CategoryController.js";

const router = express.Router();

router.get("/", CategoryController.index);

export default router;
