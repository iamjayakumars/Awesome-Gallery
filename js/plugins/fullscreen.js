(function ( document ) {

'use strict';

AG.extend(function ( $, options ) {
  var gallery = $.dom.gallery,
    
    fullScreen = function () {
      if ( gallery.requestFullScreen ) {
        gallery.requestFullScreen();
      } else if ( gallery.mozRequestFullScreen ) {
        gallery.mozRequestFullScreen();
      } else if ( gallery.webkitRequestFullScreen ) {
        gallery.webkitRequestFullScreen();
      }
    },
    
    button = options.$button;
  
  (typeof button === 'string' ?
      document.querySelector( button ) :
      button).addEventListener( 'click', fullScreen );
  
  document.documentElement.addEventListener( 'keydown', function ( event ) {
    if ( $.dom.galleryActivated && event.keyCode === 113 ) {
      fullScreen();
    }
  });
}, 'fullScreen' );

})( document );
