(function ( document ) {

'use strict';

AG.extend(function ( $, options ) {
  var gallery = $.dom.gallery,
    fullScreen = (gallery.requestFullScreen ||
      gallery.mozRequestFullScreen ||
      gallery.webkitRequestFullScreen),
    button = options.$button;
  
  (typeof button === 'string' ?
      document.querySelector( button ) :
      button).addEventListener( 'click', function () {
    fullScreen();
  });
  
  document.documentElement.addEventListener( 'keydown', function () {
    if ( $.dom.galleryActivated && event.keyCode === 113 ) {
      fullScreen();
    }
  });
}, 'fullScreen' );

})( document );
