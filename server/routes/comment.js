const express = require('express');
const router = express.Router();
const validateSession = require('../middlewares/validateSession');
const { createComment, deleteComment, updateComment } = require('../controllers/comment');

router.post('/create-comment', validateSession, createComment);
router.put('/update-comment/:commentId', validateSession, updateComment);
router.delete('/delete-comment/:commentId', validateSession, deleteComment);

module.exports = router;