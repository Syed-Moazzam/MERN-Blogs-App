const express = require('express');
const router = express.Router();

const { updateUser, getUser, deleteUser } = require('../controllers/users');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/get-user', authenticateToken, getUser);
router.put('/update-user', authenticateToken, updateUser);
router.delete('/delete-user', authenticateToken, deleteUser);

module.exports = router;