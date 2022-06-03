const router = require('express').Router();
const accessoryController = require('../controllers/accessory-controller');

router.post('/create', accessoryController.createAccessory)
router.post('/attach/:cubeId', accessoryController.attachAccessory)

exports.accessoryRouter = router;
