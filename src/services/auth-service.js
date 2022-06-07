const jwt = require('jsonwebtoken');
const cookieKey = 'sessionauth';

function sendAuthCookie(res, jwt) {
  res.cookie(cookieKey, jwt);
}

function createJWT(secret, value) {
  jwt.sign(value, secret, (err, signedToken) => {
    console.log(signedToken);
  });
}

exports.attachAuthServiceMiddleware = (secret) => (req, res, next) => {
  req.authService = {
    sendAuthCookie,
    createJWT: createJWT.bind(null, secret),
  }

  next();
}
