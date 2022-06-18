const authMiddleware = (req, res, next) => {
  // DEBUG PURSOSES
  req.isAuthenticated = false;
  res.locals.isAuthenticated = req.isAuthenticated;

  next();
}

exports.authMiddleware = authMiddleware;
