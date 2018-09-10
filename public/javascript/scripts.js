const adminUsername = "admin";
const adminPassword = "password";
$(document).ready(function() {
    $("#newComment").submit(function(e) {

        return false;
    });
});

function commentAdd() {
    var comment = $("#newComment").serializeHash();
    if (comment['title'] == "" || comment['content'] == "") 
        return;
    axios.post('/movies/' + comment['movieId'] + '/reviews/comments', comment).then(function(response) {
        let id = String(response.data.comment._id).slice(-8);
        $("#newComment").trigger("reset");
        $("#comments").prepend(`<div class="card" id="${response.data.comment._id}">
             <div class="card-block">
               <h4 class="card-title">${response.data.comment.title}</h4>
               <p class="card-text">${response.data.comment.content}</p>
               <p>
                    <button class="btn btn-link" id="deleteComment-${id}" type="button" onclick="commentDelete('${id}');" comment-id=${response.data.comment._id} movie-id=${response.data.comment.movieId}>Delete</button>
               </p>
             </div>
           </div>
          `);
    });
}
function commentDelete(index) {
    let commentId = $("#deleteComment-" + index).attr('comment-id');
    let movieId = $("#deleteComment-" + index).attr('movie-id');
    axios.delete('/movies/' + movieId + '/reviews/comments/' + commentId).then(function(response) {
        $("#" + commentId).remove();
    });
}
function deleteReview(index) {
    let reviewId = $("#deleteReview" + index).attr('review-id');
    axios.delete('/admin/reviews/' + reviewId).then(function(response) {
        console.log(response);
        $("#admin-" + reviewId).remove();
    });
}
