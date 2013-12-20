(function () {

'use strict';

var carol = new Audio( 'http://upload.wikimedia.org/wikipedia/commons/a/a0/Silent_Night_%28choral%29.ogg' ),
  stopCarolButton = document.createElement( 'div' ),
  stopCarolButtonStyle = stopCarolButton.style;

carol.loop = true;
carol.play();
stopCarolButton.textContent = 'Mute Xmaxy';
stopCarolButtonStyle.width = '100px';
stopCarolButtonStyle.height = '20px';
stopCarolButtonStyle.borderRadius = '20px';
stopCarolButtonStyle.background = 'rgb(100,100,100)';
stopCarolButtonStyle.color = 'rgb(255,255,255)';
stopCarolButtonStyle.opacity = '.7';

function lightImages( images, redEven ) {
  var RED = 'rgb(255, 0, 0)',
    GREEN = 'rgb(0, 255, 0)';
  
  images.forEach(function ( image, index ) {
    image.style.borderColor = redEven ? ( index % 2 === 0 ? RED : GREEN ) :
          ( index % 2 === 0 ? GREEN : RED );
  });
  
  var selected;
  images.forEach(function ( image, index ) {
    var style = image.style;
    image.classList.contains( 'selected' ) && ( selected = image );
    style.borderWidth = '1px';
    style.borderStyle = 'solid';
    style.borderColor = redEven ? ( index % 2 === 0 ? RED : GREEN ) :
          ( index % 2 === 0 ? GREEN : RED );
  });
  selected.style.borderWidth = '5px';
  return !redEven;
}

AG.extend(function ( $ ) {
  var redEven = true,
    images = $.dom.images,
    gallery = $.dom.gallery;
  
  images.forEach(function ( image ) {
    image.style.borderWidth = '5px';
  });
  
  redEven = lightImages( images, redEven );
  setInterval(function () {
    redEven = lightImages( images, redEven ); 
  }, 200 );
  
  gallery.insertBefore( stopCarolButton, gallery.firstChild );
  stopCarolButton.addEventListener( 'click', function () {
    carol.pause();
  });
});

})();
