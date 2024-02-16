const express = require('express');
const router = express.Router();

const { getAllBlogs, getSingleBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blogs');
const { authenticateToken } = require('../controllers/jwt-token');

router.get('/get-all-blogs', getAllBlogs);
router.get('/get-single-blog/:blogId', getSingleBlog);
router.post('/create-blog', authenticateToken, createBlog);
router.put('/update-blog/:blogId', authenticateToken, updateBlog);
router.delete('/delete-blog/:blogId', authenticateToken, deleteBlog);

module.exports = router;