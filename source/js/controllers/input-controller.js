"use strict";

(function () {
  var Inputmask = require('inputmask');

  var questionSectionForm = document.querySelector(".questions-section__feedback-form");
  var questionSectionInput = document.getElementById("questions-section-user-tel");

  Inputmask("+7 (999) 999 99 99").mask(questionSectionInput);

  questionSectionForm.addEventListener("submit", function () {
    questionSectionForm.reset();
  });

  questionSectionInput.addEventListener("input", function () {
    var inputValidity = questionSectionInput.validity.patternMismatch;
    if (!inputValidity) {
      questionSectionInput.setCustomValidity("");
    } else {
      questionSectionInput.setCustomValidity("Введите номер телефона");
    }
  });

})();
