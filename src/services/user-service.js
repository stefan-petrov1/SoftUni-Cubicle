const User = require('../models/user-model');

function login(res, jwt) {
  console.log('logging');
}

function register(secret, value) {
  console.log('register');
}

exports.attachUserService = (req, res, next) => {
  req.authService = {
    login,
    register
  }

  next();
}
