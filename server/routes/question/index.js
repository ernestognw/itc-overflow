import { Router } from 'express';
import { Question } from '../../db/models';
import { getPaginateParams, paginate } from '../../utils/pagination';

const questions = Router();

questions.get('/', async (req, res) => {
  const { page, pageSize } = getPaginateParams(req);

  const [results, count] = await Promise.all([
    Question.find({}, projection)
      .skip(pageSize * (page - 1))
      .limit(pageSize),
    Question.countDocuments({}),
  ]);

  return res
    .status(200)
    .json(paginate({ results, count, params: { page, pageSize } }));
});

questions.get('/:id', async (req, res) => {
  const { id } = req.params;
  const question = await Question.findOne({ _id: id });

  if (!question) return res.status(404).json(question);

  return res.status(200).json(question);
});

export default questions;
