const jsonwebtoken = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const userData = await req.authService.getSessionData(req.cookies);

  req.user = userData;
  res.locals.isAuthenticated = Boolean(userData);

  next();
}

exports.authMiddleware = authMiddleware;
