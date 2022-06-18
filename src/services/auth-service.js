const jwt = require('jsonwebtoken');
const cookieKey = 'session';

const cookieMaxAgeHours = 48;
const jwtExpireTime = `${cookieMaxAgeHours}h`

function sendAuthCookie(res, jwt) {
  res.cookie(cookieKey, jwt, { maxAge: cookieMaxAgeHours * 60 * 60 * 1000, httpOnly: true });
}

function createJWT(secret, value) {
  return new Promise((resolve, reject) => {
    jwt.sign(value, secret, { expiresIn: jwtExpireTime }, (err, signedToken) => {
      if (err) {
        return reject(err);
      }

      resolve(signedToken);
    });
  });
}

async function getSessionData(secret, cookies) {
  const sessionToken = cookies[cookieKey];

  const token = await new Promise((resolve, reject) => {
    jwt.verify(sessionToken, secret, (err, decodedToken) => {
      if (err) {
        return resolve(undefined);
      }

      const { iat, exp, ...publicTokenData } = decodedToken;
      resolve(publicTokenData);
    });
  });

  return token;
}

function logout(res) {
  res.clearCookie(cookieKey);
}

exports.attachAuthServiceMiddleware = (secret) => (req, res, next) => {
  req.authService = {
    sendAuthCookie,
    createJWT: createJWT.bind(null, secret),
    getSessionData: getSessionData.bind(null, secret),
    logout
  };

  next();
}
