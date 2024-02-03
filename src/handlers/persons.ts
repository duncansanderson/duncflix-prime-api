import prisma from "../db";

// Get all persons.
export const getPersons = async (req, res, next) => {
    try {
        const data = await prisma.person.findMany();
        res.json({ data });
    } catch (error) {
        next(error);
    }
};

// Get one person.
export const getOnePerson = async (req, res, next) => {
    try {
        const data = await prisma.person.findUnique({
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

// Create a person.
export const createNewPerson = async (req, res, next) => {
    console.log('req', req)
    try {
        const data = await prisma.person.create({
            data: {
                name: req.body.name,
                imagePath: req.body.imagePath,
            },
        });

        res.json({ data });
    } catch(error) {
        next(error)
    }
};

// Update one person.
export const updatePerson = async (req, res, next) => {
    try {
        const data = await prisma.person.update({
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

// Delete one person.
export const deletePerson = async (req, res, next) => {
    try {
        const data = await prisma.person.delete({
            where: {
                id: req.params.id
            },
        });

        res.json({ data });
    } catch(error) {
        next(error);
    }
};
