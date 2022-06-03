module.exports = {
  renderCreate(req, res) {
    res.render('create');
  },

  async renderCubeDetails(req, res) {
    const cubeId = req.params.id;

    const cube = await req.cubeService.getCubeById(cubeId).lean();
    const cubeAccessories = await req.cubeService.getCubeAccessories(cubeId, req.accessoryService);

    res.render('details', { cube, cubeAccessories });
  },

  async searchCubes(req, res) {
    try {
      const cubes = await req.cubeService.searchCube(req.body);
      res.render('index', { cubes });
    } catch (e) {
      res.status(400).send(e.message);
    }
  },

  async createCube(req, res) {
    try {
      await req.cubeService.addCube(req.body);
      res.redirect('/');
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
}
