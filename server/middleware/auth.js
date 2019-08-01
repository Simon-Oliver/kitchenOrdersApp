const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  // Check for token
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Authorization denied.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(400).json({ error: 'Token is not valid.' });
  }
}

module.exports = auth;
