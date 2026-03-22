import type { Response, Request } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.ts';
import db from '../db/connection.ts';
import { persons } from '../db/schema/index.ts';
import { eq } from 'drizzle-orm';

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
export async function getOnePerson(req: Request<{id: string}>, res: Response) {
    try {
        const { id } = req.params;

        const [person] = await db
            .select({
                id: persons.id,
                biography: persons.biography,
                birthday: persons.birthday,
                deathday: persons.deathday,
                imdbId: persons.imdbId,
                name: persons.name,
                placeOfBirth: persons.placeOfBirth,
                profilePath: persons.profilePath,
            })
            .from(persons)
            .where(eq(persons.id, id));

        if (!person) {
            res.status(404).json({ error: 'Person not found '});
            return;
        }

        res.status(200).json({
            ...person,
        });
    } catch (error) {
        console.error('Get one person error:', error);
        res.status(500).json({ error: 'Failed to get one person' });
    }
}

export async function updatePerson(req: Request<{id: string}>, res: Response) {
    try {
        const { id } = req.params;
        const {
            biography,
            birthday,
            deathday,
            imdbId,
            name,
            placeOfBirth,
            profilePath,
        } = req.body;

        const [updatedPerson] = await db
            .update(persons)
            .set({
                biography,
                birthday,
                deathday,
                imdbId,
                name,
                placeOfBirth,
                profilePath,
                updatedAt: new Date(),
            })
            .where(eq(persons.id, id))
            .returning({
                id: persons.id,
                biography: persons.biography,
                birthday: persons.birthday,
                deathday: persons.deathday,
                imdbId: persons.imdbId,
                name: persons.name,
                placeOfBirth: persons.placeOfBirth,
                profilePath: persons.profilePath,
                updatedAt: persons.updatedAt,
            });

        if (!updatedPerson) {
            res.status(404).json({ error: 'Person not found '});
            return;
        }

        res.status(200).json({
            message: 'Person updated successfully',
            person: updatedPerson,
        });
    } catch (error) {
        console.error('Update person error:', error);
        res.status(500).json({ error: 'Failed to update person' });
    }
}
// Delete person
