// javascript/scripts.js

// for /movies/:movieId/reviews/:id
$('#newComment').submit(e => {
    e.preventDefault();

    let comment = $(e.target).serialize();

    axios.post('/reviews/comments', comment)
    .then(response => {
        e.target.reset();
        $('#comments').prepend(response.data);
    })
    .catch(err => {
        console.error(err);
        alert('There was a problem saving your comment. Please try again.');
    });
});

$('#comments').on('click', '.deleteComment', e => {
    let commentId = $(e.target).attr('data-comment-id');

    axios.delete(`/reviews/comments/${commentId}`)
    .then(response => {
        $(`#${commentId}`).remove();
    })
    .catch(console.error);
});

// for /admin
$('.deleteReview').click(e => {
    let reviewId = $(e.target).attr('data-review-id');

    axios.delete(`/admin/reviews/${reviewId}`)
    .then(response => {
        $(`#${reviewId}`).remove();
    })
    .catch(console.error);
});
