'use strict';

(function () {
  var FILTER_TIMEOUT = 500;
  var ctx = {
  };

  var accomodations;
  var filter;
  var filterTimeout;
  var filteredData;

  var activate = function () {
    ctx.elMap.classList.remove('map--faded');
    ctx.elForm.classList.remove('ad-form--disabled');
    window.api.enableElements('input');
    window.api.enableElements('select');
    window.api.enableElements('.ad-form__element--submit', ctx.elForm);
  };

  var initContext = function () {
    ctx.elMain = document.querySelector('main');
    ctx.elMap = ctx.elMain.querySelector('.map');
    ctx.elMapPins = ctx.elMap.querySelector('.map__pins');
    ctx.elFilter = ctx.elMap.querySelector('.map__filters');
    ctx.elForm = ctx.elMain.querySelector('.ad-form');
    ctx.elPinMain = ctx.elMap.querySelector('.map__pin--main');
    ctx.elAddress = ctx.elForm.querySelector('#address');
    ctx.onPinMainOnceMouseDown = onPinMainOnceMouseDown;
    ctx.pinMainLeft = ctx.elPinMain.offsetLeft;
    ctx.pinMainTop = ctx.elPinMain.offsetTop;

    filter = new window.filter.Filter(ctx, onFilter);
    window.filter.init(ctx, function () {
      filter.filterData(accomodations);
    });
  };

  var onPinMainOnceMouseDown = function () {
    document.addEventListener('mouseup', onActivated);
  };

  var onLoadDataSuccess = function (data) {
    accomodations = data;
    activate();
    filter.filterData(accomodations);
  };

  var onFilter = function (data) {
    if (filterTimeout) {
      window.clearTimeout(filterTimeout);
      filterTimeout = null;
    }

    filterTimeout = window.setTimeout(function () {
      if (filteredData) {
        var equal = false;
        if (filteredData.length === data.length) {
          equal = filteredData.every(function (el, i) {
            return filteredData[i] === data[i];
          });
        }
        if (equal) {
          return;
        }
      }

      window.card.remove(ctx);
      window.pin.remove();
      window.pin.makeNew(ctx, data);
      filteredData = data;
    }, FILTER_TIMEOUT);
  };

  var onLoadDataFail = function (message) {
    ctx.elPinMain.addEventListener('mousedown', onPinMainOnceMouseDown);
    window.fail.showError(ctx, message);
  };

  var onActivated = function () {
    ctx.elPinMain.removeEventListener('mousedown', onPinMainOnceMouseDown);
    document.removeEventListener('mouseup', onActivated);
    window.pinMain.detectAddress(ctx);
    window.backend.load(onLoadDataSuccess, onLoadDataFail);
  };

  var init = function () {
    initContext();
    window.api.disableMap(ctx);
    window.form.initValidation(ctx);
    window.pinMain.detectAddress(ctx);
    window.pinMain.initHandlers(ctx);
    window.avatar.init(ctx);
    window.photo.init(ctx);
  };

  init();
})();
