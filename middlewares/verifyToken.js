const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config({path : '.env.local'});
const tokenKey = process.env.TOKEN_KEY;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (req.originalUrl === '/user/auth') {
    return next();
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token non fourni', err });
  }
  const tokenParts = authHeader.split(' ');
  const token = tokenParts[1];

  if (!token) {
    return res.status(401).json({ message: 'Token non fourni', err });
  }
  jwt.verify(token, tokenKey, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide', err });
    }
    next();
  });
};

module.exports = verifyToken;
