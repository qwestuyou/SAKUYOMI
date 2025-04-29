import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

export default router;
