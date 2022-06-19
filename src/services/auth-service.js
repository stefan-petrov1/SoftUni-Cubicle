const { jwtVerify, jwtSign } = require('../utils/jwt-utils');
const cookieKey = 'session';

const cookieMaxAgeHours = 48;
const jwtExpireTime = `${cookieMaxAgeHours}h`

function sendAuthCookie(res, jwt) {
  res.cookie(cookieKey, jwt, { maxAge: cookieMaxAgeHours * 60 * 60 * 1000, httpOnly: true });
}

function createJWT(secret, value) {
  return jwtSign(value, secret, { expiresIn: jwtExpireTime });
}

async function getSessionData(secret, cookies) {
  const sessionToken = cookies[cookieKey];

  try {
    const { iat, exp, ...publicSessionData } = await jwtVerify(sessionToken, secret);
    return publicSessionData;
  } catch (err) {
    return undefined;
  }
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
