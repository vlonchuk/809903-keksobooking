'use strict';

(function () {
  var ctx; // Ссылка на контекст с глобальными переменными
  var elError;
  var elMessage;

  var onMouseDown = function () {
    elError.classList.add('hidden');
    document.removeEventListener('mousedown', onMouseDown);
  };

  var onKeyDown = function (evt) {
    if (evt.keyCode === 27) {
      elError.classList.add('hidden');
      document.removeEventListener('keydown', onKeyDown);
    }
  };

  window.fail = {
    showError: function (ctxRef, message) {
      if (!ctx) {
        ctx = ctxRef;
      }

      if (!elError) {
        var templError = document.querySelector('#error');
        if (templError) {
          var elOrgError = templError.content.querySelector('.error');
          elError = elOrgError.cloneNode(true);
          var button = elError.querySelector('.error__button');
          button.addEventListener('click', function () {
            elError.classList.add('hidden');
          });
          elMessage = elError.querySelector('.error__message');
          ctx.elMain.appendChild(elError);
        }
      } else {
        elError.classList.remove('hidden');
      }

      elMessage.textContent = message;

      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('keydown', onKeyDown);
    }
  };
})();
