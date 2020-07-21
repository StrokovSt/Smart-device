'use strict';

(function () {
  var mainSection = document.querySelector('main');
  var callButton = document.querySelector('.page-header__button');
  var ESC_KEY = 27;
  var Inputmask = require('inputmask');

  var render = function (container, template, place) {
    container.insertAdjacentHTML(place, template);
  };

  var setUserData = function (obj) {
    localStorage.setItem('cart', JSON.stringify(obj));
  };

  var getUserData = function () {
    return JSON.parse(localStorage.getItem('cart'));
  };

  var userData = {
    userName: "",
    userNumber: "",
    userMessage: ""
  };
  if (getUserData() !== null) {
    userData = getUserData();
  }

  var renderPopup = function () {
    var questionPopup = document.querySelector('.popup-call');
    var closeButton = questionPopup.querySelector('.popup-call__close-button');
    var submitButton = questionPopup.querySelector('.popup-call__button');
    var popupNameInput = document.getElementById("popup-call-user-name");
    var popupPhoneInput = document.getElementById("popup-call-user-tel");
    var popupQuestionInput = document.getElementById("popup-call-user-question");

    popupNameInput.value = userData.userName;
    popupPhoneInput.value = userData.userNumber;
    popupQuestionInput.value = userData.userMessage;

    Inputmask("+7 (999) 999 99 99").mask(popupPhoneInput);

    document.body.style.overflow = 'hidden';
    deletePopup(questionPopup, closeButton);
  }

  var deletePopup = function (popup, closeButton) {
    var onPopupClose = function () {
      var popupNameInput = document.getElementById("popup-call-user-name");
      var popupPhoneInput = document.getElementById("popup-call-user-tel");
      var popupQuestionInput = document.getElementById("popup-call-user-question");

      userData = {
        userName: popupNameInput.value,
        userNumber: popupPhoneInput.value,
        userMessage: popupQuestionInput.value
      }

      setUserData(userData);
      popup.classList.remove('popup-call--active');
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', onPopupEscPress);
      document.removeEventListener('click', onPopupClose);
    };

    var onPopupEscPress = function (evt) {
      if (evt.keyCode === ESC_KEY) {
        onPopupClose();
      }
    };

    closeButton.addEventListener('click', onPopupClose);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onCallButtonClick = function (evt) {
    evt.preventDefault();
    var popup = document.querySelector('.popup-call');
    if (!popup.classList.contains('popup-call--active')) {
      popup.classList.add('popup-call--active');
      renderPopup();
    }
  };

  var onSubmitButtonClick = function (evt) {
    evt.preventDefault();
  };

  callButton.addEventListener('click', onCallButtonClick);

})();
