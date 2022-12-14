import express from 'express';
import morgan from 'morgan';
// import router from './router';
import { createNewUser, signin } from './handlers/user';
import { protect } from './modules/auth';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'hello' });
});

// app.use('/api', router);

app.use('/user', protect, createNewUser);
app.use('/signin', signin);

export default app;
