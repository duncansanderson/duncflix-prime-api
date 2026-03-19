import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.ts';
import { validateBody } from '../middleware/validation.ts';
import { personsInsertSchema } from '../db/schema/persons.ts';
import { createPerson } from '../controllers/personController.ts';

const router = Router();

router.use(authenticateToken);

// Routes
router.post('/', validateBody(personsInsertSchema), createPerson);

export default router;
