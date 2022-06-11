const authMiddleware = (req, res, next) => {
  req.isAuthenticated = true;
  res.locals.isAuthenticated = req.isAuthenticated;

  next();
}

exports.authMiddleware = authMiddleware;
