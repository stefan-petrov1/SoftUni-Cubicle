const authMiddleware = async (req, res, next) => {
  const userData = await req.authService.getSessionData(req.cookies);

  req.user = userData;
  req.isAuthenticated = Boolean(userData);
  res.locals.isAuthenticated = req.isAuthenticated;

  next();
}

exports.authMiddleware = authMiddleware;
