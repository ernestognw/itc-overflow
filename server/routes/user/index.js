import { Router } from 'express';
import { User } from '../../db/models';
import { getPaginateParams, paginate } from '../../utils/pagination';

const users = Router();

users.get('/', async (req, res) => {
  const { page, pageSize } = getPaginateParams(req);

  const [results, count] = await Promise.all([
    User.find({})
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .select('-password'),
    User.countDocuments({}),
  ]);

  return res.status(200).json(paginate({ results, count, params: { page, pageSize } }));
});

users.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });

  if (!user) return res.status(404).json(user);

  return res.status(200).json(user);
});

export default users;
