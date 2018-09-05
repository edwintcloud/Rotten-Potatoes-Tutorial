module.exports = function (app, Comment) {

    // CREATE Comment
    app.post('/movies/:movieId/reviews/comments', (req, res) => {
        Comment.create(req.body).then(comment => {
        res.redirect(`/movies/${req.params.movieId}/reviews/${comment.reviewId}`)
    }).catch((err) => {
        console.log(err.message)
    })
    });

    // DELETE
    app.delete('/movies/:movieId/reviews/comments/:id', function (req, res) {
      Comment.findByIdAndRemove(req.params.id).then((comment) => {
        res.redirect(`/movies/${req.params.movieId}/reviews/${comment.reviewId}`);
      }).catch((err) => {
        console.log(err.message);
      })
    });
}
