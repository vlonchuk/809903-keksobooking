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

  var addCardAvatar = function (accommodation, el) {
    var elAvatar = el.querySelector('.popup__avatar');
    elAvatar.src = accommodation.author.avatar;
  };

  var addCardText = function (accommodation, el) {
    addText(el, '.popup__title', accommodation.offer.title);
    addText(el, '.popup__text--address', accommodation.offer.address);
    addText(el, '.popup__text--price', accommodation.offer.price + PRICE_SUFFIX);
    addText(el, '.popup__type', accommodation.offer.type);
    addText(el, '.popup__text--capacity', accommodation.offer.rooms + ROOMS_CAP + (accommodation.offer.rooms === 1 ? ROOM_SNG : ROOM_MLT) + FOR_CAP + accommodation.offer.guests + GUESTS_CAP);
    addText(el, '.popup__text--time', ARRIVE_CAP + accommodation.offer.checkin + ', ' + LEAVE_CAP + accommodation.offer.checkout);
    addText(el, '.popup__description', accommodation.offer.description);
  };

  var addCardFeatures = function (accommodation, el) {
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

  var addCardPhotos = function (accommodation, el) {
    var elPhotos = el.querySelector('.popup__photos');
    while (elPhotos.firstChild) {
      elPhotos.removeChild(elPhotos.firstChild);
    }
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

  var addCard = function (accommodation, el) {
    addCardAvatar(accommodation, el);
    addCardText(accommodation, el);
    addCardFeatures(accommodation, el);
    addCardPhotos(accommodation, el);
    return el;
  };

  window.card = {
    removePinCard: function (ctxRef) {
      if (!ctx) {
        ctx = ctxRef;
      }

      var elPinCard = ctx.elMap.querySelector('.map__card');
      if (elPinCard) {
        ctx.elMap.removeChild(elPinCard);
      }
    },

    addPinCard: function (ctxRef, accommodation, onDeselectPin) {
      if (!ctx) {
        ctx = ctxRef;
      }

      this.removePinCard();

      var templCard = document.querySelector('#card');
      var elOrgCard = templCard.content.querySelector('.map__card');
      var newCard = addCard(accommodation, elOrgCard.cloneNode(true));
      var elMapFilter = document.querySelector('.map__filters-container');

      var elPopupClose = newCard.querySelector('.popup__close');
      if (elPopupClose) {
        elPopupClose.addEventListener('click', onDeselectPin);
      }

      ctx.elMap.insertBefore(newCard, elMapFilter);
    }
  };
})();
