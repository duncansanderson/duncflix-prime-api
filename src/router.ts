import { Router } from 'express';
import { getMovies, createNewMovie } from './handlers/movie';
import { protect } from './modules/auth';

const router = new Router();

/* Movies */

// Get all movies.
router.get('/movie', getMovies);

// get one movie

// update one movie

// Add one movie.
router.post('/movie', protect, createNewMovie);

// delete one movie

export default router;
