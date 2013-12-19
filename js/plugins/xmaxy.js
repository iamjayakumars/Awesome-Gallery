(function () {

'use strict';

var carol = new Audio( 'http://upload.wikimedia.org/wikipedia/commons/a/a0/Silent_Night_%28choral%29.ogg' );
carol.loop = true;
carol.play();

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
    images = $.dom.images;
  
  images.forEach(function ( image ) {
    image.style.borderWidth = '5px';
  });
  
  redEven = lightImages( images, redEven );
  setInterval(function () {
    redEven = lightImages( images, redEven ); 
  }, 200 );
});

})();
