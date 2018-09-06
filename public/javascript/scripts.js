function commentAdd() {
    var comment = $("#newComment").serializeHash();
    if(comment['title'] == "" || comment['content'] == "") return;
    axios.post('/movies/' + comment['movieId'] + '/reviews/comments', comment)
        .then(function(response) {
            $("#newComment").trigger("reset");
            $("#comments").prepend(
                `<div class="card" id="${response.data.comment._id}">
             <div class="card-block">
               <h4 class="card-title">${response.data.comment.title}</h4>
               <p class="card-text">${response.data.comment.content}</p>
               <p>
                  <form method="POST" action="#">
                    <button class="btn btn-link" id="deleteComment" type="button" onclick="commentDelete();" comment-id=${response.data.comment._id} movie-id=${response.data.comment.movieId}>Delete</button>
                  </form>
               </p>
             </div>
           </div>
          `
            );
        });
}
function commentDelete() {
    let commentId = $("#deleteComment").attr('comment-id');
    let movieId = $("#deleteComment").attr('movie-id');
    axios.delete('/movies/' + movieId + '/reviews/comments/' + commentId)
        .then(function(response) {
            $("#" + commentId).remove();
        });
}
function deleteReview(index) {
    let reviewId = $("#deleteReview" + index).attr('review-id');
    axios.delete('/admin/reviews/' + reviewId)
        .then(function(response) {
            console.log(response);
            $("#admin-" + reviewId).remove();
        });
}
