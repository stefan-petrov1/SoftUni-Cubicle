module.exports = {
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
      await req.accessoryService.attachAccessory(req.cubeService, req.params.cubeId, req.body.accessory);
      res.redirect('/');
    } catch (e) {
      res.status(400).send(e.message);
    }
  },
};
