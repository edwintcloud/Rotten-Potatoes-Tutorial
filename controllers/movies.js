const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('2b5542bc24eae522f3d8382c3c0cc4bb');

module.exports = function(app, Review) {

    app.get('/', (req, res) => {

        moviedb.miscNowPlayingMovies().then(movies => {
            var promises = [];
            movies.results.forEach(function(movie) {
                movie.genres = [];
                var promise = moviedb.movieInfo(movie.id);
                promise.then(movieInfo => {
                    movieInfo.genres.forEach(function(genre) {
                        movie.genres.push(" " + genre.name);
                    });
                }).catch(console.error);
                promises.push(promise);
            });

            // Render page only after all movieInfo requests are completed (for each movies' genres)
            Promise.all(promises).then(response => {
                res.render('movies-index', {
                    movies: movies.results
                });
            }).catch(console.error);

        }).catch(console.error);
    });

    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({
            id: req.params.id
        }).then(movie => {
            Review.find({
                movieId: movie.id
            }).then(reviews => {
                    moviedb.movieTrailers({
                        id: req.params.id
                    }).then(videos => {
                        movie.trailer_youtube_id = videos.youtube[0].source
                        renderTemplate(movie)
                    });

                function renderTemplate(movie) {
                    res.render('movies-show', {
                        movie: movie,
                        reviews: reviews.reverse()
                    });
                }
            });
        }).catch(console.error);
    });
}
