const express = require('express');
const router = express.Router();

const authenticateToken = require('../middlewares/authenticateToken');
const { sendEmail } = require('../controllers/email');

router.post('/send-email', authenticateToken, sendEmail);

module.exports = router;