'use strict';

(function () {
  var PALACE_ROOM_NUMBER = 100;
  var PALACE_ROOM_CHOICE = 0;

  var ctx; // Ссылка на контекст с глобальными переменными
  var elType; // Ссылка на тип размещения
  var elPrice; // Ссылка на стоимость

  var setPriceMin = function () {
    if (elType.selectedIndex !== -1) {
      var value = elType.options[elType.selectedIndex].value;
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
    if (!elType) {
      elType = document.querySelector('#type');
    }
    if (elType) {
      if (!elPrice) {
        elPrice = document.querySelector('#price');
      }
      setPriceMin();
      elType.addEventListener('change', function () {
        setPriceMin();
      });
    }
  };

  var elTimein;
  var elTimeout;

  var onTimeChange = function (evt) {
    var source = evt.target;
    var dest = (source === elTimein ? elTimeout : elTimein);
    Array.prototype.every.call(dest.options, function (opt) {
      var result = (source.value !== opt.value);
      if (!result) {
        opt.selected = true;
      }
      return result;
    });
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
    Array.prototype.forEach.call(elCapacity.options, function (opt) {
      var optRoomNumber = parseInt(opt.value, 10);
      if (roomNumber !== PALACE_ROOM_NUMBER) {
        opt.disabled = !(roomNumber >= optRoomNumber && optRoomNumber !== PALACE_ROOM_CHOICE);
      } else {
        opt.disabled = !(optRoomNumber === PALACE_ROOM_CHOICE);
      }

      if (opt.selected) {
        valid = !opt.disabled;
      }
    });

    elCapacity.setCustomValidity((valid ? '' : 'Введено неверное значение'));
  };

  var initCapacityValidation = function () {
    elRoomNumber = document.querySelector('#room_number');
    elCapacity = document.querySelector('#capacity');
    if (elRoomNumber && elCapacity) {
      elRoomNumber.addEventListener('change', onRoomNumberChange);
      elCapacity.addEventListener('change', onRoomNumberChange);
      onRoomNumberChange();
    }
  };

  var reset = function () {
    ctx.elForm.reset();
    window.card.remove(ctx);
    window.pin.remove();
    window.api.disableMap(ctx);
    window.filter.clear();
    window.avatar.clear();
    window.photo.clear();
    setPriceMin();
    ctx.elMap.classList.add('map--faded');
    ctx.elForm.classList.add('ad-form--disabled');
    ctx.elPinMain.style.left = ctx.pinMainLeft + 'px';
    ctx.elPinMain.style.top = ctx.pinMainTop + 'px';
    window.pinMain.detectAddress(ctx);
    window.pinMain.initOnceMouseDown();
    window.scrollTo(0, 0);
  };

  var onSuccessSubmit = function () {
    reset();
    window.success.show(ctx);
  };

  var onFailSubmit = function (message) {
    window.fail.showError(ctx, message);
  };

  var initSubmit = function (ctxRef) {
    if (!ctx) {
      ctx = ctxRef;
    }

    ctx.elForm.addEventListener('submit', function (evt) {
      window.backend.save(new FormData(ctx.elForm), onSuccessSubmit, onFailSubmit);
      evt.preventDefault();
    });
  };

  var initResetButton = function () {
    var elReset = ctx.elForm.querySelector('.ad-form__reset');
    if (elReset) {
      elReset.addEventListener('click', reset);
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
