import { Router } from 'express';
import { getMovies, getOneMovie, createNewMovie } from './handlers/movie';
import { protect } from './modules/auth';
import { body } from 'express-validator';
import { handleInputErrors } from './modules/middleware';

const router = new Router();

/* Movies */

// Get all movies.
router.get('/movie', getMovies);

// Get one movie
router.get('/movie/:id', getOneMovie);
// Update one movie.

// Add one movie.
router.post('/movie',
    protect,
    body('actors').isString(),
    body('director').isString(),
    body('genre').isString(),
    body('plot').isString(),
    body('poster').isString(),
    body('rated').isString(),
    body('ratings').isArray(),
    body('released').isString(),
    body('runtime').isString(),
    body('title').isString(),
    body('type').isString(),
    body('year').isString(),
    body('writer').isString(),
    body('formats').isArray(),
    handleInputErrors,
    createNewMovie
);

// Delete one movie.

export default router;
