module.exports = {
  renderLogin(req, res) {
    if (req.isAuthenticated) {
      return res.redirect('/');
    }

    res.render('loginPage');
  },

  renderRegister(req, res) {
    if (req.isAuthenticated) {
      return res.redirect('/');
    }

    res.render('registerPage');
  },

  logout(req, res) {
    req.authService.logout(res);
    res.redirect('/');
  },

  async login(req, res) {
    try {
      const jwt = await req.userService.login(req.body, req.authService);
      req.authService.sendAuthCookie(res, jwt);

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
  },
};
