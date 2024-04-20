const express = require('express');
const router = express.Router();
const validateSession = require('../middlewares/validateSession');
const { getSingleBlogComments, createComment } = require('../controllers/comment');

router.get('/get-single-blog-comments/:blogId', getSingleBlogComments);
router.get('/create-comment', validateSession, createComment);

module.exports = router;