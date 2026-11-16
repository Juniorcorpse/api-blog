import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { mainRouters } from './routes/main';
import { authRouters } from './routes/auth';
import { admRouters } from './routes/admin';

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static('public'));

server.use('/api/auth', authRouters);
server.use('/api/admin', admRouters);
server.use('/api', mainRouters);

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});