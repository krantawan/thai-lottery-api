import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// GET /lottery/latest
router.get('/latest', async (req, res) => {
  try {
    const result = await prisma.lotteryResult.findFirst({
      orderBy: { date: 'desc' },
    });

    if (!result) return res.status(404).json({ message: 'No result found' });

    const response = {
      date: result.date.toISOString().split('T')[0],
      firstPrize: result.firstPrize,
      last2Digits: result.last2Digits,
      specialPrizes: {
        front3Digits: result.front3Digits,
        last3Digits: result.last3Digits,
        nearFirst: result.nearFirst,
      },
      otherPrizes: {
        secondPrize: result.secondPrize,
        thirdPrize: result.thirdPrize,
        fourthPrize: result.fourthPrize,
        fifthPrize: result.fifthPrize,
      },
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /lottery/:date (format YYYY-MM-DD)
router.get('/:date', async (req, res) => {
  try {
    const result = await prisma.lotteryResult.findUnique({
      where: { date: new Date(req.params.date) },
    });
    if (!result) return res.status(404).json({ message: 'Not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
