import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.ts';

const router = Router();

router.use(authenticateToken);

router.get('/', (req, res) => {
    res.json({ message: 'Get all users' });
});

router.post('/:id', (req, res) => {
    res.status(201).json({ message: 'User created' });
});

router.put('/:id', (req, res) => {
    res.json({ message: `Update user ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
    res.json({ message: ` Delete user ${req.params.id}` });
})

export default router;
