const router = require('express').Router();
const accessoryController = require('../controllers/accessory-controller');

router.get('/create', accessoryController.renderCreateAccessory);
router.get('/attach/:id', accessoryController.renderAttachAccessory);

router.post('/create', accessoryController.createAccessory)
router.post('/attach/:id', accessoryController.attachAccessory)

exports.accessoryRouter = router;
