const Router = require('express').Router;
const { registration, login, logout, activate, refresh, getUsers } = require('../controllers/user-controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

router.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 64 }),
    registration,
);
router.post('/login', login);
router.post('/logout', logout);
router.get('/activate/:link', activate);
router.get('/refresh', refresh);
router.get('/users', authMiddleware, getUsers);

module.exports = router;
