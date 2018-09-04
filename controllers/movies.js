const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('2b5542bc24eae522f3d8382c3c0cc4bb')

module.exports = function (app) {

    app.get('/', (req, res) => {
        var movies = moviedb.miscNowPlayingMovies().then(response => {
            response.results.forEach(function(value) {
                value.genres = [];
                moviedb.movieInfo(value.id).then(movieDetails => {
                    movieDetails.genres.forEach(function(genre) {
                        value.genres.push(" " + genre.name);
                    });
                }).catch(console.error);
            });
            setTimeout(function() {
                res.render('movies-index', { movies: response.results });
            }, 1000);
        }).catch(console.error);
    });
}
