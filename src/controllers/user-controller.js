module.exports = {
  renderLogin(req, res) {
    res.render('loginPage');
  },

  renderRegister(req, res) {
    res.render('registerPage');
  },

  async login(req, res) {
    try {
      const jwt = await req.userService.login(req.body);
      res.cookie('session', jwt, { httpOnly: true });

      res.redirect('/');
    } catch (e) {
      res.status(400).send(e.message);
    }
  },

  async register(req, res) {
    try {
      await req.userService.register(req.body);
      res.redirect('/users/login');
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
};
