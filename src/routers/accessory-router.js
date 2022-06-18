const router = require('express').Router();
const accessoryController = require('../controllers/accessory-controller');
const { allowAuthenticatedMiddleware } = require('../middlewares/allow-authenticated-middleware');

router.use(allowAuthenticatedMiddleware);
router.get('/create', accessoryController.renderCreateAccessory);
router.get('/attach/:id', accessoryController.renderAttachAccessory);

router.post('/create', accessoryController.createAccessory)
router.post('/attach/:id', accessoryController.attachAccessory)

exports.accessoryRouter = router;
