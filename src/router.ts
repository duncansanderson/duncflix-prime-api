import { Router } from 'express';
import { getMovies, getOneMovie, createNewMovie, deleteMovie, updateMovie } from './handlers/movie';
import { protect } from './modules/auth';
import { body } from 'express-validator';
import { handleInputErrors } from './modules/middleware';

const router = new Router();

/* Movies */

// Get all movies.
router.get('/movie', getMovies);

// Get one movie
router.get('/movie/:id', getOneMovie);

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

// Update one movie.
router.put('/movie/:id',
    protect,
    body('actors').optional().isString(),
    body('director').optional().isString(),
    body('genre').optional().isString(),
    body('plot').optional().isString(),
    body('poster').optional().isString(),
    body('rated').optional().isString(),
    body('ratings').optional().isArray(),
    body('released').optional().isString(),
    body('runtime').optional().isString(),
    body('title').optional().isString(),
    body('type').optional().isString(),
    body('year').optional().isString(),
    body('writer').optional().isString(),
    body('formats').optional().isArray(),
    handleInputErrors,
    updateMovie
);

// Delete one movie.
router.delete('/movie/:id', protect, deleteMovie);

export default router;
