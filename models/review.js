const mongoose = require('mongoose');

const Review = mongoose.model('Review', {
    movieId: {
        type: String,
        required: true
    },
    title: String,
    rating: Number,
    description: String,
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Review;
