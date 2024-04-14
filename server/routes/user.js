const express = require('express');
const router = express.Router();

const { updateUser, getUser, deleteUser } = require('../controllers/user');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/get-user/:userId', authenticateToken, getUser);
router.put('/update-user/:userId', authenticateToken, updateUser);
router.delete('/delete-user/:userId', authenticateToken, deleteUser);

module.exports = router;