const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    blogId: {
        type: String,
        required: true,
    },
    commenterImg: {
        type: String,
        required: true,
    },
    commenterName: {
        type: String,
        required: true,
    },
    commentingTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    commentText: {
        type: String,
        required: true,
        default: ""
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;