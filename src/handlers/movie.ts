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
            director: req.body.director,
            genre: req.body.genre,
            plot: req.body.plot,
            poster: req.body.poster,
            rated: req.body.rated,
            ratings: req.body.ratings,
            released: req.body.released,
            runtime: req.body.runtime,
            title: req.body.title,
            type: req.body.type,
            year: req.body.year,
            writer: req.body.writer,
            formats: req.body.formats,
            belongsToId: req.user.id,
        },
    });

    res.json({ movie });
};
