'use strict';

(function () {
  var SELECTED_PIN_CLASS = 'map__pin--active';

  var ctx; // Ссылка на контекст с глобальными переменными

  var addPin = function (accommodation, el) {
    el.style.left = accommodation.location.x + 'px';
    el.style.top = accommodation.location.y + 'px';
    var img = el.querySelector('img');
    if (img) {
      img.src = accommodation.author.avatar;
      img.alt = accommodation.offer.title;
    }
    return el;
  };

  var elSelectedPin;

  var deselectPin = function () {
    if (elSelectedPin) {
      elSelectedPin.classList.remove(SELECTED_PIN_CLASS);
      elSelectedPin = undefined;
    }
  };

  var selectPin = function (pin) {
    deselectPin();
    elSelectedPin = pin;
    elSelectedPin.classList.add(SELECTED_PIN_CLASS);
  };

  var correctPinsPos = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.style.Left = pin.offsetLeft - Math.round(pin.clientWidth / 2) + 'px';
      pin.style.Top = pin.offsetTop + pin.clientHeight + 'px';
    });
  };

  var onDeselectPin = function (evt) {
    deselectPin();
    ctx.elMap.removeChild(evt.target.parentElement);
  };

  var addPins = function (accommodations) {
    var templPin = document.querySelector('#pin');
    var elOrgPin = templPin.content.querySelector('.map__pin');
    var fragmentPins = document.createDocumentFragment();
    accommodations.forEach(function (accommodation) {
      var elNewPin = elOrgPin.cloneNode(true);
      elNewPin.addEventListener('click', function () {
        window.card.addPinCard(ctx, accommodation, onDeselectPin);
        selectPin(elNewPin);
      });
      fragmentPins.appendChild(addPin(accommodation, elNewPin));
    });
    window.api.addElement(fragmentPins, '.map__pins');
  };

  window.pin = {
    makeNewPins: function (ctxRef, accommodations) {
      ctx = ctxRef;
      ctx.elMap.classList.remove('map--faded');
      // Добавляем метки
      addPins(accommodations);
      // Корректируем положение меток относительно их размеров
      correctPinsPos();
    },

    removePins: function () {
      var elMapPins = ctx.elMap.querySelector('.map__pins');
      var pinList = elMapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      pinList.forEach(function (el) {
        elMapPins.removeChild(el);
      });
    }
  };
})();
