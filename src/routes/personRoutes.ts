import { Router } from 'express';
import { z } from 'zod';
import { authenticateToken } from '../middleware/auth.ts';
import { validateBody, validateParams } from '../middleware/validation.ts';
import { personsInsertSchema, personsUpdateSchema } from '../db/schema/persons.ts';
import {
    createPerson,
    getAllPersons,
    getOnePerson,
    updatePerson,
    deletedPerson,
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
router.put('/:id',
    authenticateToken,
    validateParams(uuidSchema),
    validateBody(personsUpdateSchema),
    updatePerson,
);
router.delete('/:id',
    authenticateToken,
    validateParams(uuidSchema),
    deletedPerson,
)

export default router;
