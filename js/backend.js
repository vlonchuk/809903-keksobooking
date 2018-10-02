'use strict';

(function () {
  var TIMEOUT = 10000;
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';

  var ERR_GENERIC = 'Произошла ошибка соединения';
  var ERR_TIMEOUT = 'Запрос не успел выполниться за ' + TIMEOUT + 'мс';

  var HTTP_SUCCESS = 200;

  window.backend = {
    load: function (onLoad, onError) {
      var req = new XMLHttpRequest();
      req.addEventListener('load', function () {
        if (req.status === HTTP_SUCCESS) {
          try {
            var json = JSON.parse(req.responseText);
            onLoad(json);
          } catch (error) {
            onError(error.message);
          }
        } else {
          onError(req.status + ' ' + req.statusText);
        }
      });

      req.addEventListener('error', function () {
        onError(ERR_GENERIC);
      });

      req.addEventListener('timeout', function () {
        onError(ERR_TIMEOUT);
      });

      req.timeout = TIMEOUT;
      req.open('GET', URL_GET);
      req.send();
    },

    save: function (data, onLoad, onError) {
      var req = new XMLHttpRequest();

      req.addEventListener('load', function () {
        if (req.status !== HTTP_SUCCESS) {
          onError(req.status + ' ' + req.statusText);
        } else {
          onLoad();
        }
      });

      req.addEventListener('error', function () {
        onError(ERR_GENERIC);
      });

      req.addEventListener('timeout', function () {
        onError(ERR_TIMEOUT);
      });

      req.timeout = TIMEOUT;
      req.open('POST', URL_POST);
      req.send(data);
    }
  };
})();
