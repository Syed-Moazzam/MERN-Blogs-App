const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
    try {
        const newComment = await Comment.create({
            blogId: req.body?.blogId,
            commenterId: req.body?.commenterId,
            commenterImg: req.body?.commenterImg,
            commenterName: req.body?.commenterName,
            commentText: req.body?.commentText
        });
        return res.send({ status: 'success', message: 'Comment Posted Successfully!', data: newComment });
    } catch (error) {
        return res.status(505).send({ status: 'error', message: error.message });
    }
}

exports.updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const isUpdated = await Comment.findByIdAndUpdate({ _id: commentId }, { $set: req.body }, { new: true });
        if (isUpdated) return res.send({ status: 'success', message: 'Comment Updated Successfully!' });
    } catch (error) {
        return res.status(505).send({ status: 'error', message: error.message });
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const isDeleted = await Comment.findByIdAndDelete({ _id: commentId });
        if (isDeleted) return res.send({ status: 'success', message: 'Comment Deleted Successfully!' });
    } catch (error) {
        return res.status(505).send({ status: 'error', message: error.message });
    }
}