const router = require('express').Router();
const pageController = require('../controllers/page-controller');

router.get('/', pageController.index);
router.get('/about', pageController.about);
router.get('/create/cube', pageController.create);
router.get('/details/:id', pageController.details);

router.get('/create/accessory', pageController.createAccessory);
router.get('/attach/accessory/:id', pageController.attachAccessory);

exports.pageRouter = router;
