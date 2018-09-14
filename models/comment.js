// models/comment.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = mongoose.model('Comment', {
    title: { type: String, required: true },
    content: { type: String, required: true },
    reviewId: { type: Schema.Types.ObjectId, ref: 'Review', required: true }
});

module.exports = Comment;
