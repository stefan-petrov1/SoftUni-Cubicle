const router = require('express').Router();
const userController = require('../controllers/user-controller');

router.get('/login', userController.renderLogin);
router.get('/register', userController.renderRegister);

router.post('/login', userController.login);
router.post('/register', userController.register);

exports.userRouter = router;
