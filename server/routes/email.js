const express = require('express');
const router = express.Router();

const { sendEmail } = require('../controllers/email');
const validateSession = require('../middlewares/validateSession');

router.post('/send-email', validateSession, sendEmail);

module.exports = router;