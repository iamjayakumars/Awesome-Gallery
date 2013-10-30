/**
* @author Daniel Desira
* @version 0.5
*/

(function () {

'use strict';

var TRANSITION_CLASS = 'view';

var photoIndex, delay, photos, touchStartX,
  
  Switcher = (function () {
    var interval,
      Switcher = {};
    
    Switcher.next = function () {
      flipPhoto(function ( index ) {
        return (++index) % photos.length;
      });
    };

    Switcher.prev = function () {
      flipPhoto(function ( index ) {
        return (--index) === -1 ? photos.length - 1 : index;
      });
    };

    Switcher.goto = function ( index ) {
      selectImage( photos[index] );
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
      ag.dom.image.classList.remove( TRANSITION_CLASS );
      setTimeout(function() {
        ag.dom.image.src = photos[photoIndex].bigsrc ? photos[photoIndex].bigsrc : photos[photoIndex].src;
        ag.dom.image.onload = function () {
          ag.dom.image.classList.add( TRANSITION_CLASS );
          if (ag.dom.description) {
            ag.dom.description.textContent = photos[ photoSwitcher.getPhotoIndex() ].alt;
          }
        };
        
        //Work-around: WebKit and Blink do not display <img> alt text.
        ag.dom.image.onerror = function () {
          ag.dom.description.textContent = (/WebKit/.test( navigator.userAgent ) ?
                ag.dom.description.textContent : '') + ' Unable to fetch image!';
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
  
  ag = {
    Switcher: Switcher,
    photos: [],
    dom: {
      prev: null,
      next: null,
      slideshowStart: null,
      slideshowEnd: null,
      image: null,
      description: null,
      images: null,
      galleryActivated: true
    }
  };

function _activateGallery( gallery ) {
  document.documentElement.addEventListener( 'click', function ( event ) {
    ag.dom.galleryActivated = (event.target === gallery);
  });
}

function handleKeyDown( event ) {
  if (ag.dom.galleryActivated) {
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
  element.addEventListener( 'click', Switcher[action] );
  return element;
}

function $( selector ) {
  return document.querySelector( selector );
}

function selectImage( image ) {
  var SELECTION_CLASS = 'selected'
  if (image.classList) {
    image.classList.add( SELECTION_CLASS );
    image !== photos[photoIndex] ? photos[photoIndex].classList.remove( SELECTION_CLASS ) : undefined;
  }
}

window.AG = {};

AG.init = function ( options ) {
  ag.dom.image = $( options.$image );
  if (options.$$images) {
    ag.dom.images = photos = document.querySelectorAll( options.$$images );
    for (photoIndex = 0; photoIndex < photos.length; photoIndex++) {
      (function (i) {
        photos[photoIndex].addEventListener( 'click', function () {
          Switcher.goto( i );
        });
      })( photoIndex );
    }
    photoIndex = 0;
  } else {
    ag.photos = photos = options.photos;
  }
  
  selectImage( photos[0] );
  ag.dom.image.src = photos[0].src;
  ag.dom.image.classList.add( TRANSITION_CLASS );
  
  if (options.$description) {
    ag.dom.description = $( options.$description );
  }

  delay = (function () {
    var transitionDuration = getComputedStyle( ag.dom.image ).transitionDuration;
    return parseFloat( transitionDuration.substring( 0, transitionDuration.length - 1 ) ) * 1000;
  })();

  ag.dom.image.addEventListener( 'click', Switcher.next );
  document.addEventListener( 'keydown', handleKeyDown );
  ag.dom.image.addEventListener( 'touchstart', handleTouchStart );
  ag.dom.image.addEventListener( 'touchend', handleTouchEnd );
  ag.dom.prev = registerButtonClick( 'prev', options.$prev );
  ag.dom.next = registerButtonClick( 'next', options.$next );
  ag.dom.slideshowStart = registerButtonClick( 'slideshow', options.$slideshow );
  ag.dom.slideshowEnd = registerButtonClick( 'stopslideshow', options.$stopSlideshow );
  
  if (options.$gallery) {
    _activateGallery( $( options.$gallery ) );
    ag.dom.galleryActivated = false;
  }
  
  if (options.quickSetup) {
    Switcher.slideshow();
    ag.dom.prev = registerButtonClick( 'prev' );
    ag.dom.next = registerButtonClick( 'next' );
    ag.dom.slideshowStart = registerButtonClick( 'slideshow' );
    ag.dom.slideshowEnd = registerButtonClick( 'stopslideshow' );
  }
  
  return AG;
};

AG.extend = function ( callback, methodName ) {
  methodName ? (AG[methodName] = function () {
    callback( ag );
  }) : callback( ag );
  
  return AG;
};

})();
