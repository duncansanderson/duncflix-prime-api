import { Router } from 'express';
import { z } from 'zod';
import { login, register } from '../controllers/authController.ts';
import { validateBody } from '../middleware/validation.ts';
import { insertUserSchema } from '../db/schema.ts'

const router = Router();

const registerSchema = z.object({
    email: z.email('Invalid email format'),
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(50, 'Username too long'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
});

const loginSchema = z.object({
    email: z.email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
});

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);

export default router;
