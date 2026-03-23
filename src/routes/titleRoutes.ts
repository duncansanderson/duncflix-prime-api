import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.ts';
import { validateBody } from '../middleware/validation.ts';
import {
    createTitle,
    getAllMovies,
    getAllSeries,
    getAllTitles,
} from '../controllers/titleController.ts';
import { titlesInsertSchema } from '../db/schema/titles.ts';

const router = Router();

router.post('/',
    authenticateToken,
    validateBody(titlesInsertSchema),
    createTitle,
);
router.get('/', getAllTitles);
router.get('/movies', getAllMovies);
router.get('/series', getAllSeries);

// getAll titles
// getAll movies
// getAll series
// getFeatured title
// getFeatured movie
// getFeatured series
// Get one title
// Get related titles
// Update one title
// delete one title

export default router;
