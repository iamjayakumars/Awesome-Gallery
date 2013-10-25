/**
 * @author Daniel Desira
 * @version 0.5
 */

(function () {

'use strict';

var currentImage, imageDescription, delay, photos, touchStartX, prev, next, startSlideshow, stopSlideshow,
  galleryActivated = true,
  photoIndex = 0,
  Switcher = (function () {
    var interval,
      Switcher = {};
    
    Switcher.next = function () {
      photoIndex = (++photoIndex) % photos.length;
      changePhoto();
    };

    Switcher.prev = function () {
      photoIndex = ((--photoIndex) === -1 ? photos.length - 1 : photoIndex);
      changePhoto();
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
      currentImage.classList.remove( 'view' );
      setTimeout(function() {
        currentImage.src = photos[ photoIndex ].src;
        currentImage.onload = function () {
          currentImage.classList.add( 'view' );
          if (imageDescription) {
            imageDescription.textContent = photos[ photoSwitcher.getPhotoIndex() ].description;
          }
        };
        
        //Work-around: WebKit and Blink do not display <img> alt text.
        currentImage.onerror = function () {
          imageDescription.textContent = (/WebKit/.test( navigator.userAgent ) ?
                imageDescription.textContent : '') + ' Unable to fetch image!';
        };
      }, delay );
    }
    
    return Switcher;
  })();

function _activateGallery( gallery ) {
  document.documentElement.addEventListener( 'click', function ( event ) {
    var event = document.createEvent( 'HTMLEvents' );
    event.initEvent( 'galleryActivated', true, true );
    galleryActivated = (event.target === gallery);
    gallery.dispatchEvent( event );
  });
}

function handleKeyDown( event ) {
  if (galleryActivated) {
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

window.AG = {};

AG.init = function ( options ) {
  currentImage = $( options.$image );
  if (options.imagesSelector) {
    photos = document.querySelectorAll( options.$$images );
    for (photoIndex = 0; photoIndex < photos.length; photoIndex++) {
      (function (i) {
        photos[photoIndex].addEventListener( 'click', function () {
          Switcher.goto( i );
        });
      })( photoIndex );
    }
    photoIndex = 0;
  } else {
    photos = options.photos;
  }
  currentImage.src = photos[0].src;
  currentImage.classList.add( 'view' );
  
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
    galleryActivated = false;
  }
  
  if (options.quickSetup) {
    Switcher.slideshow();
    prev = registerButtonClick( 'prev' );
    next = registerButtonClick( 'next' );
    startSlideshow = registerButtonClick( 'slideshow' );
    stopSlideshow = registerButtonClick( 'stopslideshow' );
  }
};

AG.exports = {
    Switcher: Switcher,
    dom: {
      prev: prev,
      next: next,
      slideshowStart: slideshowStart,
      slideshowEnd: slideshowEnd,
      image: currentImage,
      description: imageDecription,
      images: !Array.isArray( photos ) ? photos : null,
      galleryActivated: galleryActivated
    }
  };

AG.extend = function ( callback, methodName ) {
  gallery.addEventListener( 'galleryActivated', function () {
    AG.exports.galleryActivated = galleryActivated;
  });
  
  methodName ? (AG[methodName] = callback) : callback();
};

})();
