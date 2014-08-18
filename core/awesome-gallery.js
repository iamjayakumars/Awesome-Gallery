/**
* @author Daniel Desira
* @version 0.5
*/

var AG = {};

(function ( document, ArrayProto, undefined ) {

  'use strict';

  var TRANSITION_CLASS = 'view',
    CLICK_EVENT = 'click',
    BIGSRC_ATTR = 'bigsrc';

  var delay, photos, touchStartX, image, gallery,
    
    photoIndex = 0,
    
    Switcher = (function () {
      var interval,
      Switcher = {};
      
      Switcher.next = function () {
        flipPhoto(function () {
          photoIndex = ( ++photoIndex ) % photos.length;
        });
      };
      
      Switcher.prev = function () {
        flipPhoto(function () {
          photoIndex = ( --photoIndex ) === -1 ? photos.length - 1 : photoIndex;
        });
      };
      
      Switcher.go = function ( index ) {
        var prevIndex = photoIndex;
        photoIndex = index;
        selectImage( prevIndex );
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
          image.src = photos[photoIndex].getAttribute( BIGSRC_ATTR ) ?
                photos[photoIndex].getAttribute( BIGSRC_ATTR ) :
                photos[photoIndex].src;
        }, delay );
      }
      
      function flipPhoto( callback ) {
        var prevIndex = photoIndex;
        callback();
        selectImage( prevIndex );
        changePhoto();
      }
      
      return Switcher;
    })(),
    
    defaults = {
      Switcher: Switcher,
      dom: {
        prev: null,
        next: null,
        slideshow: null,
        stopSlideshow: null,
        image: null,
        desc: null,
        images: null,
        imagesContainer: null,
        gallery: null,
        galleryActivated: true
      }
    };
    
  function _activateGallery() {
    
    //If tabindex is defined, then enable gallery activation mechanism!
    if ( !( defaults.dom.galleryActivated = ( gallery.tabIndex === -1 ) ) ) {
      document.documentElement.addEventListener( 'click', function ( event ) {
        defaults.dom.galleryActivated = ( document.activeElement === gallery );
      });
    }
    
  }

  function handleKeyDown( event ) {
    if ( defaults.dom.galleryActivated ) {
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

  function getButton( action, selector, text ) {
    var element;
    if ( selector ) {
       element = $( selector );
    } else {
       element = gallery.insertBefore( document.createElement( 'a' ), gallery.firstChild );
       element.textContent = text;
       element.classList.add( 'galleryNavButton' );
    }
    element.addEventListener( CLICK_EVENT, Switcher[action] );
    return element;
  }

  function $( selector ) {
    return document.querySelector( selector );
  }

  function selectImage( prevIndex ) {
    var SELECTION_CLASS = 'selected';
    prevIndex !== undefined && photos[prevIndex].classList.remove( SELECTION_CLASS );console.log(photos[photoIndex], photoIndex);
    photos[photoIndex].classList.add( SELECTION_CLASS );
  }

  function extractFunctionArgs( args ) {
    return ArrayProto.splice.call( args, 0, args.length );
  }

  function imageLoad() {
    image.classList.add( TRANSITION_CLASS );
    defaults.dom.desc && ( defaults.dom.desc.textContent = photos[photoIndex].alt );
  }

  function imageError() {
    defaults.dom.desc.textContent = (/WebKit/.test( navigator.userAgent ) ?
            defaults.dom.desc.textContent : '') + ' Unable to fetch image!';
  }

  AG.init = function ( options ) {
    if ( options.$gallery ) {
      gallery = defaults.dom.gallery = $( options.$gallery );
      _activateGallery();
    }
    
    options.autoSlideshow && Switcher.slideshow();
    
    image = defaults.dom.image = $( options.$image );
    image.addEventListener( CLICK_EVENT, Switcher.next );
    document.addEventListener( 'keydown', handleKeyDown );
    gallery.addEventListener( 'touchstart', handleTouchStart );
    gallery.addEventListener( 'touchend', handleTouchEnd );
    
    //Will appear in reverse order!
    defaults.dom.slideshowEnd = getButton( 'stopSlideshow', options.$stopSlideshow, 'pause' );
    defaults.dom.slideshowStart = getButton( 'slideshow', options.$slideshow, 'play' );
    defaults.dom.next = getButton( 'next', options.$next, '>' );
    defaults.dom.prev = getButton( 'prev', options.$prev, '<'  );
    
    image.addEventListener( 'load', imageLoad );
    
    //Work-around: WebKit and Blink do not display <img> alt text.
    image.addEventListener( 'error', imageError );
    
    if ( options.images ) {
      
      //Requires another element to be provided.. To be ditched later
      defaults.dom.imagesContainer = $( options.$imagesContainer );

      options.images.forEach(function ( photo ) {
        var image = document.createElement( 'img' );
        image.src = photo.src;
        image.alt = photo.alt;
        photo.bigsrc && image.setAttribute( BIGSRC_ATTR, photo.bigsrc );
        defaults.dom.imagesContainer.appendChild( image );
      });
      defaults.dom.images = photos = defaults.dom.imagesContainer.children;
    } else {
      defaults.dom.images = photos = document.querySelectorAll( options.$$images );
    }
    
    //Attach Array methods to photos NodeList (currently does not reflect insertions and deletions to DOM)
    Object.getOwnPropertyNames( ArrayProto ).forEach(function ( property ) {
      if ( !photos[property] ) {
        photos[property] = function () {
          return ArrayProto[property].apply( photos, extractFunctionArgs( arguments ) );
        };
      }
    });
    
    photos.forEach(function ( photo, index ) {
      photos[index].addEventListener( CLICK_EVENT, function () {
        Switcher.go( index );
      });
    });
    
    Switcher.go( 0 );
    
    options.$desc && ( defaults.dom.desc = $( options.$desc ) );
    
    delay = parseFloat( getComputedStyle( image ).transitionDuration.replace( 's', '' ) ) * 1000;
    
    return AG;
  };

  AG.extend = function ( callback, methodName ) {
    methodName ? (AG[methodName] = function () {
      callback.apply( AG, [defaults].concat( extractFunctionArgs( arguments ) ) );
      return AG;
    }) : callback( defaults );
    
    return AG;
  };

})( document, [].__proto__ );
