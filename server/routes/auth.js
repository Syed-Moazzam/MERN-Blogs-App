const express = require('express');
const router = express.Router();

const { signup, login, logout } = require('../controllers/auth');
const validateSession = require('../middlewares/validateSession');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', validateSession, logout);

module.exports = router;