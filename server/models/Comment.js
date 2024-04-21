const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    blogId: {
        type: String,
        required: true,
    },
    commenterId: {
        type: String,
        required: true,
    },
    commenterImg: {
        type: String,
        default: "",
    },
    commenterName: {
        type: String,
        required: true,
    },
    commentText: {
        type: String,
        required: true,
        default: ""
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;