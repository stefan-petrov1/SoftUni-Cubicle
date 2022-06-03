module.exports = {
  async index(req, res) {
    const cubes = await req.cubeService.getCubes();
    res.render('index', { cubes });
  },

  about(req, res) {
    res.render('about');
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
