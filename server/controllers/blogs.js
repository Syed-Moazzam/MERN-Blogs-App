const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
    try {
        const newBlog = await Blog.create({
            authorName: req.body?.authorName,
            authorEmail: req.body?.authorEmail,
            title: req.body?.title,
            category: req.body?.category,
            story: req.body?.story,
            blogImg: req.body?.blogImg
        });
        res.send({ status: 'success', data: newBlog });
    }
    catch (error) {
        console.log(error.message);
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
        console.log(error.message);
    }
}

exports.getSingleBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findOne({ _id: blogId });
        res.send({ status: 'success', data: blog });
    } catch (error) {
        console.log(error.message);
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const updatedBlog = await Blog.findByIdAndUpdate({ _id: blogId }, { $set: req.body }, { new: true });
        res.send({ status: 'success', data: updatedBlog });
    }
    catch (error) {
        console.log(error.message);
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete({ _id: blogId }, { new: true });
        res.send({ status: 'success', data: deletedBlog });
    }
    catch (error) {
        console.log(error.message);
    }
}