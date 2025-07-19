import prisma from '../db';

// Get all persons.
export async function getPersons(req, res, next) {
    try {
        const data = await prisma.person.findMany();
        res.json({ data });
    } catch (error) {
        next(error);
    }
}

// Get one person.
export async function getOnePerson(req, res, next) {
    try {
        const data = await prisma.person.findUnique({
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

// Create a person.
export async function createNewPerson(req, res, next) {
    console.log('req', req);
    try {
        const data = await prisma.person.create({
            data: {
                name: req.body.name,
                imagePath: req.body.imagePath,
            },
        });

        res.json({ data });
    } catch (error) {
        next(error);
    }
}

// Update one person.
export async function updatePerson(req, res, next) {
    try {
        const data = await prisma.person.update({
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

// Delete one person.
export async function deletePerson(req, res, next) {
    try {
        const data = await prisma.person.delete({
            where: {
                id: req.params.id,
            },
        });

        res.json({ data });
    } catch (error) {
        next(error);
    }
}
