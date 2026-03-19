import type { Response } from 'express';
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
        console.log('persons userId', req.user.id)

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
