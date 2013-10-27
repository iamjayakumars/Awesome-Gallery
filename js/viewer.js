/**
* @author Daniel Desira
* @version 0.5
*/

(function () {

'use strict';

var SELECTION_CLASS = 'selected',
  TRANSITION_CLASS = 'view';

var currentImage, photoIndex, imageDescription, delay, photos, touchStartX, prev, next, startSlideshow, stopSlideshow,
  
  Switcher = (function () {
    var interval,
      Switcher = {};
    
    Switcher.next = function () {
      flipPhoto(function (index) {
        return (++index) % photos.length;
      });
    };

    Switcher.prev = function () {
      flipPhoto(function (index) {
        return (--index) === -1 ? photos.length - 1 : index;
      });
    };

    Switcher.goto = function ( index ) {
      photoIndex = index;
      setTimeout( changePhoto, delay );
    };
    
    Switcher.slideshow = function () {
      interval = setInterval( Switcher.next, delay * 4 );
    };
    
    Switcher.stopSlideshow = function () {
      clearInterval( interval );
    };

    function changePhoto() {
      currentImage.classList.remove( TRANSITION_CLASS );
      setTimeout(function() {
        currentImage.src = photos[ photoIndex ].src;
        currentImage.onload = function () {
          currentImage.classList.add( TRANSITION_CLASS );
          if (imageDescription) {
            imageDescription.textContent = photos[ photoSwitcher.getPhotoIndex() ].alt;
          }
        };
        
        //Work-around: WebKit and Blink do not display <img> alt text.
        currentImage.onerror = function () {
          imageDescription.textContent = (/WebKit/.test( navigator.userAgent ) ?
                imageDescription.textContent : '') + ' Unable to fetch image!';
        };
      }, delay );
    }
    
    function flipPhoto( callback ) {
      var index = photoIndex;
      index = callback( index );
      selectImage( photos[index] );
      photoIndex = index;
      changePhoto();
    }
    
    return Switcher;
  })(),
  
  exports = {
    Switcher: Switcher,
    dom: {
      prev: prev,
      next: next,
      slideshowStart: startSlideshow,
      slideshowEnd: stopSlideshow,
      image: currentImage,
      description: imageDescription,
      images: !Array.isArray( photos ) ? photos : null,
      galleryActivated: true
    }
  };

function _activateGallery( gallery ) {
  document.documentElement.addEventListener( 'click', function ( event ) {
    exports.dom.galleryActivated = (event.target === gallery);
  });
}

function handleKeyDown( event ) {
  if (exports.dom.galleryActivated) {
    if (event.keyCode === 37) {
      Switcher.prev();
    } else if (event.keyCode === 39) {
      Switcher.next();
    }
  }
}

function handleTouchStart( event ) {
  touchStartX = event.touches[0].pageX;
}

function handleTouchEnd( event ) {
  if (event.touches[0].pageX > touchStartX) {
    Switcher.prev();
  } else if (event.touches[0].pageX < touchStartX) {
    Switcher.next();
  }
  event.preventDefault();
}

function registerButtonClick( action, selector ) {
  var element = (selector ? $( selector ) : document.createElement( 'a' ));
  element.addEventListener( 'click', function () {
    Switcher[action];
  });
  return element;
}

function $( selector ) {
  return document.querySelector( selector );
}

function selectImage( image ) {
  if (image.classList) {
    image.classList.add( SELECTION_CLASS );
    image !== photos[photoIndex] ? photos[photoIndex].classList.remove( SELECTION_CLASS ) : undefined;
  }
}

window.AG = {};

AG.init = function ( options ) {
  currentImage = $( options.$image );
  if (options.$$images) {
    photos = document.querySelectorAll( options.$$images );
    for (photoIndex = 0; photoIndex < photos.length; photoIndex++) {
      (function (i) {
        photos[photoIndex].addEventListener( 'click', function () {
          selectImage( photos[i] );
          Switcher.goto( i );
        });
      })( photoIndex );
    }
    photoIndex = 0;
  } else {
    photos = options.photos;
  }
  
  selectImage( photos[0] );
  currentImage.src = photos[0].src;
  currentImage.classList.add( TRANSITION_CLASS );
  
  if (options.$description) {
    imageDescription = $( options.$description );
  }

  delay = options.delay ?
    options.delay :
    (function () {
      var transitionDuration = getComputedStyle( currentImage ).transitionDuration;
      return parseFloat( transitionDuration.substring( 0, transitionDuration.length - 1 ) ) * 1000;
    })();

  currentImage.addEventListener( 'click', Switcher.next );
  document.addEventListener( 'keydown', handleKeyDown );
  currentImage.addEventListener( 'touchstart', handleTouchStart );
  currentImage.addEventListener( 'touchend', handleTouchEnd );
  prev = registerButtonClick( 'prev', options.$prev );
  next = registerButtonClick( 'next', options.$next );
  startSlideshow = registerButtonClick( 'slideshow', options.$slideshow );
  stopSlideshow = registerButtonClick( 'stopslideshow', options.$stopSlideshow );
  
  if (options.$gallery) {
    _activateGallery( $( options.$gallery ) );
    exports.dom.galleryActivated = false;
  }
  
  if (options.quickSetup) {
    Switcher.slideshow();
    prev = registerButtonClick( 'prev' );
    next = registerButtonClick( 'next' );
    startSlideshow = registerButtonClick( 'slideshow' );
    stopSlideshow = registerButtonClick( 'stopslideshow' );
  }
  
  return AG;
};

AG.extend = function ( callback, methodName ) {
  methodName ? (AG[methodName] = function () {
    callback( exports );
  }) : callback( exports );
  
  return AG;
};

})();
