const router = require('express').Router();
const pageController = require('../controllers/page-controller');

router.get('/', pageController.index);
router.get('/about', pageController.about);

exports.pageRouter = router;
