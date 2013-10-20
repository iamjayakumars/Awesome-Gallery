/**
 * @author Daniel Desira
 * @version 0.4.2
 */

(function () {

'use strict';

var currentImage, imageDescription, delay, photos, touchStartX,
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

    Switcher.goto = function () {
      setTimeout(changePhoto, 1000);
    };
    
    Switcher.slideshow = function () {
      interval = setInterval(Switcher.next, delay * 4);
    };
    
    Switcher.stopSlideshow = function () {
      clearInterval(interval);
    };

    function changePhoto () {
      currentImage.classList.remove('view');
      setTimeout(function() {
        currentImage.src = photos[ photoIndex ].src;
        currentImage.onload = function() {
          currentImage.classList.add('view');
          if (imageDescription) {
            imageDescription.textContent = photos[ photoSwitcher.getPhotoIndex() ].description;
          }
        };
        
        //Work-around: WebKit and Blink do not display <img> alt text.
        currentImage.onerror = function() {
          imageDescription.textContent = (/WebKit/.test( navigator.userAgent ) ?
                imageDescription.textContent : '') + ' Unable to fetch image!';
        };
      }, delay);
    }
    
    return Switcher;
  })();

function _activateGallery(gallery) {
  document.documentElement.addEventListener('click', function (event) {
    if (event.target === gallery) {
      galleryActivated = true;
    } else {
      galleryActivated = false;
    }
  });
}

function handleKeyDown(event) {
  if (galleryActivated) {
    if (event.keyCode === 37) {
      Switcher.prev();
    } else if (event.keyCode === 39) {
      Switcher.next();
    }
  }
}

function handleTouchStart(event) {
  touchStartX = event.touches[0].pageX;
}

function handleTouchEnd(event) {
  if (event.touches[0].pageX > touchStartX) {
    Switcher.prev();
  } else if (event.touches[0].pageX < touchStartX) {
    Switcher.next();
  }
  event.preventDefault();
}

function registerHandler(property, callback) {
  if (typeof property === 'function') {
    property(callback);
  } else if (property) {
    throw 'Property not a function!';
  }
}

window.awesomeGallery = function (options) {
  var $ = document.querySelector;
  
  currentImage = $(options.imageSelector);
  if (options.imagesSelector) {
    photos = document.querySelectorAll(options.imagesSelector);
    for (photoIndex = 0; photoIndex < photos.length; photoIndex++) {
      (function (i) {
        photos[photoIndex].addEventListener('click', function () {
          photoIndex = i;
          Switcher.goto();
        });
      })(photoIndex);
    }
    photoIndex = 0;
  } else {
    photos = options.photos;
  }
  currentImage.src = photos[0].src;
  currentImage.classList.add('view');
  
  if (options.descriptionSelector) {
    imageDescription = $(options.descriptionSelector);
  }

  delay = options.delay ?
    options.delay :
    (function () {
      var transitionDuration = getComputedStyle(currentImage).transitionDuration;
      return parseFloat(transitionDuration.substring(0, transitionDuration.length - 1)) * 1000;
    })();

  currentImage.addEventListener('click', Switcher.next);
  document.addEventListener('keydown' , handleKeyDown);
  currentImage.addEventListener('touchstart', handleTouchStart);
  currentImage.addEventListener('touchend', handleTouchEnd);
  registerHandler(options.slideshow, Switcher.slideshow);
  registerHandler(options.stopSlideshow, Switcher.stopSlideshow);
  registerHandler(options.next, Switcher.next);
  registerHandler(options.prev, Switcher.prev);
  
  if (options.gallerySelector) {
    _activateGallery($(options.gallerySelector));
    galleryActivated = false;
  }
  
  if (options.quickSetup) {
    Switcher.slideshow();
  }
};

})();
