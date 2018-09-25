// controllers/reviews.js

const Review = require('../models/review')
const Comment = require('../models/comment');

module.exports = app => {
  // NEW Review
  app.get('/movies/:movieId/reviews/new', (req, res) => {
      res.render('reviews-new', { movieId: req.params.movieId });
  });

  // CREATE Review
  app.post('/movies/:movieId/reviews', (req, res) => {
      Review.create(req.body)
      .then(review => {
          res.redirect(`/movies/${req.params.movieId}/reviews/${review._id}`);
      })
      .catch(console.error);
  });

  // SHOW Review
  app.get('/movies/:movieId/reviews/:id', (req, res) => {
      Review.findById(req.params.id)
      .then(review => {
          Comment.find({ reviewId: req.params.id })
          .then(comments => {
              res.render('reviews-show', { review: review, comments: comments });
          })
          .catch(console.error);
      })
      .catch(console.error);
  });

  // EDIT Review
  app.get('/movies/:movieId/reviews/:id/edit', (req, res) => {
      Review.findById(req.params.id)
      .then(review => {
          res.render('reviews-edit', { review: review });
      })
      .catch(console.error);
  });

  // UPDATE Review
  app.put('/movies/:movieId/reviews/:id', (req, res) => {
      Review.findByIdAndUpdate(req.params.id, req.body)
      .then(review => {
          res.redirect(`/movies/${req.params.movieId}/reviews/${review._id}`);
      })
      .catch(console.error);
  });

  // DELETE Review
  app.delete('/movies/:movieId/reviews/:id', (req, res) => {
      Review.findByIdAndRemove(req.params.id)
      .then(review => {
          res.redirect(`/movies/${req.params.movieId}`);
      })
      .catch(console.error);
  });
}
