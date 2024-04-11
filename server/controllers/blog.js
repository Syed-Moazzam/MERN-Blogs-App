const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
    try {
        const decodedUser = req.user;
        await Blog.create({
            authorId: decodedUser?._id,
            authorEmail: decodedUser?.email,
            title: req.body?.title,
            category: req.body?.category,
            story: req.body?.story,
            blogImg: req.body?.blogImg
        });
        res.send({ status: 'success', message: 'Blog Created Successfully!' });
    }
    catch (error) {
        res.status(505).send({ status: 'error', message: error.message });
    }
}

exports.getAllBlogs = async (req, res) => {
    try {
        let blogs = null;
        const { category } = req.query;
        if (category) {
            blogs = await Blog.find({ category });
        }
        else {
            blogs = await Blog.find();
        }
        res.send({ status: 'success', data: blogs });
    } catch (error) {
        res.status(505).send({ status: 'error', message: error.message });
    }
}

exports.getSingleBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findOne({ _id: blogId });
        res.send({ status: 'success', data: blog });
    } catch (error) {
        res.status(505).send({ status: 'error', message: error.message });
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const decodedUser = req.user;
        if (req.body.userId === decodedUser?._id) {
            const { blogId } = req.params;
            const updatedBlog = await Blog.findByIdAndUpdate({ _id: blogId }, { $set: req.body }, { new: true });
            res.send({ status: 'success', data: updatedBlog });
        }
        else {
            res.send({ status: 'error', message: "You Can Only Update Your Own Blogs!" });
        }
    }
    catch (error) {
        res.status(505).send({ status: 'error', message: error.message });
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const decodedUser = req.user;
        if (req.body.userId === decodedUser?._id) {
            const { blogId } = req.params;
            const deletedBlog = await Blog.findByIdAndDelete({ _id: blogId }, { new: true });
            res.send({ status: 'success', data: deletedBlog });
        }
        else {
            res.send({ status: 'error', message: 'You Can Only Delete Your Own Blogs!' });
        }
    }
    catch (error) {
        res.status(505).send({ status: 'error', message: error.message });
    }
}