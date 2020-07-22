'use strict';

(function() {
  var canUseWebp = function () {
    var elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    else {
      return false;
    }
  };

  var useWebp = function () {
    if (canUseWebp()) {
      var images = document.querySelectorAll('[data-bg]');
      for (var i = 0; i < images.length; i++) {
        var webpClass = images[i].classList[0] + '--webp';
        images[i].classList.add(webpClass);
      }
    }
  };

  document.addEventListener('DOMContentLoaded', useWebp);

})();
