'use strict';

(function () {
  var elParent;
  var elFile;
  var elPreview;

  var onFileLoad = function () {
    var files = Array.prototype.filter.call(elFile.files, function (file) {
      var fileName = file.name.toLowerCase();
      return window.consts.FILE_TYPES.some(function (el) {
        return fileName.endsWith(el);
      });
    });

    if (files.length > 0) {
      if (elPreview) {
        elParent.removeChild(elPreview);
        elPreview = null;
      }

      files.forEach(function (file) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          var elDiv = document.createElement('div');
          elDiv.classList.add('ad-form__photo');
          var elImg = document.createElement('img');
          elImg.src = reader.result;
          elImg.style.width = '100%';
          elImg.style.height = '100%';
          elDiv.appendChild(elImg);
          elParent.appendChild(elDiv);
        });
        reader.readAsDataURL(file);
      });
    }
  };

  window.photo = {
    init: function (ctx) {
      elParent = ctx.elForm.querySelector('.ad-form__photo-container');
      elFile = elParent.querySelector('#images');
      elPreview = elParent.querySelector('.ad-form__photo');

      elFile.addEventListener('change', onFileLoad);
    },

    clear: function () {
      var photoList = elParent.querySelectorAll('.ad-form__photo');
      photoList.forEach(function (el) {
        elParent.removeChild(el);
      });
      elPreview = document.createElement('div');
      elPreview.classList.add('ad-form__photo');
      elParent.appendChild(elPreview);
    }
  };
})();
