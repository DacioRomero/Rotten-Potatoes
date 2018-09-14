// javascript/scripts.js
$('#newComment').submit(e => {
    e.preventDefault();

    let comment = $(e.target).serialize();

    axios.post('/reviews/comments', comment)
    .then(response => {
        e.target.reset();

        $('#comments').prepend(
            `
            <div class="card" id="${response.data.comment._id}">
                <div class="card-block">
                    <h4 class="card-title">${response.data.comment.title}</h4>
                    <p class="card-text">${response.data.comment.content}</p>
                    <p>
                        <button class="btn btn-link deleteComment" data-comment-id=${response.data.comment._id}>Delete</button>
                    </p>
                </div>
            </div>
            `
        );
    })
    .catch(function (error) {
        console.log(error);
        alert('There was a problem saving your comment. Please try again.')
    });
});

$('#comments').on('click', '.deleteComment', e => {
    let commentId = $(e.target).attr('data-comment-id');

    axios.delete(`/reviews/comments/${commentId}`)
    .then(response => {
        console.log(response);
        $(`#${commentId}`).remove();
    })
    .catch(error => {
        console.log(error);
    });
});

$('.deleteReview').click(e => {
    let reviewId = $(e.target).attr('data-review-id');

    axios.delete(`/admin/reviews/${reviewId}`)
    .then(response => {
        console.log(response);
        $(`#${reviewId}`).remove();
    })
    .catch(error => {
        console.log(error);
    });
});
