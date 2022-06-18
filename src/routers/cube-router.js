const cubeController = require('../controllers/cube-controller');
const { allowAuthenticatedMiddleware } = require('../middlewares/allow-authenticated-middleware');
const router = require('express').Router();

router.get('/create', allowAuthenticatedMiddleware, cubeController.renderCreate);
router.get('/:id', cubeController.renderCubeDetails);

router.get('/edit/:id', allowAuthenticatedMiddleware, cubeController.renderEditCube);
router.get('/delete/:id', allowAuthenticatedMiddleware, cubeController.renderDeleteCube);

router.post('/search', cubeController.searchCubes);
router.post('/create', allowAuthenticatedMiddleware, cubeController.createCube);

router.post('/delete/:id', allowAuthenticatedMiddleware, cubeController.deleteCube);
router.post('/edit/:id', allowAuthenticatedMiddleware, cubeController.editCube);

exports.cubeRouter = router;
