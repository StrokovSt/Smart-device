'use strict';

(function () {
  var callButton = document.querySelector('.page-header__button');
  var body = document.querySelector('.body-page');
  var ESC_KEY = 27;
  var Inputmask = require('inputmask');

  var setUserData = function (obj) {
    localStorage.setItem('cart', JSON.stringify(obj));
  };

  var getUserData = function () {
    return JSON.parse(localStorage.getItem('cart'));
  };

  var userData = {
    userName: '',
    userNumber: '',
    userMessage: ''
  };

  if (getUserData() !== null) {
    userData = getUserData();
  }

  var renderPopup = function () {
    var questionPopup = document.querySelector('.popup-call');
    var closeButton = questionPopup.querySelector('.popup-call__close-button');
    var popupNameInput = document.getElementById('popup-call-user-name');
    var popupPhoneInput = document.getElementById('popup-call-user-tel');
    var popupQuestionInput = document.getElementById('popup-call-user-question');

    popupNameInput.focus();

    popupNameInput.value = userData.userName;
    popupPhoneInput.value = userData.userNumber;
    popupQuestionInput.value = userData.userMessage;

    new Inputmask('+7 (999) 999 99 99').mask(popupPhoneInput);

    body.classList.add('body-page--blocked');
    deletePopup(questionPopup, closeButton);
  };

  var deletePopup = function (popup, closeButton) {
    var onPopupClose = function () {
      var popupNameInput = document.getElementById('popup-call-user-name');
      var popupPhoneInput = document.getElementById('popup-call-user-tel');
      var popupQuestionInput = document.getElementById('popup-call-user-question');

      userData = {
        userName: popupNameInput.value,
        userNumber: popupPhoneInput.value,
        userMessage: popupQuestionInput.value
      };

      setUserData(userData);
      popup.classList.remove('popup-call--active');
      body.classList.remove('body-page--blocked');
      document.removeEventListener('keydown', onPopupEscPress);
      document.removeEventListener('click', onPopupClose);
      document.removeEventListener('click', onOverlayClick);
    };

    var onPopupEscPress = function (evt) {
      if (evt.keyCode === ESC_KEY) {
        onPopupClose();
      }
    };

    var onOverlayClick = function (evt) {
      var questionPopup = document.querySelector('.popup-call');
      if (!questionPopup.contains(evt.target) && !evt.target.classList.contains('page-header__button')) {
        onPopupClose();
      }
    };

    closeButton.addEventListener('click', onPopupClose);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('click', onOverlayClick);
  };

  var onCallButtonClick = function (evt) {
    evt.preventDefault();
    var popup = document.querySelector('.popup-call');
    if (!popup.classList.contains('popup-call--active')) {
      popup.classList.add('popup-call--active');
      renderPopup();
    }
  };


  callButton.addEventListener('click', onCallButtonClick);

})();
