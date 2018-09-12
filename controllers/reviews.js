// controllers/reviews.js

const Review = require('../models/review');
const Comment = require('../models/comment');

function reviewsController (app) {

  // app.get('/', (req, res) => {
  //     Review.find()
  //         .then(reviews => {
  //             res.render('reviews-index', {reviews: reviews});
  //         })
  //         .catch(err => {
  //             console.log(err);
  //         });
  // });

  // NEW
  app.get('/movies/:movieId/reviews/new', (req, res) => {
      res.render('reviews-new', { movieId: req.params.movieId });
  });

  // CREATE
  app.post('/movies/:movieId/reviews', (req, res) => {
      console.log(`CREATE review`);
      Review.create(req.body)
          .then((review) => {
              res.redirect(`/movies/${req.params.movieId}/reviews/${review._id}`);
          }).catch((err) => {
              console.log(err.message);
          });
  });

  // SHOW
  app.get('/movies/:movieId/reviews/:id', (req, res) => {
      Review.findById(req.params.id)
          .then(review => {
              Comment.find({ reviewId: req.params.id }).then(comments => {
                  res.render('reviews-show', { review: review, comments: comments, movieId: req.params.movieId });
              })
          }).catch((err) => {
              console.log(err.message);
          });
  });

  // EDIT
  app.get('/movies/:movieId/reviews/:id/edit', function (req, res) {
      Review.findById(req.params.id, (err, review) => {
          res.render('reviews-edit', { review: review, movieId: req.params.movieId });
      });
  });

  // UPDATE
  app.put('/movies/:movieId/reviews/:id', (req, res) => {
      console.log(`UPDATE review: ${req.params.id}`);
      Review.findByIdAndUpdate(req.params.id, req.body)
          .then(review => {
              res.redirect(`/movies/${req.params.movieId}/reviews/${review._id}`);
          })
          .catch(err => {
              console.log(err.message);
          });
  });

  // DELETE
  app.delete('/movies/:movieId/reviews/:id', function (req, res) {
      console.log(`DELETE review: ${req.params.id}`);
      Review.findByIdAndRemove(req.params.id)
          .then((review) => {
              res.redirect(`/movies/${req.params.movieId}`);
          }).catch((err) => {
              console.log(err.message);
          });
  });

}

module.exports = reviewsController;
