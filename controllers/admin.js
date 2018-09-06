module.exports = function(app, Review) {

    // ADMIN
    app.get('/admin', (req, res) => {
        Review.find()
            .then(reviews => {
                res.render('admin', {
                    reviews: reviews
                });
            })
            .catch(error => {
                console.log(error);
            });
    });

    // ADMIN DELETE REVIEW
    app.delete('/admin/reviews/:id', function(req, res) {
        Review.findByIdAndRemove(req.params.id).then((review) => {
            res.status(200).send({
                review: review
            });
        }).catch((err) => {
            res.status(400).send({
                err: err
            })
        })
    });
}
