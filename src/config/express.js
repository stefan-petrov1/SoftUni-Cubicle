const express = require('express');
const handlebars = require('express-handlebars');
const { attachAccessoryServiceMiddleware } = require('../services/accessory-service');
const { attachCubeServiceMiddleware } = require('../services/cube-service');

module.exports = (app) => {
  // Setup the view engine
  app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
  app.set('view engine', 'hbs');
  app.set('views', './src/views')

  // Setup the body parser
  app.use(express.urlencoded({ extended: true }));

  // Setup the static files
  app.use(express.static('./src/public'));

  // Setup middlewares
  app.use(attachAccessoryServiceMiddleware);
  app.use(attachCubeServiceMiddleware);
};