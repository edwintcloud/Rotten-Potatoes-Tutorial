const adminUsername = "admin";
const adminPassword = "password";

module.exports = function(app, Review) {

    // ADMIN LANDING
    app.get('/admin', (req, res) => {
        res.render('admin-login', { attempt: false });
    });

    // ADMIN LOGIN
    app.post('/admin', (req, res) => {
        if (req.body['username'] == adminUsername && req.body['password'] == adminPassword) {
            Review.find()
                .then(reviews => {
                    res.render('admin', {
                        reviews: reviews
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            res.render('admin-login', { attempt: true });
        }
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
