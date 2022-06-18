const allowAuthenticatedMiddleware = (req, res, next) => {
  if (!req.isAuthenticated) {
    return res.redirect('/');
  }

  next();
}

exports.allowAuthenticatedMiddleware = allowAuthenticatedMiddleware;
