// javascript/scripts.js

// listen for a form submit event
var $newComment = $('#newComment');

$newComment.submit(e => {
    // prevent the default form behavior
    e.preventDefault();
    // serialize the form data into an object
    let comment = $newComment.serialize();
    console.log(comment)

    // use axios to initialize a post request and send in the form data
    axios.post('/reviews/comments', comment)
    .then(function (response) {
        // wait for the success response from the server
        console.log(response);
        // remove the information from the form
        $newComment.trigger('reset');
        // display the data as a new comment on the page
        $('#comments').prepend(
            `
            <div class="card">
                <div class="card-block">
                    <h4 class="card-title">${response.data.comment.title}</h4>
                    <p class="card-text">${response.data.comment.content}</p>
                    <p>
                        <form method="POST" action="/reviews/comments/${response.data.comment._id}?_method=DELETE">
                            <button class="btn btn-link" type="submit">Delete</button>
                        </form>
                    </p>
                </div>
            </div>
            `
        );
    })
    .catch(function (error) {
        console.log(error);
        // handle any errors
        alert('There was a problem saving your comment. Please try again.')
    });
});
