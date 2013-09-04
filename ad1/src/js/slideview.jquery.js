(function ($) {

"use strict";

function defVal(param, val) {
  return param ? param : val;
}

function getNextTransitionable(el) {
  while (el && getComputedStyle(el).transitionDuration === '0s') {
    el = el.nextElementSibling;
  }
  return el;
}

$.fn.slideview = function (options) {
  options = defVal(options, {});
  options.slideChangeClass = defVal(options.slideChangeClass, 'slideDisplay');
  options.subChangeClass = defVal(options.subChangeClass, 'subDisplay');
  
  return this.each(function () {
    var TRANSITION_END_EVENTS = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';
    
    $(this.children).each(function () {
      $(this.children).on(TRANSITION_END_EVENTS, function () {
        $(getNextTransitionable(this.nextElementSibling)).addClass(options.subChangeClass)[0] ||
            $(getNextTransitionable(this.parentNode.nextElementSibling)).addClass(options.slideChangeClass)[0] ||
            options.onEnd();
      });
      
      $(this).on(TRANSITION_END_EVENTS, function () {
        $(this.firstElementChild).addClass(options.subChangeClass);
      });
    });
    
    $(this.firstElementChild).addClass(options.slideChangeClass);
  });
};

})(jQuery);