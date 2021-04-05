import express from 'express';
import cors from 'cors';

require('dotenv').config();

import authRoutes from './auth/routes';
const server = express();

server.use(express.json());
server.use(cors());
// server.use(authRoutes);

server.get('/', (_, res) => res.json({ ok: true }));

server.listen(3333, () => {
  console.log('Server listening on port 3333! =D');
});
