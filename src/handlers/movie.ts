import prisma from '../db';

// Get all movies.
export async function getMovies(req, res, next) {
    try {
        const data = await prisma.movie.findMany();
        res.json({ data });
    } catch (error) {
        next(error);
    }
}

// Get one movie.
export async function getOneMovie(req, res, next) {
    try {
        const data = await prisma.movie.findUnique({
            where: {
                id: req.params.id,
            },
        });
        console.log(data);

        res.json({ data });
    } catch (error) {
        error.type = 'notFound';
        next(error);
    }
}

// Create a movie.
export async function createNewMovie(req, res, next) {
    try {
        const data = await prisma.movie.create({
            data: {
                actors: req.body.actors,
                backdroppath: req.body.backdroppath,
                director: req.body.director,
                formats: req.body.formats,
                genre: req.body.genre,
                imdbid: req.body.imdbid,
                plot: req.body.plot,
                poster: req.body.poster,
                posterpath: req.body.posterpath,
                rated: req.body.rated,
                ratings: req.body.ratings,
                released: req.body.released,
                runtime: req.body.runtime,
                series: req.body.series,
                title: req.body.title,
                totalSeasons: req.body.totalSeasons,
                type: req.body.type,
                year: req.body.year,
                writer: req.body.writer,
            },
        });

        res.json({ data });
    } catch (error) {
        next(error);
    }
}

// Update one movie.
export async function updateMovie(req, res, next) {
    try {
        const data = await prisma.movie.update({
            where: {
                id: req.params.id,
            },
            data: req.body,
        });

        res.json({ data });
    } catch (error) {
        next(error);
    }
}

// Delete one movie.
export async function deleteMovie(req, res, next) {
    try {
        const data = await prisma.movie.delete({
            where: {
                id: req.params.id,
            },
        });

        res.json({ data });
    } catch (error) {
        next(error);
    }
}

// Get featured movie and tv show.
export async function getFeatured(req, res, next) {
    try {
        const all = await prisma.movie.findMany();
        const movies = await all.filter(item => item.type === 'movie');
        const series = await all.filter(item => item.type === 'series');

        const daysSinceEpoch = Math.floor(Date.now() / 86400000);

        // Set the main featured item.
        const featuredIndex = daysSinceEpoch % all.length;
        const featured = all[featuredIndex];

        // Set the featured movie.
        const movieIndex = daysSinceEpoch % movies.length;
        const featuredMovie = movies[movieIndex];

        // Set the featured series.
        const seriesIndex = daysSinceEpoch % series.length;
        const featuredSeries = series[seriesIndex];

        const data = {
            featured,
            featuredMovie,
            featuredSeries,
        };

        res.json({ data });
    } catch (error) {
        next(error);
    }
}
