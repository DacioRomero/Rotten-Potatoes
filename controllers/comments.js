// controllers/comments.js

const Comment = require('../models/comment');

function commentsController (app) {
    // CREATE
    app.post('/reviews/comments', (req, res) => {
        console.log(req.body)
        Comment.create(req.body)
            .then(comment => {
                res.status(200).send({ comment: comment });
            }).catch((err) => {
                res.status(400).send({ err: err });
            });
    });

    // DELETE
    app.delete('/reviews/comments/:id', function (req, res) {
        Comment.findByIdAndRemove(req.params.id)
            .then((comment) => {
                res.redirect(`/reviews/${comment.reviewId}`);
            }).catch((err) => {
                console.log(err.message);
            });
    });
}

module.exports = commentsController;
