const User = require('../models/user-model');
const bcrypt = require('bcrypt');

const saltRounds = 10;

async function login(data, authService) {
  if (!data.username || !data.password) {
    throw new Error('Missing username/password.');
  }

  const user = await User.findOne({ username: data.username }).lean();

  if (!user) {
    throw new Error('User with that username doesn\'t exist!');
  }

  if (!await bcrypt.compare(data.password, user.password)) {
    throw new Error('Incorrect password!');
  }

  const { __v, ...publicData } = user;
  return authService.createJWT(publicData);
}

async function register(data) {
  if (!data.username || !data.password) {
    throw new Error('Missing username/password.');
  }

  if (data.password != data.repeatPassword) {
    throw new Error('Passwords must match!');
  }

  const hashPass = await bcrypt.hash(data.password, saltRounds);

  await User.create({
    ...data,
    password: hashPass
  });
}

exports.attachUserService = (req, res, next) => {
  req.userService = {
    login,
    register,
  }

  next();
}
