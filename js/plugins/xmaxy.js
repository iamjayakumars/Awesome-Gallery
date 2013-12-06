(function () {

'use strict';

var carol = new Audio( 'http://upload.wikimedia.org/wikipedia/commons/a/a0/Silent_Night_%28choral%29.ogg' );
carol.loop = true;
carol.play();

function lightImages( images, redEven ) {
  for (var i = 0; i < images.length; i++) {
    if (redEven) {
      if (i % 2 === 0) {
        images[i].style.borderColor = 'rgb(255, 0, 0)';
      } else {
        images[i].style.borderColor = 'rgb(0, 255, 0)';
      }
    } else {
      if (i % 2 === 0) {
        images[i].style.borderColor = 'rgb(0, 255, 0)';
      } else {
        images[i].style.borderColor = 'rgb(255, 0, 0)';
      }
    }
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
