const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = mongoose.model('Comment', {
    movieId: {
        type: String,
        required: true
    },
    title: String,
    content: String,
    reviewId: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }
});

module.exports = Comment;
