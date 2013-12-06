AG.extend(function ( $ ) {
  document.addEventListener( 'keydown', function ( event ) {
    var keyCode, photosLength;
    if ($.dom.galleryActivated) {
      keyCode = parseInt( String.fromCharCode( event.keyCode ) );
      photosLength = $.dom.images ? $.dom.images.length : $.photos.length;
      
      keyCode === 0 ?
        $.Switcher.go( photosLength - 1 ) :
        $.Switcher.go( keyCode - 1 );
      
      event.keyCode === 33 ?
        $.Switcher.prev() :
        (event.keyCode === 34 ? $.Switcher.next() : undefined);
    }
  });
});
