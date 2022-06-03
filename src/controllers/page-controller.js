module.exports = {
  async index(req, res) {
    const cubes = await req.cubeService.getCubes();
    res.render('index', { cubes });
  },

  about(req, res) {
    res.render('about');
  },

  notFound(req, res) {
    res.render('404');
  },
};
