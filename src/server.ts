import express from 'express';
import morgan from 'morgan';
import router from './router';
import { createNewUser, signin } from './handlers/user';
import { protect } from './modules/auth';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res ,next) => {
    setTimeout(() => {
        next(new Error('hello'))
    },1)
});

app.use('/api', router);

app.use('/user', protect, createNewUser);
app.use('/signin', signin);

app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'Unauthorised' });
    } else if (err.type === 'input') {
        res.status(400).json({ message: 'Invalid input' });
    } else if (err.type === 'notFound') {
        res.status(404).json({ message: 'Item not found' });
    } else {
        res.status(500).json({ message: 'Something went wrong' });
    }
})

export default app;
