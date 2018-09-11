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
        let timestamp = prettyDate(response.data.comment.date);
        document.getElementById("newComment").reset();
        document.getElementById("comments").innerHTML = `<div class="panel panel-default" id= "${response.data.comment._id}">
            <div class="panel-heading"> 
                <div class="pull-right trashit-comment">
                    <button class="fa fa-trash-o" type="button" id="deleteComment-${id}" onclick="commentDelete('${id}');" comment-id=${response.data.comment._id} movie-id=${response.data.comment.movieId}></button>
                </div>       
                <h3 class="panel-title">${response.data.comment.title}</h4>
            </div>
                <div class="panel-body">
                    <p>${response.data.comment.content}</p>
                    <span class="timestamp pull-right">${timestamp}</span>  
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
function prettyDate(value) {
    const c = new Date(value);
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    var dd = (
        c.getDate() < 10
        ? "0" + c.getDate()
        : c.getDate());
    var month = months[c.getMonth()];
    var yyyy = c.getFullYear();
    var hh = c.getHours();
    var mm = (
        c.getMinutes() < 10
        ? "0" + c.getMinutes()
        : c.getMinutes());
    var ss = (
        c.getSeconds() < 10
        ? "0" + c.getSeconds()
        : c.getSeconds());
    var mod = (
        hh > 12
        ? "PM"
        : "AM");
        if(hh>12) {
            hh -= 12;
        }else {
            hh = (hh == 0 ? 12 : hh);
        }

    return (month + ' ' + dd + ', ' + yyyy + ' ' + hh + ':' + mm + ':' + ss + ' ' + mod);
}
