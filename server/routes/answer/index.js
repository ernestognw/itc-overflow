import { Router } from 'express';
import { Answer } from '../../db/models';
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

export default answers;
