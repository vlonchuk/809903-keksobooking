'use strict';

(function () {
  var SELECTED_CLASS = 'map__pin--active';

  var ctx; // Ссылка на контекст с глобальными переменными
  var elOrg; // Ссылка на шаблон метки
  var list = []; // Список меток

  var addOne = function (accommodation, el) {
    el.style.left = accommodation.location.x + 'px';
    el.style.top = accommodation.location.y + 'px';
    var img = el.querySelector('img');
    if (img) {
      img.src = accommodation.author.avatar;
      img.alt = accommodation.offer.title;
    }
    return el;
  };

  var elSelected;

  var deselect = function () {
    if (elSelected) {
      elSelected.classList.remove(SELECTED_CLASS);
      elSelected = undefined;
    }
  };

  var select = function (el) {
    deselect();
    elSelected = el;
    elSelected.classList.add(SELECTED_CLASS);
  };

  var correctPos = function () {
    list.forEach(function (el) {
      el.style.Left = el.offsetLeft - Math.round(el.clientWidth / 2) + 'px';
      el.style.Top = el.offsetTop + el.clientHeight + 'px';
    });
  };

  var addAll = function (accommodations) {
    if (!elOrg) {
      var templ = document.querySelector('#pin');
      elOrg = templ.content.querySelector('.map__pin');
    }

    var fragment = document.createDocumentFragment();
    accommodations.forEach(function (accommodation) {
      var elNew = elOrg.cloneNode(true);
      elNew.addEventListener('click', function () {
        window.card.add(ctx, accommodation, deselect);
        select(elNew);
      });
      fragment.appendChild(addOne(accommodation, elNew));
      list.push(elNew);
    });
    ctx.elMapPins.appendChild(fragment);
  };

  window.pin = {
    makeNew: function (ctxRef, accommodations) {
      ctx = ctxRef;
      ctx.elMap.classList.remove('map--faded');
      // Добавляем метки
      addAll(accommodations);
      // Корректируем их положение относительно их размеров
      correctPos();
    },

    remove: function () {
      list.forEach(function (el) {
        ctx.elMapPins.removeChild(el);
      });
      list = [];
    }
  };
})();
