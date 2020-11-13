import { Router } from 'express';
import { Question } from '../../db/models';
import { getPaginateParams, paginate } from '../../utils/pagination';

const questions = Router();

questions.get('/', async (req, res) => {
  const { user } = req.query;
  const { page, pageSize } = getPaginateParams(req);

  const query = {};

  if (user) query.user = user;

  const [results, count] = await Promise.all([
    Question.find(query)
      .skip(pageSize * (page - 1))
      .limit(pageSize),
    Question.countDocuments({}),
  ]);

  return res.status(200).json(paginate({ results, count, params: { page, pageSize } }));
});

questions.get('/:id', async (req, res) => {
  const { id } = req.params;
  const question = await Question.findOne({ _id: id });

  if (!question) return res.status(404).json(question);

  return res.status(200).json(question);
});

export default questions;
