const cookieParser = require('cookie-parser');
const express = require('express');
const handlebars = require('express-handlebars');
const { authMiddleware } = require('../middlewares/auth-middleware');
const { attachAccessoryServiceMiddleware } = require('../services/accessory-service');
const { attachAuthServiceMiddleware } = require('../services/auth-service');
const { attachCubeServiceMiddleware } = require('../services/cube-service');
const { attachUserService } = require('../services/user-service');

module.exports = (app, config) => {
  // Setup the view engine
  app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
  app.set('view engine', 'hbs');
  app.set('views', './src/views')

  // Setup the body parser
  app.use(express.urlencoded({ extended: true }));

  // Setup the static files
  app.use(express.static('./src/public'));

  // Setup cookie parser
  app.use(cookieParser(config.COOKIE_SECRET));

  // Setup middlewares
  app.use(attachAccessoryServiceMiddleware);
  app.use(attachCubeServiceMiddleware);
  app.use(attachUserService(config.JWT_SECRET));

  app.use(authMiddleware)
  app.use(attachAuthServiceMiddleware(config.JWT_SECRET));
};