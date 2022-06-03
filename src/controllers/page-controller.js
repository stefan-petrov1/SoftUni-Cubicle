module.exports = {
  async index(req, res) {
    const cubes = await req.cubeService.getCubes();
    res.render('index', { cubes });
  },

  create(req, res) {
    res.render('create');
  },

  about(req, res) {
    res.render('about');
  },

  async details(req, res) {
    const cubeId = req.params.id;

    const cube = await req.cubeService.getCubeById(cubeId).lean();
    const cubeAccessories = await req.cubeService.getCubeAccessories(cubeId, req.accessoryService);

    res.render('details', { cube, cubeAccessories });
  },

  async attachAccessory(req, res) {
    const cube = await req.cubeService.getCubeById(req.params.id).lean();
    const accessories = await req.accessoryService.getAvailableAccessories(req.params.id);

    res.render('attachAccessory', { accessories, cube, cubeId: cube._id });
  },

  async createAccessory(req, res) {
    res.render('createAccessory');
  },

  notFound(req, res) {
    res.render('404');
  },
};
