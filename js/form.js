'use strict';

(function () {
  var PALACE_ROOM_NUMBER = 100;
  var PALACE_ROOM_CHOICE = 0;

  var ctx; // Ссылка на контекст с глобальными переменными
  var form;

  var setPriceMin = function (el, elPrice) {
    if (el.selectedIndex !== -1) {
      var value = el.options[el.selectedIndex].value;
      switch (value) {
        case 'bungalo':
          elPrice.min = 0;
          break;
        case 'flat':
          elPrice.min = 1000;
          break;
        case 'house':
          elPrice.min = 5000;
          break;
        case 'palace':
          elPrice.min = 10000;
          break;
      }
      elPrice.placeholder = elPrice.min;
    }
  };

  var initTypeValidation = function () {
    var elType = document.querySelector('#type');
    if (elType) {
      var elPrice = document.querySelector('#price');
      setPriceMin(elType, elPrice);
      elType.addEventListener('change', function () {
        setPriceMin(elType, elPrice);
      });
    }
  };

  var elTimein;
  var elTimeout;

  var onTimeChange = function (evt) {
    var source = evt.target;
    var dest = (source === elTimein ? elTimeout : elTimein);
    for (var i = 0; i < dest.options.length; i++) {
      var opt = dest.options[i];
      var result = (source.value === opt.value);
      if (result) {
        opt.selected = true;
        break;
      }
    }
  };

  var initTimeValidation = function () {
    elTimein = document.querySelector('#timein');
    elTimeout = document.querySelector('#timeout');
    if (elTimein && elTimeout) {
      elTimein.addEventListener('change', onTimeChange);
      elTimeout.addEventListener('change', onTimeChange);
    }
  };

  var elRoomNumber;
  var elCapacity;

  var onRoomNumberChange = function () {
    var roomNumber = parseInt(elRoomNumber.value, 10);
    var valid = true;
    for (var i = 0; i < elCapacity.options.length; i++) {
      var opt = elCapacity.options[i];
      var optRoomNumber = parseInt(opt.value, 10);
      if (roomNumber !== PALACE_ROOM_NUMBER) {
        opt.disabled = !(roomNumber >= optRoomNumber && optRoomNumber !== PALACE_ROOM_CHOICE);
      } else {
        opt.disabled = !(optRoomNumber === PALACE_ROOM_CHOICE);
      }

      if (opt.selected) {
        valid = !opt.disabled;
      }
    }

    elCapacity.setCustomValidity((valid ? '' : 'Введено неверное значение'));
  };

  var initCapacityValidation = function () {
    elRoomNumber = document.querySelector('#room_number');
    elCapacity = document.querySelector('#capacity');
    if (elRoomNumber && elCapacity) {
      elRoomNumber.addEventListener('change', onRoomNumberChange);
      onRoomNumberChange();
    }
  };

  var formReset = function () {
    form.reset();
    window.pin.removePins();
    window.api.disableMap();
    ctx.elMap.classList.add('map--faded');
    window.api.addClass('.ad-form', 'ad-form--disabled');
    ctx.elPinMain.style.left = ctx.pinMainLeft + 'px';
    ctx.elPinMain.style.top = ctx.pinMainTop + 'px';
    window.pinMain.detectAddress(ctx);
    window.pinMain.initOnceMouseDown();
    window.scrollTo(0, 0);
  };

  var onSuccessSubmit = function () {
    formReset();
    window.success.showSuccess(ctx);
  };

  var onFailSubmit = function (message) {
    window.fail.showError(ctx, message);
  };

  var initSubmit = function (ctxRef) {
    if (!ctx) {
      ctx = ctxRef;
    }

    if (!form) {
      form = document.querySelector('.ad-form');
    }

    if (form) {
      form.addEventListener('submit', function (evt) {
        window.backend.save(new FormData(form), onSuccessSubmit, onFailSubmit);
        evt.preventDefault();
      });
    }
  };

  var initResetButton = function () {
    var elReset = form.querySelector('.ad-form__reset');
    if (elReset) {
      elReset.addEventListener('click', function () {
        formReset();
      });
    }
  };

  window.form = {
    initValidation: function (ctxRef) {
      initSubmit(ctxRef);
      initResetButton();
      initTypeValidation();
      initTimeValidation();
      initCapacityValidation();
    }
  };
})();
