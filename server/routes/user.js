const express = require('express');
const router = express.Router();

const { updateUser, getUser, deleteUser } = require('../controllers/user');
const validateSession = require('../middlewares/validateSession');

router.get('/get-user/:userId', validateSession, getUser);
router.put('/update-user/:userId', validateSession, updateUser);
router.delete('/delete-user/:userId', validateSession, deleteUser);

module.exports = router;