const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    authorName: {
        type: String,
        required: true,
    },
    authorEmail: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
        default: ""
    },
    category: {
        type: String,
        required: true,
        default: ""
    },
    story: {
        type: String,
        required: true,
        default: ""
    },
    blogImg: {
        type: String,
        // required: true,
        default: ""
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;