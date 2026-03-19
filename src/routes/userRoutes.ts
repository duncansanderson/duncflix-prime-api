import { Router } from 'express';
import { z } from 'zod';
import { authenticateToken } from '../middleware/auth.ts';
import { validateBody } from '../middleware/validation.ts';
import {
    changePassword,
    getProfile,
    updateProfile,
} from '../controllers/userController.ts';
import { usersChangePasswordSchema, usersUpdateSchema } from '../db/schema/users.ts';

const router = Router();

router.use(authenticateToken);

router.get('/profile', getProfile);
router.put('/profile', validateBody(usersUpdateSchema), updateProfile);
router.post('/change-password', validateBody(usersChangePasswordSchema), changePassword);

// router.get('/', (req, res) => {
//     res.json({ message: 'Get all users' });
// });

// router.post('/:id', (req, res) => {
//     res.status(201).json({ message: 'User created' });
// });

// router.put('/:id', (req, res) => {
//     res.json({ message: `Update user ${req.params.id}` });
// });

// router.delete('/:id', (req, res) => {
//     res.json({ message: ` Delete user ${req.params.id}` });
// })

export default router;
