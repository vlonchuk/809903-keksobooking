'use strict';

(function () {
  var map = {};

  var getList = function (selector, parent) {
    parent = parent || document;
    var elList = map[parent] ? map[parent][selector] : null;
    if (!elList) {
      elList = parent.querySelectorAll(selector);
      if (!map[parent]) {
        map[parent] = {};
      }
      map[parent][selector] = elList;
    }
    return elList;
  };

  window.api = {
    disableElements: function (selector, parent) {
      getList(selector, parent).forEach(function (el) {
        el.setAttribute('disabled', '');
      });
    },

    enableElements: function (selector, parent) {
      getList(selector, parent).forEach(function (el) {
        el.removeAttribute('disabled');
      });
    },

    disableMap: function (ctx) {
      this.disableElements('input', ctx.elFilter);
      this.disableElements('select', ctx.elFilter);
      this.disableElements('input', ctx.elForm);
      this.disableElements('select', ctx.elForm);
      this.disableElements('.ad-form__element--submit', ctx.elForm);
    }
  };
})();
