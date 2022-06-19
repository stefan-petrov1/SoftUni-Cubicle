const jwt = require('jsonwebtoken');

exports.jwtSign = (value, secret, options = {}) =>
  new Promise((resolve, reject) => {
    jwt.sign(value, secret, options, (err, signedValue) => {
      if (err) {
        reject(err);
      } else {
        resolve(signedValue);
      }
    });
  });


exports.jwtVerify = (token, secret, options = {}) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, options, (err, decodedValue) => {
      if (err) {
        reject(err);
      } else {
        resolve(decodedValue);
      }
    });
  });
