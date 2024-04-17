const express = require('express');
const router = express.Router();

const { getAllBlogs, getSingleBlog, getFilteredBlogs, createBlog, updateBlog, deleteBlog } = require('../controllers/blog');
const validateSession = require('../middlewares/validateSession');

router.get('/get-all-blogs', getAllBlogs);
router.get('/get-single-blog/:blogId', getSingleBlog);
router.get('/get-filtered-blogs', getFilteredBlogs);
router.post('/create-blog', validateSession, createBlog);
router.put('/update-blog/:blogId', validateSession, updateBlog);
router.delete('/delete-blog/:blogId', validateSession, deleteBlog);

module.exports = router;