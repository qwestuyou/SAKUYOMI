import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const reviews = await prisma.review.findMany({
      where: { productId: parseInt(productId) },
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    });
    res.json(reviews);
  } catch (error) {
    console.error(`GET /:productId Error:`, error);
    res.status(500).json({
      error: 'Помилка при отриманні відгуків',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { productId, content, rating, userId } = req.body;

    const newReview = await prisma.review.create({
      data: {
        content,
        rating,
        user: { connect: { id: userId } },
        product: { connect: { id: productId } },
      },
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error(`POST /review Error:`, error);
    res.status(500).json({
      error: 'Не вдалося створити відгук',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const reviews = await prisma.review.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(reviews);
  } catch (error) {
    console.error(`GET /user/:id Error:`, error);
    res.status(500).json({
      error: "Failed to fetch reviews",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
});

export default router;
