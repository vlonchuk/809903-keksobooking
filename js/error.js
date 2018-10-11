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
    if (evt.keyCode === window.consts.KEY_ESCAPE) {
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
        var templ = document.querySelector('#error');
        if (templ) {
          var elOrg = templ.content.querySelector('.error');
          elError = elOrg.cloneNode(true);
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
