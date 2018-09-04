// models/review.js

const mongoose = require('mongoose');

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    stars: Number
});

module.exports = Review;
