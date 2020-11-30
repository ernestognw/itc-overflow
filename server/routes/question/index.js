import { Router } from 'express';
import { Question } from '../../db/models';
import { getPaginateParams, paginate } from '../../utils/pagination';

const questions = Router();

questions.get('/', async (req, res) => {
  const { user, sortBy, order, searchBy, search } = req.query;
  const { page, pageSize } = getPaginateParams(req);

  const query = {};

  if (user) query.user = user;

  if (searchBy && searchBy.split(',').length > 0 && search) {
    query.$or = [];

    searchBy.split(',').forEach((searchByField) => {
      query.$or.push({ [searchByField]: new RegExp(search, 'i') });
    });
  }

  const questionPromise = Question.find(query)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .populate('user');

  if (sortBy && order) questionPromise.sort({ [sortBy]: order });

  const [results, count] = await Promise.all([questionPromise, Question.countDocuments(query)]);

  return res.status(200).json(paginate({ results, count, params: { page, pageSize } }));
});

questions.get('/:id', async (req, res) => {
  const { id } = req.params;
  const question = await Question.findOne({ _id: id }).populate({
    path: 'answers',
    populate: { path: 'user' },
  });

  if (!question) return res.status(404).json(question);

  return res.status(200).json(question);
});

questions.post('/', async (req, res) => {
  const { title, content } = req.body;

  const question = new Question({ user: req.userId, title, content });

  await question.save();

  return res.status(200).json(question);
});

export default questions;
