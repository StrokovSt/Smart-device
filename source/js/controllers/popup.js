"use strict";

(function () {
  var mainSection = document.querySelector(`main`);
  var callButton = document.querySelector(`.page-header__button`);
  var ESC_KEY = 27;

  var Inputmask = require('inputmask');

  var render = function (container, template, place) {
    container.insertAdjacentHTML(place, template);
  };

  var returnPopupTemplate = function () {
    return (
      `<div class="popup-call">
        <div class="popup-call__container">
          <button class="popup-call__close-button" type="button">
            <span class="visually-hidden">закрыть окно</span>
          </button>
          <h2 class="popup-call__heading">Закажите звонок</h2>
          <p class="popup-call__description">Оставьте контакты, мы проконсультируем вас бесплатно в удобное время</p>
          <form class="popup-call__feedback-form" action="#" method="post">
            <fieldset class="popup-call__fieldset">
              <ul class="popup-call__list">
                <li class="popup-call__item">
                  <label class="visually-hidden" for="popup-call-user-name">Ваше имя:</label>
                  <input class="popup-call__input input" type="text" name="popup-call-user-name" id="popup-call-user-name" placeholder="Имя"
                  pattern="^[А-Яа-яЁё\s]+$" required>
                  <span class="popup-call__input-error input-error">Введите имя русскими буквами</span>
                </li>
                <li class="popup-call__item">
                  <label class="visually-hidden" for="popup-call-user-tel">Ваш телефон:</label>
                  <input class="popup-call__input input" type="tel" name="popup-call-user-tel" id="popup-call-user-tel" placeholder="Телефон"
                  required>
                  <span class="popup-call__input-error input-error">Введите телефон: +7 (123) 456 78 90</span>
                </li>
                <li class="popup-call__item popup-call__item--textarea">
                  <label class="visually-hidden" for="popup-call-user-question">Ваш вопрос:</label>
                  <textarea name="text" placeholder="Ваш вопрос" cols="30" rows="6" id="popup-call-user-question"></textarea>
                </li>
              </ul>
            </fieldset>
            <button class="popup-call__button button" type="submit">Задать вопрос</button>
            <input class="popup-call__checkbox visually-hidden" type="checkbox" name="popup-consent" id="popup-consent" value="true" required>
            <label class="popup-call__label popup-call__label--consent" for="popup-consent">
              Я согласен на обработку  персональных данных
            </label>
          </form>
        </div>
      </div>`
    );
  };

  var renderPopup = function () {
    render(mainSection, returnPopupTemplate(), `beforeend`);

    var questionPopup = document.querySelector(`.popup-call`);
    var closeButton = questionPopup.querySelector(`.popup-call__close-button`);
    var popupInput = document.getElementById("popup-call-user-tel");

    Inputmask("+7 (999) 999 99 99").mask(popupInput);

    document.body.style.overflow = `hidden`;
    deletePopup(questionPopup, closeButton);
  }

  var deletePopup = function (popup, closeButton) {
    var onPopupClose = function () {
      popup.remove();
      document.body.style.overflow = `auto`;
      document.removeEventListener(`keydown`, onPopupEscPress);
      document.removeEventListener(`click`, onPopupClose);
      mainSection.classList.remove(`page-main--faded`);
    };

    const onPopupEscPress = function (evt) {
      if (evt.keyCode === ESC_KEY) {
        onPopupClose();
      }
    };

    closeButton.addEventListener(`click`, onPopupClose);
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  var onCallButtonClick = (evt) => {
    evt.preventDefault();
    var popup = document.querySelector(`.result-popup`);
    if (!popup) {
      renderPopup();
    }
  };

  callButton.addEventListener(`click`, onCallButtonClick);

})();
