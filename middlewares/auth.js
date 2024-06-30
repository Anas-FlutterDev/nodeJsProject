import jwt from 'jsonwebtoken';

const auth = (requireAdmin = false) => {
  return (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, "thisismyjwtsecret");
      req.user = decoded.user;

      if (requireAdmin && !req.user.isAdmin) {
        return res.status(403).json({ msg: 'Access denied' });
      }

      next();
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };
};

export default auth;
