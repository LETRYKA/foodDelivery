import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../../config/env.js';
import User from '../models/user_schema.js';

export const authorize = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const decoded = jwt.verify(token, TOKEN_SECRET)
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.user = user;
    next();

  }
  catch (err) {
    return res.status(401).json({ message: 'Unauthorized', error: err.message })
  }
}
