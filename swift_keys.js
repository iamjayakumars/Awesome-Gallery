AG.extend(function (exports) {
  document.addEventListener( 'keydown', function (event) {
    if (exports.dom.galleryActivated) {
      exports.Switcher.goto( parseInt( String.fromCharCode( event.keyCode ) ) - 1 );
      
      event.keyCode === 33 ?
        exports.Switcher.prev() :
        (event.keyCode === 34 ? exports.Switcher.next() : undefined);
    }
  });
});
