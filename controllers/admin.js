// controllers/admin.js

const Review = require('../models/review');

module.exports = app => {
    // INDEX Reviews
    app.get('/admin', (req, res) => {
        Review.find()
        .then(reviews => {
            res.render('admin', { reviews: reviews });
        })
        .catch(console.error);
    });

    // DELETE Review
    app.delete('/admin/reviews/:id', (req, res) => {
        Review.findByIdAndRemove(req.params.id)
        .then(review => {
            res.status(200).send(review);
        })
        .catch(err => {
            console.error(err);
            res.status(400).send(err);
        });
    });
};
