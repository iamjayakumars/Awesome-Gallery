$('#smallAdvert').slideview({
  onEnd: function () {
    $('#smallAdvert').mouseenter(function () {
      $('#largeAdvert').addClass('show');
      $(this).removeClass('show');
    });
    $('#largeAdvert').mouseleave(function () {
      $(this).removeClass('show');
      $('#smallAdvert').addClass('show');
    });
  }
});