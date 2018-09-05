const mongoose = require('mongoose');

const Review = mongoose.model('Review', {
    movieId: {
        type: String,
        required: true
    },
    title: String,
    rating: Number,
    description: String,
});
module.exports = Review;
