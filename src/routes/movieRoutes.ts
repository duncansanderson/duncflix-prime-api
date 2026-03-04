import { Router } from 'express';
import { validateBody } from '../middleware/validation.ts';
import { z } from 'zod';

const router = Router();

const createMovieSchema = z.object({
    name: z.string().min(1, 'User name is required').max(100, 'Name too long'),
    year: z.number().positive(),
})

router.get('/', (req, res) => {
    res.json('Get all movies');
});

router.get('/:id', (req, res) => {
    res.json({ message: `Get one move ${req.params.id}` });
});

router.post('/:id', validateBody(createMovieSchema), (req, res) => {
    res.json({ message: `Create on movie ${req.params.id}` });
})

router.put('/:id', (req, res) => {
    res.json({ message: `Update movie ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
    res.json({ message: ` Delete movie ${req.params.id}` });
})

export default router;
