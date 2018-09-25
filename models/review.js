// models/review.js

const mongoose = require('mongoose');

const Review = mongoose.model('Review', {
    movieId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    stars: { type: Number, required: true }
});

module.exports = Review;
