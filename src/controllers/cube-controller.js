module.exports = {
  async searchCubes(req, res) {
    try {
      if (!req.body.search && !req.body.from && !req.body.to) {
        return res.redirect('/');
      }

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
