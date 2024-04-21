const express = require('express');
const router = express.Router();
const validateSession = require('../middlewares/validateSession');
const { createComment, deleteComment } = require('../controllers/comment');

router.post('/create-comment', validateSession, createComment);
router.delete('/delete-comment/:commentId', validateSession, deleteComment);

module.exports = router;