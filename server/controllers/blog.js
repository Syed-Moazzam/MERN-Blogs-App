const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
    try {
        const sessionUser = req.session.user;
        await Blog.create({
            authorId: sessionUser?._id,
            authorName: sessionUser?.username,
            title: req.body?.title,
            category: req.body?.category,
            story: req.body?.story,
            blogImg: req.body?.blogImg
        });
        return res.send({ status: 'success', message: 'Blog Created Successfully!' });
    }
    catch (error) {
        return res.status(505).send({ status: 'error', message: error.message });
    }
}

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        return res.send({ status: 'success', data: blogs });
    } catch (error) {
        return res.status(505).send({ status: 'error', message: error.message });
    }
}

exports.getSingleBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findOne({ _id: blogId });
        return res.send({ status: 'success', data: blog });
    } catch (error) {
        return res.status(505).send({ status: 'error', message: error.message });
    }
}

exports.getFilteredBlogs = async (req, res) => {
    try {
        const { blogTitle, category } = req.query;
        let data = null;
        if (blogTitle) {
            data = await Blog.findOne({ title: blogTitle });
        }
        else data = await Blog.find({ category });

        return res.send({ status: 'success', data });
    } catch (error) {
        return res.status(505).send({ status: 'error', message: error?.message });
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const sessionUser = req.session.user;
        const { blogId } = req.params;
        if (req.body.authorId === sessionUser?._id) {
            const updatedBlog = await Blog.findByIdAndUpdate({ _id: blogId }, { $set: req.body }, { new: true });
            return res.send({ status: 'success', message: 'Blog Updated Successfully!', data: updatedBlog });
        }
        else {
            return res.send({ status: 'error', message: "You Can Only Update Your Own Blogs!" });
        }
    }
    catch (error) {
        return res.status(505).send({ status: 'error', message: error.message });
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const sessionUser = req.session.user;
        const { authorId, blogId } = req.params;
        if (authorId === sessionUser?._id) {
            await Blog.findByIdAndDelete({ _id: blogId }, { new: true });
            return res.send({ status: 'success', message: 'Blog Deleted Successfully!' });
        }
        else {
            return res.send({ status: 'error', message: 'You Can Only Delete Your Own Blogs!' });
        }
    }
    catch (error) {
        return res.status(505).send({ status: 'error', message: error.message });
    }
}