// controllers/admin.js
const Review = require('../models/review')

function adminController(app) {
    // NEW Comment
    app.get('/admin', (req, res) => {
        Review.find()
        .then(reviews => {
            res.render('admin', { reviews: reviews });
        })
        .catch(error => {
            console.log(error);
        });
    });

    // DELETE
    app.delete('/admin/reviews/:id', function (req, res) {
        console.log(`DELETE review: ${req.params.id}`);
        Review.findByIdAndRemove(req.params.id)
            .then(review => {
                res.status(200).send(review);
            }).catch(err => {
                res.status(400).send(err)
            });
    });
}

module.exports = adminController;
