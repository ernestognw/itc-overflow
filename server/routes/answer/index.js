import { Router } from 'express';
import { Answer, Question } from '../../db/models';
import { getPaginateParams, paginate } from '../../utils/pagination';

const answers = Router();

answers.get('/', async (req, res) => {
  const { page, pageSize } = getPaginateParams(req);

  const [results, count] = await Promise.all([
    Answer.find({})
      .skip(pageSize * (page - 1))
      .limit(pageSize),
    Answer.countDocuments({}),
  ]);

  return res.status(200).json(paginate({ results, count, params: { page, pageSize } }));
});

answers.get('/:id', async (req, res) => {
  const { id } = req.params;
  const answer = await Answer.findOne({ _id: id });

  if (!answer) return res.status(404).json(answer);

  return res.status(200).json(answer);
});

answers.post('/', async (req, res) => {
  const { questionId, content } = req.body;

  const answer = new Answer({ user: req.userId, content });
  await Question.updateOne({ _id: questionId }, { $push: { answers: answer } });
  answer.save();

  return res.status(200).json(answer);
});

export default answers;
