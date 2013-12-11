/**
* @author Daniel Desira
* @version 0.5
*/

var AG = {};

(function ( document, undefined ) {

'use strict';

var TRANSITION_CLASS = 'view',
  CLICK_EVENT = 'click';

var photoIndex, delay, photos, touchStartX, image,

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
    
    Switcher.go = function ( index ) {
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
      image.classList.remove( TRANSITION_CLASS );
      setTimeout(function () {
        if ( photos[photoIndex].getAttribute && photos[photoIndex].getAttribute( 'bigsrc' ) ) {
          image.src = photos[photoIndex].getAttribute( 'bigsrc' );
        } else if ( photos[photoIndex].bigsrc ) {
          image.src = photos[photoIndex].bigsrc;
        } else {
          image.src = photos[photoIndex].src;
        }
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
      slideshow: null,
      stopSlideshow: null,
      image: null,
      description: null,
      images: null,
      gallery: null,
      galleryActivated: true
    }
  };
  
function _activateGallery() {
  document.documentElement.addEventListener( 'click', function ( event ) {
    ag.dom.galleryActivated = (event.target === ag.dom.gallery);
  });
}

function handleKeyDown( event ) {
  if ( ag.dom.galleryActivated ) {
    if ( event.keyCode === 37 ) {
      Switcher.prev();
    } else if ( event.keyCode === 39 ) {
      Switcher.next();
    }
  }
}

function handleTouchStart( event ) {
  touchStartX = event.touches[0].pageX;
}

function handleTouchEnd( event ) {
  if ( event.touches[0].pageX > touchStartX ) {
    Switcher.prev();
  } else if ( event.touches[0].pageX < touchStartX ) {
    Switcher.next();
  }
  event.preventDefault();
}

function getButton( action, selector, text, className ) {
  var element = selector ?
        $( selector ) :
        ag.dom.gallery.appendChild( document.createElement( 'a' ) );
  element.textContent = text;
  element.classList.add( className );
  element ? element.addEventListener( CLICK_EVENT, Switcher[action] ) : undefined;
  return element;
}

function $( selector ) {
  return document.querySelector( selector );
}

function selectImage( image ) {
  var SELECTION_CLASS = 'selected'
  image.classList.add( SELECTION_CLASS );
  image !== photos[photoIndex] ? photos[photoIndex].classList.remove( SELECTION_CLASS ) : undefined;
}

function registerImagesClick() {

}

AG.init = function ( options ) {
  if ( options.$gallery ) {
    ag.dom.gallery = $( options.$gallery );
    _activateGallery();
    ag.dom.galleryActivated = false;
  }
  
  options.autoSlideshow ? Switcher.slideshow() : undefined;
  
  ag.dom.prev = getButton( 'prev', options.$prev, '<', 'galleryNavButton' );
  ag.dom.next = getButton( 'next', options.$next, '>', 'galleryNavButton' );
  ag.dom.slideshowStart = getButton( 'slideshow', options.$slideshow, 'play', 'galleryNavButton' );
  ag.dom.slideshowEnd = getButton( 'stopSlideshow', options.$stopSlideshow, 'pause', 'galleryNavButton' );
  
  image = ag.dom.image = $( options.$image );
  image.addEventListener( CLICK_EVENT, Switcher.next );
  document.addEventListener( 'keydown', handleKeyDown );
  ag.dom.gallery.addEventListener( 'touchstart', handleTouchStart );
  ag.dom.gallery.addEventListener( 'touchend', handleTouchEnd );
  
  image.onload = function () {
    image.classList.add( TRANSITION_CLASS );
    ag.dom.description ?
          ag.dom.description.textContent = photos[photoIndex].alt :
          undefined;
  };
  
  //Work-around: WebKit and Blink do not display <img> alt text.
  image.onerror = function () {
    ag.dom.description.textContent = (/WebKit/.test( navigator.userAgent ) ?
          ag.dom.description.textContent : '') + ' Unable to fetch image!';
  };
  
  if ( options.$$images ) {
    ag.dom.images = photos = document.querySelectorAll( options.$$images );
    for (photoIndex = 0; photoIndex < photos.length; photoIndex++) {
      (function (i) {
        photos[photoIndex].addEventListener( CLICK_EVENT, function () {
          Switcher.go( i );
        });
      })( photoIndex );
    }
    photoIndex = 0;
  } else {
    ag.photos = photos = options.photos;
    photos.forEach(function ( photo ) {
      var image = document.createElement( 'img' );
      image.src = photo.src;
      image.alt = photo.alt;
      ag.dom.imagesContainer.appendChild( image );
    });
  }
  
  Switcher.go( 0 );
  
  options.$description ? (ag.dom.description = $( options.$description )) : undefined;
  
  delay = (function () {
    var transitionDuration = getComputedStyle( image ).transitionDuration;
    return parseFloat( transitionDuration.substring( 0, transitionDuration.length - 1 ) ) * 1000;
  })();
  
  return AG;
};

AG.extend = function ( callback, methodName ) {
  methodName ? (AG[methodName] = function () {
    callback( ag );
  }) : callback( ag );
  
  return AG;
};

})( document );
