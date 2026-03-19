import type { Response, Request } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.ts';
import db from '../db/connection.ts';
import { persons } from '../db/schema/index.ts';

export async function createPerson(req: AuthenticatedRequest, res: Response) {
    try {
        const {
            biography,
            birthday,
            deathday,
            imdbId,
            name,
            placeOfBirth,
            profilePath,
        } = req.body;
        const userId = req.user!.id;

        const [newPerson] = await db
            .insert(persons)
            .values({
                userId,
                biography,
                birthday,
                deathday,
                imdbId,
                name,
                placeOfBirth,
                profilePath,
            })
            .returning({
                name: persons.name,
                createdAt: persons.createdAt,
            });

        res.status(201).json({
            message: 'Person created successfully',
            person: newPerson,
        });
    } catch (error) {
        console.error('Person creation error', error);
        res.status(500).json({ error: 'Failed to create person' });
    }
}

export async function getAllPersons(req: Request, res: Response) {
    try {
        const allPersons = await db
            .select()
            .from(persons);

        res.status(200).json({
            persons: allPersons,
        });
    } catch (error) {
        console.error('Get all persons error:', error);
        res.status(500).json({ error: 'Failed to get all persons' });
    }
}
// Get person
// Get all persons
// Update person
// Delete person
