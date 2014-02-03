(function () {
  var commentsCover = document.querySelectorAll('.comments-cover');
  var showComments = document.querySelectorAll('.comments-cover button');
  var comments = document.querySelectorAll('.comments');
  
  showComments[0].addEventListener('click', function (ev) {
    commentsCover[0].className += ' hidden';
    comments[0].className = comments[0].className.replace('hidden', '');
  }, false);
}());
