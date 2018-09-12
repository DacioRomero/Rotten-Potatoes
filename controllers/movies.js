// movies.js
const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('***REMOVED***');

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
                res.render('movies-show', { movie: movie });
            })
            .catch(console.error)
        })
        .catch(console.error);
    });
}
module.exports = moviesController;
