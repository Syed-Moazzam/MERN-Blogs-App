const express = require('express');
const router = express.Router();

const { signup, login, logout } = require('../controllers/auth');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', authenticateToken, logout);

module.exports = router;