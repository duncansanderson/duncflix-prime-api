import config from './config';
import app from './server';

app.listen(config.port, () => {
    console.log(`Hello from http://localhost:${config.port}`);
});
