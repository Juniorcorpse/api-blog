import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static('public'));

server.get('/api/ping', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});