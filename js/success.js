'use strict';

(function () {
  var ctx; // Ссылка на контекст с глобальными переменными
  var elMessage;

  var onMouseDown = function () {
    elMessage.classList.add('hidden');
    document.removeEventListener('mousedown', onMouseDown);
  };

  var onKeyDown = function (evt) {
    if (evt.keyCode === window.consts.KEY_ESCAPE) {
      elMessage.classList.add('hidden');
      document.removeEventListener('keydown', onKeyDown);
    }
  };

  window.success = {
    show: function (ctxRef) {
      if (!ctx) {
        ctx = ctxRef;
      }

      if (!elMessage) {
        var templ = document.querySelector('#success');
        if (templ) {
          var elOrg = templ.content.querySelector('.success');
          elMessage = elOrg.cloneNode(true);
          ctx.elMain.appendChild(elMessage);
        }
      } else {
        elMessage.classList.remove('hidden');
      }

      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('keydown', onKeyDown);
    }
  };
})();
