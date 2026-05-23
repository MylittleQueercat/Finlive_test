import { Router, Request, Response } from 'express';
import { Document } from 'mongodb';
import { db } from '../db';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { category, sortBy, order } = req.query;

  const rawPage = Number(req.query.page);
  const rawLimit = Number(req.query.limit);

  if (
    !Number.isInteger(rawPage) || rawPage < 1 ||
    !Number.isInteger(rawLimit) || rawLimit < 1
  ) {
    res.status(400).json({ error: 'page and limit must be positive integers' });
    return;
  }

  const page = rawPage;
  const limit = rawLimit;
  const skip = (page - 1) * limit;

  const matchStage: Document = {};
  if (typeof category === 'string' && category.trim() !== '') {
    matchStage['category'] = category.trim();
  }

  const sortField = typeof sortBy === 'string' && sortBy.trim() !== '' ? sortBy.trim() : '_id';
  const sortDir = order === 'desc' ? -1 : 1;

  const pipeline: Document[] = [
    { $match: matchStage },
    { $sort: { [sortField]: sortDir } },
    { $skip: skip },
    { $limit: limit },
  ];

  try {
    const collection = db.collection('products');

    const [data, countResult] = await Promise.all([
      collection.aggregate(pipeline).toArray(),
      collection.aggregate([{ $match: matchStage }, { $count: 'total' }]).toArray(),
    ]);

    const totalCount = countResult.length > 0 ? (countResult[0] as { total: number }).total : 0;
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      data,
      metadata: { totalCount, page, totalPages },
    });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
