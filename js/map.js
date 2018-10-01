'use strict';

(function () {
  var ctx = {
  };

  var activateMap = function () {
    window.api.removeClass('.map', 'map--faded');
    window.api.removeClass('.ad-form', 'ad-form--disabled');
    window.api.enableElements('input');
    window.api.enableElements('select');
  };

  var initContext = function () {
    ctx.elMain = document.querySelector('main');
    ctx.elMap = document.querySelector('.map');
    ctx.elPinMain = document.querySelector('.map__pin--main');
    ctx.elAddress = document.querySelector('#address');
    ctx.onPinMainOnceMouseDown = onPinMainOnceMouseDown;
    ctx.pinMainLeft = ctx.elPinMain.offsetLeft;
    ctx.pinMainTop = ctx.elPinMain.offsetTop;
  };

  var onPinMainOnceMouseDown = function () {
    document.addEventListener('mouseup', onMapActivated);
  };

  var onLoadDataSuccess = function (data) {
    activateMap();
    window.pin.makeNewPins(ctx, data);
  };

  var onLoadDataFail = function (message) {
    ctx.elPinMain.addEventListener('mousedown', onPinMainOnceMouseDown);
    window.fail.showError(ctx, message);
  };

  var onMapActivated = function () {
    ctx.elPinMain.removeEventListener('mousedown', onPinMainOnceMouseDown);
    document.removeEventListener('mouseup', onMapActivated);
    window.pinMain.detectAddress(ctx);
    window.backend.load(onLoadDataSuccess, onLoadDataFail);
  };

  var init = function () {
    initContext();
    window.api.disableMap();
    window.form.initValidation(ctx);
    window.pinMain.detectAddress(ctx);
    window.pinMain.initHandlers(ctx);
  };

  init();
})();
