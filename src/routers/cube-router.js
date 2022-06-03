const cubeController = require('../controllers/cube-controller');
const router = require('express').Router();

router.get('/create', cubeController.renderCreate);
router.get('/:id', cubeController.renderCubeDetails);

router.post('/search', cubeController.searchCubes);
router.post('/create', cubeController.createCube);

exports.cubeRouter = router;
