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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Помилка при отриманні відгуків' });
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
          product: { connect: { id: productId } }
        }
      });
  
      res.status(201).json(newReview);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Не вдалося створити відгук' });
    }
  });
  

export default router;
