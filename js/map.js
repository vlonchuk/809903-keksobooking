'use strict';

(function () {
  var ctx = {
  };

  var disableElements = function (selector) {
    var elList = document.querySelectorAll(selector);
    elList.forEach(function (el) {
      el.setAttribute('disabled', '');
    });
  };

  var enableElements = function (selector) {
    var elList = document.querySelectorAll(selector);
    elList.forEach(function (el) {
      el.removeAttribute('disabled');
    });
  };

  var disableMap = function () {
    disableElements('input');
    disableElements('select');
  };

  var activateMap = function () {
    window.api.removeClass('.map', 'map--faded');
    window.api.removeClass('.ad-form', 'ad-form--disabled');
    enableElements('input');
    enableElements('select');
  };

  var initContext = function () {
    ctx.elMap = document.querySelector('.map');
    ctx.elPinMain = document.querySelector('.map__pin--main');
    ctx.elAddress = document.querySelector('#address');
    ctx.onPinMainOnceMouseDown = onPinMainOnceMouseDown;
  };

  var onPinMainOnceMouseDown = function () {
    document.addEventListener('mouseup', onMapActivated);
  };

  var onMapActivated = function () {
    ctx.elPinMain.removeEventListener('mousedown', onPinMainOnceMouseDown);
    document.removeEventListener('mouseup', onMapActivated);
    window.pinMain.detectAddress(ctx);
    activateMap();
    window.pin.makeNewPins(ctx);
  };

  var init = function () {
    initContext();
    disableMap();
    window.form.initValidation();
    window.pinMain.detectAddress(ctx);
    window.pinMain.initPinMainHandlers(ctx);
  };

  init();
})();
