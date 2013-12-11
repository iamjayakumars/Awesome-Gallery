(function ( document, navigator ) {

'use strict';

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.webkitGetUserMedia;

var fetcherContainer,
  Camera = {
    el: null,
    
    request: function () {
      navigator.getUserMedia({
        video: true,
        audio: false
      }, function ( stream ) {
        Camera.el.src = URL.createObjectURL( stream );
        Camera.el.play();
      }, function ( error ) {
        var container = document.createElement( 'div' );
        container.textContent = error;
      });
    },
    
    stopStreaming: function () {
      el.src = '';
      el.stop();
    },
    
    capture: function () {
      var canvas = document.createElement( 'canvas' ),
        context = canvas.getContext( '2d' );
      
    }
  },

  FilePicker = {
    el: null,
    
    get: function () {
      Array.prototype.forEach.call( this.files, importPhoto );
    }
  };

function importPhoto( photo ) {
  var image = document.createElement( 'img' );
  image.src = URL.createObjectURL( photo );
  $.dom.images.parentNode.appendChild( image );
}

AG.extend(function ( $, options ) {
  fetcherContainer = document.querySelector( options.$fetcher );
  
  Camera.el = fetcherContainer.appendChild( document.createElement( 'video' ) );
  
  FilePicker.el = (function () {
        var picker = document.createElement( 'input' );
        picker.type = 'file';
        picker.multiple = true;
        return $.dom.gallery.appendChild( picker );
      })();
  
  
}, 'importPhotos' );

})( document, navigator );