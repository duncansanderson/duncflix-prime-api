/* eslint-disable antfu/consistent-list-newline */
import { Router } from 'express';
import { body } from 'express-validator';

import {
    createNewMovie,
    deleteMovie,
    getFeatured,
    getMovies,
    getOneMovie,
    updateMovie,
} from './handlers/movie';
import {
    createNewPerson,
    deletePerson,
    getOnePerson,
    getPersons,
    updatePerson,
} from './handlers/persons';
import { handleInputErrors } from './modules/middleware';

const router = new Router();

/* Movies */

// Get all movies.
router.get('/movie', getMovies);

// Get one movie
router.get('/movie/:id', getOneMovie);

// Add one movie.
router.post('/movie',
    // protect,
    body('actors').isString(),
    body('backdroppath').isString(),
    body('director').isString(),
    body('formats').isArray(),
    body('genre').isString(),
    body('imdbid').isString(),
    body('plot').isString(),
    body('poster').isString(),
    body('posterpath').isString(),
    body('rated').isString(),
    body('ratings').isArray(),
    body('released').isString(),
    body('runtime').isString(),
    body('series').isArray(),
    body('title').isString(),
    body('totalSeasons').isString(),
    body('type').isString(),
    body('year').isString(),
    body('writer').isString(),
    handleInputErrors,
    createNewMovie,
);

// Update one movie.
router.put('/movie/:id',
    // protect,
    body('actors').optional().isString(),
    body('backdroppath').optional().isString(),
    body('director').optional().isString(),
    body('formats').optional().isArray(),
    body('genre').optional().isString(),
    body('imdbid').optional().isString(),
    body('plot').optional().isString(),
    body('poster').optional().isString(),
    body('posterpath').optional().isString(),
    body('rated').optional().isString(),
    body('ratings').optional().isArray(),
    body('released').optional().isString(),
    body('runtime').optional().isString(),
    body('series').optional().isArray(),
    body('title').optional().isString(),
    body('totalSeasons').optional().isString(),
    body('type').optional().isString(),
    body('year').optional().isString(),
    body('writer').optional().isString(),
    handleInputErrors, updateMovie,
);

// Delete one movie.
router.delete('/movie/:id',
    // protect,
    deleteMovie,
);

/* Persons */

// Get all persons.
router.get('/person', getPersons);

// Get one person.
router.get('/person/:id', getOnePerson);

// Add one person.
router.post(
    '/person',
    // protect,
    body('name').isString(),
    body('imagePath').isString(),
    handleInputErrors,
    createNewPerson,
);

// Update one person.
router.put(
    '/person/:id',
    // protect,
    body('name').optional().isString(),
    body('imagePath').optional().isString(),
    handleInputErrors,
    updatePerson,
);

// Delete one person.
router.delete(
    '/person/:id',
    // protect,
    deletePerson,
);

/* Featured */
router.get('/featured', getFeatured);

export default router;
