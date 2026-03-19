import { Router } from 'express';
import { z } from 'zod';
import { authenticateToken } from '../middleware/auth.ts';
import { validateBody, validateParams } from '../middleware/validation.ts';
import { personsInsertSchema } from '../db/schema/persons.ts';
import {
    createPerson,
    getAllPersons,
    getOnePerson,
} from '../controllers/personController.ts';

const router = Router();

const uuidSchema = z.object({
  id: z.uuid('Invalid person ID format'),
})

// Routes
router.get('/', getAllPersons);
router.get('/:id', validateParams(uuidSchema), getOnePerson);
router.post('/',
    authenticateToken,
    validateBody(personsInsertSchema),
    createPerson,
);

export default router;
