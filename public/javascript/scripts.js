// javascript/scripts.js

// listen for a form submit event\
$('#newComment').submit(e => {
    // prevent the default form behavior
    e.preventDefault();
    // serialize the form data into an object
    let comment = $(e.target).serialize();
    console.log(comment)

    // use axios to initialize a post request and send in the form data
    axios.post('/reviews/comments', comment)
    .then(response => {
        // wait for the success response from the server
        console.log(response);
        // remove the information from the form
        e.target.reset();
        // display the data as a new comment on the page
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
        // handle any errors
        alert('There was a problem saving your comment. Please trys again.')
    });
});

$('#comments').on('click', '.deleteComment', e => {
    console.log('Click!');
    let commentId = $(e.target).attr('data-comment-id');
    axios.delete(`/reviews/comments/${commentId}`)
    .then(response => {
        console.log(response);
        $(`#${commentId}`).remove();
    })
    .catch(error => {
        console.log(error);
    });
})
