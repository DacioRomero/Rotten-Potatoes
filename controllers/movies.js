// movies.js
const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('1f11d7564e8cf70631edd81979b7ae77');
const Review = require('../models/review')

var genres = {};
moviedb.genreMovieList().then(response => {
    response.genres.forEach(element => {
        genres[element.id] = element.name;
    });
})

function moviesController(app){
    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies()
        .then(response => {
            res.render('movies-index', { movies: response.results, genreDict: genres });
        })
        .catch(console.error);
    });

    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id })
        .then(movie => {
            moviedb.movieVideos({ id: req.params.id })
            .then(videos => {
                movie.trailer_youtube_id = videos.results[0].key

                Review.find({ movieId: req.params.id })
                .then(reviews => {
                    res.render('movies-show', { movie: movie, reviews: reviews });
                })
            })
            .catch(console.error)
        })
        .catch(console.error);
    });
}

module.exports = moviesController;
