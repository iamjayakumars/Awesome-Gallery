(function ( document ) {

'use strict';

var IMAGES_CLASS = 'attachment-thumbnail';

var gallery = document.getElementById( 'gallery-flyout' ),
  images = document.getElementsByClassName( IMAGES_CLASS );

Array.prototype.forEach.call( images, function ( image ) {
  image.setAttribute( 'bigsrc', image.src.replace( /-\d+x\d+/, '' ) );
  image.addEventListener( 'click', function () {
    gallery.classList.add( 'view' );
  });
  image.parentNode.href = '#';
});

document.documentElement.addEventListener( 'click', function () {
  gallery.classList.remove( 'view' );
});

AG.init({
  $image: '#mainPhoto',
  $$images: '.' + IMAGES_CLASS,
  $gallery: '#gallery-flyout'
});

})( document );
