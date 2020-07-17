'use strict';

(function () {
  var informationSection = document.querySelector('.page-footer__information-section');
  var informationList = document.querySelectorAll('.page-footer__information-list');
  var informationListHeading = document.querySelectorAll('.page-footer__information-heading');

  for (var i = 0; i < informationList.length; i++) {
    informationListHeading[i].classList.remove('page-footer__information-heading--open');
  }

  informationSection.addEventListener('click', function (evt) {
    if (evt.target.tagName === 'H3') {
      if (evt.target.classList.contains('page-footer__information-heading--open')) {
        evt.target.classList.remove('page-footer__information-heading--open');
      } else {
        evt.target.classList.add('page-footer__information-heading--open');
      }
    }
  });
})();
