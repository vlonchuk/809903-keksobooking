'use strict';

(function () {
  window.api = {
    // Возврат случайного числа от 0 до num-1
    getRand: function (num) {
      var size = 1.0 / num;
      return Math.floor(Math.random() / size);
    },

    // Возврат случайного элемента массива
    getRandElement: function (array) {
      return array[this.getRand(array.length)];
    },

    padString: function (str, len, ch) {
      var strLen = str.length;
      for (var i = 0; i < (len - strLen); i++) {
        str = ch + str;
      }
      return str;
    },

    // Возвращает случайный сортированный набор элементов массива
    getRandSubArray: function getRandSubArray(source, nCount, needSort) {
      var len = source.length;
      var array = source.slice();
      nCount = nCount || source.length;
      var result = new Array(nCount);

      for (var i = 0; i < nCount; i++) {
        var r = this.getRand(len);
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
    },

    addElement: function (fragment, selector) {
      var parent = document.querySelector(selector);
      parent.appendChild(fragment);
    },

    removeClass: function (selector, className) {
      var elements = document.querySelectorAll(selector);
      elements.forEach(function (el) {
        el.classList.remove(className);
      });
    },

    addClass: function (selector, className) {
      var elements = document.querySelectorAll(selector);
      elements.forEach(function (el) {
        el.classList.add(className);
      });
    },

    disableElements: function (selector) {
      var elList = document.querySelectorAll(selector);
      elList.forEach(function (el) {
        el.setAttribute('disabled', '');
      });
    },

    enableElements: function (selector) {
      var elList = document.querySelectorAll(selector);
      elList.forEach(function (el) {
        el.removeAttribute('disabled');
      });
    },

    disableMap: function () {
      this.disableElements('input');
      this.disableElements('select');
    }
  };
})();
