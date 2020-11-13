import jwt from 'jsonwebtoken';
import { secret } from '../config';

const restrict = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({
      message: 'Unauthorized',
      error: 'No Authorization header provided',
    });
    return;
  }
  const token = authorization.split(' ')[1];

  jwt.verify(token, secret, (err, payload) => {
    if (err) {
      res.status(401).json({
        message: 'Unauthorized',
        error: err,
      });
      return;
    }

    req.userId = payload.userId;
    next();
  });
};

export default restrict;
