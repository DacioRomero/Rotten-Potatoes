// controllers/comments.js

const Comment = require('../models/comment');

module.exports = app => {
    // CREATE Comment
    app.post('/reviews/comments', (req, res) => {
        Comment.create(req.body)
        .then(comment => {
            res.render('partials/comment', { layout: false, comment: comment });
        }).catch((err) => {
            res.status(400).send(error);
        });
    });

    // DELETE Comment
    app.delete('/reviews/comments/:id', (req, res) => {
        Comment.findByIdAndRemove(req.params.id)
        .then(comment => {
            res.status(200).send(comment);
        }).catch((err) => {
            console.error(err);
            res.status(400).send(err);
        });
    })
}
