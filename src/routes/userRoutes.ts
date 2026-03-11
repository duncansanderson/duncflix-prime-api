import { Router } from 'express';
import { z } from 'zod';
import { authenticateToken } from '../middleware/auth.ts';
import { validateBody } from '../middleware/validation.ts';
import {
    changePassword,
    getProfile,
    updateProfile,
} from '../controllers/userController.ts';

const router = Router();

router.use(authenticateToken);

const updateProfileSchema = z.object({
    email: z.email('Invalid email format').optional,
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(50, 'Username too long')
        .optional(),
});

const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain uppercase, lowercase, and number'
        ),
});

router.get('/profile', getProfile);
router.put('/profile', validateBody(updateProfileSchema), updateProfile);
router.post('/change-password', validateBody(changePasswordSchema), changePassword);

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
