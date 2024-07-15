import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = (isAdminRequired = false, isSelfOrAdmin = false) => async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, "test_secret");
    req.user = decoded.user;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ msg: 'User does not exist' });
    }

    if (isAdminRequired && !user.isAdmin) {
      return res.status(403).json({ msg: 'Admin resource. Access denied' });
    }

    if (isSelfOrAdmin && req.params.id && req.params.id !== req.user.id && !user.isAdmin) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default auth;
