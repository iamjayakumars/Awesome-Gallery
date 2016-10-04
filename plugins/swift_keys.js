AG.extend(function ( $ ) {
  document.addEventListener( 'keydown', function ( event ) {
    var keyCode;
    if ( $.dom.galleryActivated ) {
      keyCode = parseInt( String.fromCharCode( event.keyCode ) );
      
      keyCode === 0 ?
        $.Switcher.go( $.dom.images.length - 1 ) :
        $.Switcher.go( keyCode - 1 );
      
      event.keyCode === 33 ?
        $.Switcher.prev() :
        event.keyCode === 34 && $.Switcher.next();
    }
  });
});
