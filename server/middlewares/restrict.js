import jwt from 'jsonwebtoken';
import { secret } from '../config';

const restrict = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: 'Unauthorized',
      error: 'No Authorization header provided',
    });
  }
  const token = authorization.split(' ')[1];
  jwt.verify(token, secret, (err, token) => {
    if (err) {
      return res.status(401).json({
        message: 'Unauthorized',
        error: err,
      });
    }

    req.userId = token.userId;
    next();
  });
};

export default restrict;
