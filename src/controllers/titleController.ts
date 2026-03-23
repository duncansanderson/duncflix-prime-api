import type { Response, Request } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.ts';
import { eq } from 'drizzle-orm';
import db from '../db/connection.ts';
import { titles } from '../db/schema/titles.ts';

export async function createTitle(req: AuthenticatedRequest, res: Response) {
    try {
        const {
            availableSeasons,
            backdropPath,
            belongsToCollection,
            episodeRunTime,
            firstAirDate,
            format,
            genre,
            images,
            lastAirDate,
            name,
            numberOfEpisodes,
            numberOfSeasons,
            overview,
            posterPath,
            runtime,
            tagline,
            type,
            voteAverage,
            voteCount,
            video,
        } = req.body;
        const userId = req.user!.id;

        const [newTitle] = await db
            .insert(titles)
            .values({
                userId,
                availableSeasons,
                backdropPath,
                belongsToCollection,
                episodeRunTime,
                firstAirDate,
                format,
                genre,
                images,
                lastAirDate,
                name,
                numberOfEpisodes,
                numberOfSeasons,
                overview,
                posterPath,
                runtime,
                tagline,
                type,
                voteAverage,
                voteCount,
                video,
            })
            .returning({
                name: titles.name,
                createdAt: titles.createdAt,
            });

        res.status(201).json({
            message: 'Title successfully created.',
            title: newTitle,
        });
    } catch (error) {
        console.error('Title creation error:', error);
        res.status(500).json({ message: 'Failed to create title' });
    }
}

export async function getAllTitles(req: Request, res: Response) {
    try {
        const allTitles = await db
            .select()
            .from(titles);

        res.status(200).json({
            titles: allTitles,
        });
    } catch (error) {
        console.error('Get all titles error:', error);
        res.status(500).json({ message: 'Failed to get all titles.' });
    }
}

export async function getAllMovies(req: Request, res: Response) {
    try {
        const allTitles = await db
            .select()
            .from(titles)
            .where(eq(titles.type, 'movie'));

        res.status(200).json({
            titles: allTitles,
        });
    } catch (error) {
        console.error('Get all movies error:', error);
        res.status(500).json({ message: 'Failed to get all movies.' });
    }
}

export async function getAllSeries(req: Request, res: Response) {
    try {
        const allTitles = await db
            .select()
            .from(titles)
            .where(eq(titles.type, 'series'));

        res.status(200).json({
            titles: allTitles,
        });
    } catch (error) {
        console.error('Get all series error:', error);
        res.status(500).json({ message: 'Failed to get all series.' });
    }
}
