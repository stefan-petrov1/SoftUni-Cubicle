module.exports = {
  async index(req, res) {
    res.locals.title = 'Browse';
    const cubes = await req.cubeService.getCubes();
    res.render('index', { cubes });
  },

  create(req, res) {
    res.locals.title = 'Create';
    res.render('create');
  },

  about(req, res) {
    res.locals.title = 'About';
    res.render('about');
  },

  async details(req, res) {
    res.locals.title = 'Cube Details';

    const cubeId = req.params.id;

    const cube = await req.cubeService.getCubeById(cubeId).lean();
    const cubeAccessories = await req.cubeService.getCubeAccessories(cubeId, req.accessoryService);

    res.render('details', { cube, cubeAccessories });
  },

  async attachAccessory(req, res) {
    res.locals.title = 'Attach Accessory';
    const cube = await req.cubeService.getCubeById(req.params.id).lean();
    const accessories = await req.accessoryService.getAvailableAccessories(req.params.id);

    res.render('attachAccessory', { accessories, cube, cubeId: cube._id });
  },

  async createAccessory(req, res) {
    res.locals.title = 'Create Accessory';
    res.render('createAccessory');
  },

  notFound(req, res) {
    res.locals.title = '404 - Not Found';
    res.render('404');
  },
};
