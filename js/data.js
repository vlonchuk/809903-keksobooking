'use strict';

(function () {
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

  window.data = {
    generateData: function () {
      var data = [];
      var avatars = new Array(ANNOUNCEMENT_COUNT);
      for (var i = 0; i < ANNOUNCEMENT_COUNT; i++) {
        avatars[i] = i + 1;
      }

      var randRealties = window.api.getRandSubArray(REALTIES);
      var randAvatars = window.api.getRandSubArray(avatars);

      randRealties.forEach(function (realty, iRealty) {
        data[iRealty] = {author: {}, offer: {}, location: {}};
        var d = data[iRealty];

        d.author.avatar = AVATAR_START + window.api.padString(randAvatars[iRealty].toString(), AVATAR_INDEX_LENGTH, AVATAR_INDEX_PADCH) + AVATAR_END;
        d.offer.title = realty.name;
        d.offer.type = realty.type;
        var price = window.api.getRand(MAX_PRICE - MIN_PRICE + 1) + MIN_PRICE;
        price = Math.floor(price / 1000) * 1000;
        d.offer.price = price;
        d.offer.rooms = window.api.getRand(MAX_ROOM_COUNT) + 1;
        d.offer.guests = window.api.getRand(MAX_GUEST - MIN_GUEST + 1) + MIN_GUEST;
        d.offer.checkin = window.api.getRandElement(CHECK_INOUT);
        d.offer.checkout = window.api.getRandElement(CHECK_INOUT);

        d.offer.features = window.api.getRandSubArray(FEATURES, window.api.getRand(FEATURES.length - 1) + 1, true);
        d.offer.description = '';
        d.offer.photos = window.api.getRandSubArray(PHOTOS);
        d.location = {
          x: window.api.getRand(window.consts.Y_END - window.consts.Y_START) + window.consts.Y_START,
          y: window.api.getRand(window.consts.Y_END - window.consts.Y_START) + window.consts.Y_START
        };
        d.offer.address = d.location.x.toString() + ', ' + d.location.y.toString();
      });

      return data;
    }
  };
})();
