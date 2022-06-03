const cubeController = require('../controllers/cube-controller');
const router = require('express').Router();

router.post('/search', cubeController.searchCubes);
router.post('/create', cubeController.createCube);

exports.cubeRouter = router;
