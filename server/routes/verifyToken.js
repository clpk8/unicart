const jwt = require('jsonwebtoken');

require('dotenv/config');

module.exports = function verifyToken(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verifiedUser;
    next();
  } catch (err) {
    res.status(400).send("Invalid auth token");
  }
}
