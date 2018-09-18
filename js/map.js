'use strict';

var ANNOUNCEMENT_COUNT = 8;
var AVATAR_START = 'img/avatars/user';
var AVATAR_END = '.png';
var AVATAR_INDEX_LENGTH = 2;
var AVATAR_INDEX_PADCH = '0';
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MAX_ROOM_COUNT = 5;
var MIN_GUEST = 2;
var MAX_GUEST = 10;

var Y_START = 250;
var Y_END = 600;
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

var CHECK_INOUT = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var REALTIES = [
  {name: 'Большая уютная квартира', type: 'flat'},
  {name: 'Маленькая неуютная квартира', type: 'flat'},
  {name: 'Огромный прекрасный дворец', type: 'palace'},
  {name: 'Маленький ужасный дворец', type: 'palace'},
  {name: 'Красивый гостевой домик', type: 'house'},
  {name: 'Некрасивый негостеприимный домик', type: 'house'},
  {name: 'Уютное бунгало далеко от моря', type: 'bungalo'},
  {name: 'Неуютное бунгало по колено в воде', type: 'bungalo'}
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var elMap; // Ссылка на карту

// Возврат случайного числа от 0 до num-1
var getRand = function (num) {
  var size = 1.0 / num;
  return Math.floor(Math.random() / size);
};

// Возврат случайного элемента массива
var getRandElement = function (array) {
  return array[getRand(array.length)];
};

var padString = function (str, len, ch) {
  var strLen = str.length;
  for (var i = 0; i < (len - strLen); i++) {
    str = ch + str;
  }
  return str;
};

// Возвращает случайный сортированный набор элементов массива
var getRandSubArray = function getRandSubArray(source, nCount, needSort) {
  var len = source.length;
  var array = source.slice();
  nCount = nCount || source.length;
  var result = new Array(nCount);

  for (var i = 0; i < nCount; i++) {
    var r = getRand(len);
    while (r < source.length - 1 && !array[r]) {
      r++;
    }
    result[i] = needSort ? r : array[r];
    array[r] = undefined;
    len--;
  }

  if (needSort) {
    result.sort(function (a, b) {
      return a - b;
    });
    var clonedArray = new Array(result.length);
    result.forEach(function (el, j) {
      clonedArray[j] = source[el];
    });
    return clonedArray;
  } else {
    return result;
  }
};

var generateData = function () {
  var data = [];
  var avatars = new Array(ANNOUNCEMENT_COUNT);
  for (var i = 0; i < ANNOUNCEMENT_COUNT; i++) {
    avatars[i] = i + 1;
  }

  var randRealties = getRandSubArray(REALTIES);
  var randAvatars = getRandSubArray(avatars);

  randRealties.forEach(function (realty, iRealty) {
    data[iRealty] = {author: {}, offer: {}, location: {}};
    var d = data[iRealty];

    d.author.avatar = AVATAR_START + padString(randAvatars[iRealty].toString(), AVATAR_INDEX_LENGTH, AVATAR_INDEX_PADCH) + AVATAR_END;
    d.offer.title = realty.name;
    d.offer.type = realty.type;
    var price = getRand(MAX_PRICE - MIN_PRICE + 1) + MIN_PRICE;
    price = Math.floor(price / 1000) * 1000;
    d.offer.price = price;
    d.offer.rooms = getRand(MAX_ROOM_COUNT) + 1;
    d.offer.guests = getRand(MAX_GUEST - MIN_GUEST + 1) + MIN_GUEST;
    d.offer.checkin = getRandElement(CHECK_INOUT);
    d.offer.checkout = getRandElement(CHECK_INOUT);

    d.offer.features = getRandSubArray(FEATURES, getRand(FEATURES.length - 1) + 1, true);
    d.offer.description = '';
    d.offer.photos = getRandSubArray(PHOTOS);
    d.location = {x: getRand(Y_END - Y_START) + Y_START, y: getRand(Y_END - Y_START) + Y_START};
    d.offer.address = d.location.x.toString() + ', ' + d.location.y.toString();
  });

  return data;
};

var addElement = function (fragment, selector) {
  var parent = document.querySelector(selector);
  parent.appendChild(fragment);
};

var removeClass = function (selector, className) {
  var element = document.querySelector(selector);
  if (element) {
    element.classList.remove(className);
  }
};

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

var addPins = function (accommodations) {
  var templPin = document.querySelector('#pin');
  var elOrgPin = templPin.content.querySelector('.map__pin');
  var fragmentPins = document.createDocumentFragment();
  accommodations.forEach(function (accommodation) {
    var elNewPin = elOrgPin.cloneNode(true);
    elNewPin.addEventListener('click', function () {
      removePinCard();
      addPinCard(accommodation);
    });
    fragmentPins.appendChild(addPin(accommodation, elNewPin));
  });
  addElement(fragmentPins, '.map__pins');
};

var correctPinsPos = function () {
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  pins.forEach(function (pin) {
    pin.offsetLeft -= (pin.clientWidth / 2) + 'px';
    pin.offsetTop += pin.offsetTop + pin.clientHeight + 'px';
  });
};

var removePinCard = function () {
  var elPinCard = elMap.querySelector('.map__card');
  if (elPinCard) {
    elMap.removeChild(elPinCard);
  }
};

var addPinCard = function (accommodation) {
  var templCard = document.querySelector('#card');
  var elOrgCard = templCard.content.querySelector('.map__card');
  var newCard = addCard(accommodation, elOrgCard.cloneNode(true));
  var elMapFilter = document.querySelector('.map__filters-container');

  var elPopupClose = newCard.querySelector('.popup__close');
  if (elPopupClose) {
    elPopupClose.addEventListener('click', function (evt) {
      elMap.removeChild(evt.target.parentElement);
    });
  }

  elMap.insertBefore(newCard, elMapFilter);
};

// Генерация данных
var makeNewPins = function () {
  var accommodations = generateData();
  removeClass('.map', 'map--faded');
  // Добавляем метки
  addPins(accommodations);
  // Корректируем положение меток относительно их размеров
  correctPinsPos();
  // Добавляем первое по порядку объявление
  addPinCard(accommodations[0]);
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
  removeClass('.map', 'map--faded');
  removeClass('.ad-form', 'ad-form--disabled');
  enableElements('input');
  enableElements('select');
};

var init = function () {
  elMap = document.querySelector('.map');
  var elPinMain = document.querySelector('.map__pin--main');

  var detectDefaultAddress = function () {
    var elAddress = document.querySelector('#address');
    if (elAddress) {
      elAddress.value = (elPinMain.offsetLeft + Math.round(elPinMain.clientWidth / 2)) + ', ' + (elPinMain.offsetTop + Math.round(elPinMain.clientHeight / 2));
    }
  };

  var onMapActivated = function () {
    elPinMain.removeEventListener('mouseup', onMapActivated);
    detectDefaultAddress();
    activateMap();
    makeNewPins();
  };

  var onPinMainMouseUp = function () {
    detectDefaultAddress();
  };

  detectDefaultAddress();
  if (elPinMain) {
    elPinMain.addEventListener('mouseup', onMapActivated);
    elPinMain.addEventListener('mouseup', onPinMainMouseUp);
  }
};

disableMap();
init();


