function commentAdd() {
    var formElements = document.getElementById("newComment").elements;
    var comment = {};
    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].type != "submit") //we dont want to include the submit-buttom
            comment[formElements[i].name] = formElements[i].value;
    }

    if (comment['title'] == "" || comment['content'] == "")
        return;
    axios.post('/movies/' + comment['movieId'] + '/reviews/comments', comment).then(function(response) {
        let id = String(response.data.comment._id).slice(-8);
        document.getElementById("newComment").reset();
        document.getElementById("comments").innerHTML = `<div class="card" id="${response.data.comment._id}">
             <div class="card-block">
               <h4 class="card-title">${response.data.comment.title}</h4>
               <p class="card-text">${response.data.comment.content}</p>
               <p>
                    <button class="btn btn-link" id="deleteComment-${id}" type="button" onclick="commentDelete('${id}');" comment-id=${response.data.comment._id} movie-id=${response.data.comment.movieId}>Delete</button>
               </p>
             </div>
           </div>
          ` + document.getElementById("comments").innerHTML;
    });
}
function commentDelete(index) {
    let commentId = document.getElementById("deleteComment-" + index).getAttribute("comment-id");
    let movieId = document.getElementById("deleteComment-" + index).getAttribute("movie-id");
    axios.delete('/movies/' + movieId + '/reviews/comments/' + commentId).then(function(response) {
        document.getElementById(commentId).remove();
    });
}
function deleteReview(index) {
    let reviewId = document.getElementById("deleteReview" + index).getAttribute("review-id");
    axios.delete('/admin/reviews/' + reviewId).then(function(response) {
        console.log(response);
        document.getElementById("admin-" + reviewId).remove();
    });
}
