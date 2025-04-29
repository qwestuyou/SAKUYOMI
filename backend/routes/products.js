import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await prisma.product.findMany({ include: { category: true } });
  res.json(products);
});

router.post("/", async (req, res) => {
  try {
    const { name, description, price, image, categoryId } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        categoryId: parseInt(categoryId),
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { category: true }
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
