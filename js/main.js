awesomeGallery({
  imageSelector: '#mainPhoto',
  imagesSelector: '.photo',
  slideshow: function (slideshow) {
    document.getElementById('slideshow').addEventListener('click', slideshow);
  }
});