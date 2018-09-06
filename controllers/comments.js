module.exports = function(app, Comment) {

    // CREATE Comment
    app.post('/movies/:movieId/reviews/comments', (req, res) => {
        Comment.create(req.body).then(comment => {
            res.status(200).send({
                comment: comment
            });
        }).catch((err) => {
            res.status(400).send({
                err: err
            })
        })
    });

    // DELETE
    app.delete('/movies/:movieId/reviews/comments/:id', function(req, res) {
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
            res.status(200).send({
                comment: comment
            });
        }).catch((err) => {
            res.status(400).send({
                err: err
            })
        })
    });
}
