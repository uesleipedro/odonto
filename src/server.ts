import 'dotenv/config';
import { app } from './app';

const port = (process.env.PORT || '3333');

const server =
    app.listen(port, () => console.log(`running on port ${port}`));

process.on('SIGINT', () => {
    server.close();
    console.log('Connection closed');
});
