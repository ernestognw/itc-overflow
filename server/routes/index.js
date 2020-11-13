import { Router } from 'express';
import user from './user';
import answer from './answer';
import question from './question';
import auth from './auth';
import restrict from '../middlewares/restrict';

const api = Router();

api.get('/health', (req, res) => {
  res.status(200).send('API working');
});

api.use('/user', restrict, user);
api.use('/question', restrict, question);
api.use('/answer', restrict, answer);
api.use('/auth', auth);

export default api;
