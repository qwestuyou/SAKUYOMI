import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany({ include: { category: true } });
    res.json(products);
  } catch (error) {
    console.error("GET / Error:", error);
    res.status(500).json({
      error: "Error fetching products",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      categoryId,
      anime,
      size,
      material,
      language,
      brand,
      productType,
      rating,
      inStock,
      color,
      gender,
      ageRating,
      features,
    } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        categoryId: parseInt(categoryId),
        anime: anime || null,
        size: size || null,
        material: material || null,
        language: language || null,
        brand: brand || null,
        productType: productType || null,
        rating: rating ? parseFloat(rating) : null,
        inStock: typeof inStock === "boolean" ? inStock : true,
        color: color || null,
        gender: gender || null,
        ageRating: ageRating || null,
        features: features || null,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("POST / Error:", error);
    res.status(500).json({
      error: "Error creating product",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { category: true },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(`GET /${id} Error:`, error);
    res.status(500).json({
      error: "Error fetching product by ID",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
});

export default router;
