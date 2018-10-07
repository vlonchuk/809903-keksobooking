'use strict';

(function () {
  var elFile;
  var elPreview;
  var prevImgSrc;

  var onFileLoad = function () {
    var file = elFile.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = window.consts.FILE_TYPES.some(function (el) {
        return fileName.endsWith(el);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          elPreview.src = reader.result;
        });
        reader.readAsDataURL(file);
      }
    }
  };

  window.avatar = {
    init: function (ctx) {
      var elParent = ctx.elForm.querySelector('.ad-form-header__upload');
      elFile = elParent.querySelector('#avatar');
      elFile.addEventListener('change', onFileLoad);
      elPreview = elParent.querySelector('img');
      prevImgSrc = elPreview.src;
    },

    clear: function () {
      elPreview.src = prevImgSrc;
    }
  };
})();
