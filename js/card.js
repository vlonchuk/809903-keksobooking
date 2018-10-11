'use strict';

(function () {
  var PHOTO_ALT_DEF = 'Фотография жилья';
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;

  var PRICE_SUFFIX = '₽/ночь';
  var ARRIVE_CAP = 'Заезд после ';
  var LEAVE_CAP = 'выезд до ';
  var ROOMS_CAP = ' комнат';
  var ROOM_SNG = 'а';
  var ROOM_MLT = 'ы';
  var FOR_CAP = ' для ';
  var GUESTS_CAP = ' гостей';

  var ctx; // Ссылка на контекст с глобальными переменными

  var addText = function (parent, selector, text) {
    var el = parent.querySelector(selector);
    if (el) {
      el.textContent = text;
    }
  };

  var addAvatar = function (accommodation, el) {
    var elAvatar = el.querySelector('.popup__avatar');
    elAvatar.src = accommodation.author.avatar;
  };

  var addPopup = function (accommodation, el) {
    addText(el, '.popup__title', accommodation.offer.title);
    addText(el, '.popup__text--address', accommodation.offer.address);
    addText(el, '.popup__text--price', accommodation.offer.price + PRICE_SUFFIX);
    addText(el, '.popup__type', accommodation.offer.type);
    addText(el, '.popup__text--capacity', accommodation.offer.rooms + ROOMS_CAP + (accommodation.offer.rooms === 1 ? ROOM_SNG : ROOM_MLT) + FOR_CAP + accommodation.offer.guests + GUESTS_CAP);
    addText(el, '.popup__text--time', ARRIVE_CAP + accommodation.offer.checkin + ', ' + LEAVE_CAP + accommodation.offer.checkout);
    addText(el, '.popup__description', accommodation.offer.description);
  };

  var addFeatures = function (accommodation, el) {
    var elFeatures = el.querySelector('.popup__features');
    while (elFeatures.firstChild) {
      elFeatures.removeChild(elFeatures.firstChild);
    }
    accommodation.offer.features.forEach(function (feature) {
      var elFeature = document.createElement('li');
      elFeature.classList.add('popup__feature');
      elFeature.classList.add('popup__feature--' + feature);
      elFeatures.appendChild(elFeature);
    });
  };

  var addPhotos = function (accommodation, el) {
    var elPhotos = el.querySelector('.popup__photos');
    elPhotos.innerHTML = '';
    accommodation.offer.photos.forEach(function (photo) {
      var elImg = document.createElement('img');
      elImg.src = photo;
      elImg.classList.add('popup__photo');
      elImg.width = PHOTO_WIDTH;
      elImg.height = PHOTO_HEIGHT;
      elImg.alt = PHOTO_ALT_DEF;
      elPhotos.appendChild(elImg);
    });
  };

  var addAll = function (accommodation, el) {
    addAvatar(accommodation, el);
    addPopup(accommodation, el);
    addFeatures(accommodation, el);
    addPhotos(accommodation, el);
    return el;
  };

  var elOrg; // Cсылка на шаблон карточки
  var elInsertBefore; // Ссылка на элемент, перед которым вставлять карточку
  var elPopup; // Сама карточка

  var addEventHandlers = function (onDeselectPin) {
    var elPopupClose = elPopup.querySelector('.popup__close');
    if (elPopupClose) {
      elPopupClose.addEventListener('click', function () {
        onDeselectPin();
        window.card.remove();
      });
    }

    var onKeyDown = function (evt) {
      if (evt.keyCode === window.consts.KEY_ESCAPE) {
        onDeselectPin();
        window.card.remove();
        document.removeEventListener('keydown', onKeyDown);
      }
    };
    document.addEventListener('keydown', onKeyDown);
  };

  window.card = {
    remove: function (ctxRef) {
      if (!ctx) {
        ctx = ctxRef;
      }

      if (elPopup) {
        ctx.elMap.removeChild(elPopup);
        elPopup = null;
      }
    },

    add: function (ctxRef, accommodation, onDeselectPin) {
      if (!ctx) {
        ctx = ctxRef;
      }

      this.remove();

      if (!elOrg) {
        var templ = document.querySelector('#card');
        elOrg = templ.content.querySelector('.map__card');
      }
      elPopup = addAll(accommodation, elOrg.cloneNode(true));
      if (!elInsertBefore) {
        elInsertBefore = document.querySelector('.map__filters-container');
      }

      ctx.elMap.insertBefore(elPopup, elInsertBefore);
      addEventHandlers(onDeselectPin);
    }
  };
})();
