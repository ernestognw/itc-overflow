import { Router } from 'express';

const answers = Router();

answers.get('/', (req, res) => {
  res.status(200).send('Answers requested');
});

export default answers;
