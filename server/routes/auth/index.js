import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { hashSync as hash, compareSync as comparePasswords } from 'bcryptjs';
import { User } from '../../db/models';
import { secret } from '../../config';

const auth = Router();

auth.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = new User({
      firstName,
      lastName,
      email,
      password: hash(password, 10),
    });

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: 86400 });

    await user.save();

    res.status(201).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

auth.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !comparePasswords(password, user.password)) {
    res.status(401).json({
      message: 'Login failed',
      error: "Email and password don't match",
    });
    return;
  }

  const token = jwt.sign({ userId: user.id }, secret, { expiresIn: 86400 });

  res.status(200).json({
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    token,
  });
});

export default auth;
