const mongoose = require('mongoose');

const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String,
  rating: Number,
  description: String,
});
module.exports = Review;
