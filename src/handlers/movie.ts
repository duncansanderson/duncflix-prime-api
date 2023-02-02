import prisma from "../db";

// Get all movies.
export const getMovies = async (req, res) => {
    const movies = await prisma.movie.findMany();

    res.json({ movies });
};

// Get one movie.
export const getOneMovie = async (req, res) => {
    const movie = await prisma.movie.findUnique({
        where: {
            id: req.params.id,
        }
    });

    res.json({ movie });
};

// Create a movie.
export const createNewMovie = async (req, res) => {
    const movie = await prisma.movie.create({
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

    res.json({ movie });
};

// Update one movie.
export const updateMovie = async (req, res) => {
    const movie = await prisma.movie.update({
        where: {
            id: req.params.id,
        },
        data: req.body,
    });

    res.json({ movie });
};

// Delete one movie.
export const deleteMovie = async (req, res) => {

    const movie = await prisma.movie.delete({
        where: {
            id: req.params.id
        },
    });

    res.json({ movie });
};
