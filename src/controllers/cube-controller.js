module.exports = {
  renderCreate(req, res) {
    res.render('create');
  },

  async renderCubeDetails(req, res) {
    const cubeId = req.params.id;

    const cube = await req.cubeService.getCubeById(cubeId).lean();
    const cubeAccessories = await req.cubeService.getCubeAccessories(cubeId, req.accessoryService);
    const isOwner = req.user?._id == cube.creatorId;

    res.render('details', { cube, isOwner, cubeAccessories });
  },

  async renderEditCube(req, res) {
    const cube = await req.cubeService.getCubeById(req.params.id).lean();
    if (req.user?._id != cube.creatorId) {
      return res.redirect('/');
    }

    console.log(cube);
    res.render('editCubePage', { cube });
  },

  renderDeleteCube(req, res) {
    res.render('deleteCubePage');
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
