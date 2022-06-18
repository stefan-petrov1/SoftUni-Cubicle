const jwt = require('jsonwebtoken');
const cookieKey = 'sessionauth';

const cookieMaxAgeHours = 48;
const jwtExpireTime = `${cookieMaxAgeHours}h`

function sendAuthCookie(res, jwt) {
  res.cookie(cookieKey, jwt, { maxAge: cookieMaxAgeHours * 60 * 1000, httpOnly: true });
}

function createJWT(secret, value) {
  return new Promise((resolve, reject) => {
    jwt.sign(value, secret, { expiresIn: jwtExpireTime }, (err, signedToken) => {
      if (err) {
        return reject(err);
      }

      resolve(signedToken);
    });
  })
}

exports.attachAuthServiceMiddleware = (secret) => (req, res, next) => {
  req.authService = {
    sendAuthCookie,
    createJWT: createJWT.bind(null, secret),
  }

  next();
}
