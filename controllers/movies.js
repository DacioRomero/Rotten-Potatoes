// movies.js

const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('***REMOVED***');
const Review  = require('../models/review');
const genres  = {};

moviedb.genreMovieList()
.then(response => {
    response.genres.forEach(element => {
        genres[element.id] = element.name;
    });
})
.catch(console.error)

module.exports = app => {
    // INDEX Movies
    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies()
        .then(response => {
            res.render('movies-index', { movies: response.results, genreDict: genres });
        })
        .catch(console.error);
    });

    // SHOW Movie
    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id })
        .then(movie => {
            moviedb.movieVideos({ id: req.params.id })
            .then(videos => {
                movie.trailer_youtube_id = videos.results[0].key;

                Review.find({ movieId: req.params.id })
                .then(reviews => {
                    res.render('movies-show', { movie: movie, reviews: reviews });
                })
                .catch(console.error);
            })
            .catch(console.error);
        })
        .catch(console.error);
    });
}
