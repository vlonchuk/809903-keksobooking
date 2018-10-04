'use strict';

(function () {
  var FLTR_COUNT = 5;
  var PRICE_LOW = 10000;
  var PRICE_MIDDLE = 50000;
  var featureList;
  var housingList;

  window.filter = {
    init: function (ctx, onClick) {
      featureList = ctx.elFilter.querySelectorAll('.map__checkbox');
      featureList.forEach(function (el) {
        el.addEventListener('click', onClick);
      });
      housingList = ctx.elFilter.querySelectorAll('.map__filter');
      housingList.forEach(function (el) {
        el.addEventListener('change', onClick);
      });
    },

    clear: function () {
      featureList.forEach(function (el) {
        el.checked = false;
      });
      housingList.forEach(function (el) {
        el.selectedIndex = 0;
      });
    },

    Filter: function (ctx, onFilter) {
      var doFilter = function (data) {
        var filteredData = data.slice(0, data.length);
        filteredData = filteredData.filter(function (accomodation) {
          var result = true;

          featureList.forEach(function (el) {
            if (el.checked) {
              result = result && accomodation.offer.features.includes(el.value);
            }
          });

          housingList.forEach(function (el) {
            if (el.selectedIndex > 0) {
              switch (el.id) {
                case 'housing-type':
                  result = result && accomodation.offer.type === el.options[el.selectedIndex].value;
                  break;
                case 'housing-price':
                  var priceType = el.options[el.selectedIndex].value;
                  if (priceType === 'low') {
                    result = result && accomodation.offer.price <= PRICE_LOW;
                  } else {
                    if (priceType === 'middle') {
                      result = result && accomodation.offer.price > PRICE_LOW && accomodation.offer.price <= PRICE_MIDDLE;
                    } else {
                      if (priceType === 'high') {
                        result = result && accomodation.offer.price > PRICE_MIDDLE;
                      }
                    }
                  }
                  break;
                case 'housing-rooms':
                  result = result && accomodation.offer.rooms === parseInt(el.options[el.selectedIndex].value, 10);
                  break;
                case 'housing-guests':
                  result = result && accomodation.offer.guests === parseInt(el.options[el.selectedIndex].value, 10);
                  break;
              }
            }
          });

          return result;
        });
        filteredData = filteredData.slice(0, FLTR_COUNT);

        return filteredData;
      };

      return {
        filterData: function (data) {
          var filteredData = doFilter(data);
          onFilter(filteredData);
        }
      };
    }
  };
})();
