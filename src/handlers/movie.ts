import prisma from "../db";

// Get all movies.
export const getMovies = async (req, res, next) => {
    try {
        const data = await prisma.movie.findMany();
        res.json({ data });
    } catch (error) {
        next(error);
    }
};

// Get one movie.
export const getOneMovie = async (req, res, next) => {
    try {
        const data = await prisma.movie.findUnique({
            where: {
                id: req.params.id,
            }
        });
        console.log(data)

        res.json({ data });
    } catch(error) {
        error.type = 'notFound';
        next(error);
    }
};

// Create a movie.
export const createNewMovie = async (req, res, next) => {
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
    } catch(error) {
        next(error)
    }
};

// Update one movie.
export const updateMovie = async (req, res, next) => {
    try {
        const data = await prisma.movie.update({
            where: {
                id: req.params.id,
            },
            data: req.body,
        });

        res.json({ data });
    } catch(error) {
        next(error);
    }
};

// Delete one movie.
export const deleteMovie = async (req, res, next) => {
    try {
        const data = await prisma.movie.delete({
            where: {
                id: req.params.id
            },
        });

        res.json({ data });
    } catch(error) {
        next(error);
    }
};
