const router = require('express').Router();
const userController = require('../controllers/user.controller');
//importing auth middleware
const authMiddleware = require('../middlewares/auth.middleware');
//router for registration
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
// protected routes
//getting all users
router.get('/',authMiddleware, userController.getAllUsers);
module.exports = router;