'use strict';

(function () {
  var ctx; // Ссылка на контекст с глобальными переменными
  var elSuccess;

  var onMouseDown = function () {
    elSuccess.classList.add('hidden');
    document.removeEventListener('mousedown', onMouseDown);
  };

  var onKeyDown = function (evt) {
    if (evt.keyCode === 27) {
      elSuccess.classList.add('hidden');
      document.removeEventListener('keydown', onKeyDown);
    }
  };

  window.success = {
    showSuccess: function (ctxRef) {
      if (!ctx) {
        ctx = ctxRef;
      }

      if (!elSuccess) {
        var templSuccess = document.querySelector('#success');
        if (templSuccess) {
          var elOrgSuccess = templSuccess.content.querySelector('.success');
          elSuccess = elOrgSuccess.cloneNode(true);
          ctx.elMain.appendChild(elSuccess);
        }
      } else {
        elSuccess.classList.remove('hidden');
      }

      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('keydown', onKeyDown);
    }
  };
})();
