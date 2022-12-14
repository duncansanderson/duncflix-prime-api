import { body, validationResult } from "express-validator";

export const handleInputErrors = (req, res, next) => {
    console.log('butter')
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
    } else {
        next();
    }
};
