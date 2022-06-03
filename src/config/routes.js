const { pageRouter } = require('../routers/page-router');
const { cubeRouter } = require('../routers/cube-router');
const { accessoryRouter } = require('../routers/accessory-router');
const pageController = require('../controllers/page-controller');

module.exports = (app) => {
  app.use('/', pageRouter);
  app.use('/cubes', cubeRouter);
  app.use('/accessories', accessoryRouter)

  app.all('*', pageController.notFound);
};
