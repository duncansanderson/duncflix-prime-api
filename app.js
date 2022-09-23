import express, { json, urlencoded } from 'express';
import routes from './routes/index.js';

// Create the express app.
const app = express();

// Takes the raw requests and turns them into usable properties on req.body.
app.use(json());
app.use(urlencoded({ extended: true }));

// Handle routes.
app.use('/', routes);

export default app;
