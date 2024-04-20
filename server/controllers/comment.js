const Comment = require('../models/Comment');

exports.getSingleBlogComments = async (req, res) => {
    try {
        const { blogId } = req.params;
        const allComments = await Comment.find({ blogId });
        return res.send({ status: 'success', data: allComments });
    } catch (error) {
        return res.status(505).send({ status: 'error', message: error.message });
    }
}

exports.createComment = async (req, res) => {
    try {
        const newComment = await Comment.create({
            blogId: req.body?.blogId,
            commenterImg: req.body?.commenterImg,
            commenterName: req.body?.commenterName,
            commentingTime: req.body?.commentingTime,
            commentText: req.body?.commentText
        });
        return res.send({ status: 'success', message: 'Comment Posted Successfully!', data: newComment });
    } catch (error) {
        return res.status(505).send({ status: 'error', message: error.message });
    }
}