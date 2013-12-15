(function () {

'use strict';

var carol = new Audio( 'http://upload.wikimedia.org/wikipedia/commons/a/a0/Silent_Night_%28choral%29.ogg' );
carol.loop = true;
carol.play();

function lightImages( images, redEven ) {
  var RED = 'rgb(255, 0, 0)',
    GREEN = 'rgb(0, 255, 0)';
  for (var i = 0; i < images.length; i++) {
    images[i].style.borderColor = redEven ? ( i % 2 === 0 ? RED : GREEN ) :
          ( i % 2 === 0 ? GREEN : RED );
  }
  return !redEven;
}

AG.extend(function ( $ ) {
  var redEven = true,
    images = $.dom.images;
  Array.prototype.forEach.call( images, function ( image ) {
    image.style.borderWidth = '5px';
  });
  redEven = lightImages( images, redEven );
  setInterval(function () {
    redEven = lightImages( images, redEven ); 
  }, 200 );
});

})();
