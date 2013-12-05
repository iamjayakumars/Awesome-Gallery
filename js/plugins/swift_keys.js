AG.extend(function ( $ ) {
  document.addEventListener( 'keydown', function ( event ) {
    var keyCode, photosLength;
    if ($.dom.galleryActivated) {
      keyCode = parseInt( String.fromCharCode( event.keyCode ) );
      photosLength = $.dom.images ? $.dom.images.length : $.photos.length;
      
      keyCode === 0 ?
        $.Switcher.goto( photosLength - 1 ) :
        $.Switcher.goto( keyCode - 1 );
      
      event.keyCode === 33 ?
        $.Switcher.prev() :
        (event.keyCode === 34 ? $.Switcher.next() : undefined);
    }
  });
});
