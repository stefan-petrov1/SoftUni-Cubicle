module.exports = {
  async renderAttachAccessory(req, res) {
    const cube = await req.cubeService.getCubeById(req.params.id).lean();
    const accessories = await req.accessoryService.getAvailableAccessories(req.params.id);

    res.render('attachAccessory', { accessories, cube, cubeId: cube._id });
  },

  async renderCreateAccessory(req, res) {
    res.render('createAccessory');
  },

  async createAccessory(req, res) {
    try {
      await req.accessoryService.createAccessory(req.body);
      res.redirect('/');
    } catch (e) {
      res.status(400).send(e.message);
    }
  },

  async attachAccessory(req, res) {
    try {
      await req.accessoryService.attachAccessory(req.cubeService, req.params.id, req.body.accessory);
      res.redirect('/');
    } catch (e) {
      res.status(400).send(e.message);
    }
  },
};
