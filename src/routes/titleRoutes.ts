import { Router } from 'express';
import { z } from 'zod';
import { authenticateToken } from '../middleware/auth.ts';
import { validateBody, validateParams } from '../middleware/validation.ts';
import {
    createTitle,
    getAllTitles,
} from '../controllers/titleController.ts';
import { titlesInsertSchema } from '../db/schema/titles.ts';
import { titleType } from '../../types/index.ts';

const router = Router();

const typeSchema = z.object({
    type: z.enum(titleType),
});

router.post('/',
    authenticateToken,
    validateBody(titlesInsertSchema),
    createTitle,
);
router.get('/', getAllTitles);
router.get('/:type',
    validateParams(typeSchema),
    getAllTitles
);

// Get one title
// Get related titles
// Update one title
// delete one title
// getFeatured title
// getFeatured movie
// getFeatured series

export default router;
