// movies.js

const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb(process.env.TMDB_KEY);
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
        if(req.query.query){
            moviedb.searchMovie({ query: req.query.query })
            .then(response => {
                res.render('movies-index', { title: `Search results: ${req.query.query}`, movies: response.results, genreDict: genres });
            })
            .catch(console.error);
        }
        else if (req.query.genreId) {
            moviedb.genreMovies({ id: req.query.genreId })
            .then(response => {
                res.render('movies-index', { title: `${genres[req.query.genreId]} movies`, movies: response.results, genreDict: genres });
            })
            .catch(console.error);
        }
        else {
            moviedb.miscNowPlayingMovies()
            .then(response => {
                res.render('movies-index', { title: 'Now Playing', movies: response.results, genreDict: genres });
            })
            .catch(console.error);
        }
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
