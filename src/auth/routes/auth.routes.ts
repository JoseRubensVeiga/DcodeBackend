import { Router } from 'express';
import jwt from 'jsonwebtoken';

const routes = Router();

routes.post('', (req, res) => {
  // código exemplo para autenticação JWT

  const id = 1;
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });
  return res.json({ auth: true, token: token });
});

routes.get('', (req, res) => {
  return res.json({ message: 'ok' });
});

export default routes;
