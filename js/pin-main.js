'use strict';

(function () {
  var PIN_MAIN_HEIGHT = 60 + 22;

  var ctx; // Ссылка на контекст с глобальными переменными

  // Вычисляет координату острого конца главной метки, относительно ее свойства Left
  var getPinMainX = function (left) {
    return left + Math.round(ctx.elPinMain.clientWidth / 2);
  };

  // Вычисляет значения свойства Left главной метки, относительно положения ее острого конца
  var getPinMainLeft = function (x) {
    return x - (ctx.elPinMain.clientWidth / 2);
  };

  // Вычисляет координату Y острого конца главной метки, относительно ее свойства Top и высоты
  var getPinMainY = function (top) {
    return top + PIN_MAIN_HEIGHT;
  };

  // Вычисляет значения свойства Top главной метки, относительно положения ее острого конца
  var getPinMainTop = function (y) {
    return y - PIN_MAIN_HEIGHT;
  };

  window.pinMain = {
    detectAddress: function (ctxRef) {
      if (!ctx) {
        ctx = ctxRef;
      }
      ctx.elAddress.value = getPinMainX(ctx.elPinMain.offsetLeft) + ', ' + getPinMainY(ctx.elPinMain.offsetTop);
    },

    initOnceMouseDown: function (ctxRef) {
      if (!ctx) {
        ctx = ctxRef;
      }

      ctx.elPinMain.addEventListener('mousedown', ctx.onPinMainOnceMouseDown);
    },

    initHandlers: function (ctxRef) {
      if (!ctx) {
        ctx = ctxRef;
      }

      var onPinMainMouseDown = function (downEvt) {
        var startPoint = {
          x: downEvt.pageX,
          y: downEvt.pageY
        };

        var onMouseMove = function (moveEvt) {
          // Оригинальная позиция мыши
          var mousePoint = {
            clientX: moveEvt.pageX,
            clientY: moveEvt.pageY
          };

          // Корректируем координаты мыши
          mousePoint.clientX = mousePoint.clientX < ctx.elMap.offsetLeft ? ctx.elMap.offsetLeft : mousePoint.clientX;
          mousePoint.clientX = mousePoint.clientX > ctx.elMap.offsetLeft + ctx.elMap.clientWidth ? ctx.elMap.offsetLeft + ctx.elMap.clientWidth : mousePoint.clientX;
          mousePoint.clientY = mousePoint.clientY < getPinMainX(window.consts.Y_START) - PIN_MAIN_HEIGHT ? getPinMainX(window.consts.Y_START) - PIN_MAIN_HEIGHT : mousePoint.clientY;
          mousePoint.clientY = mousePoint.clientY > getPinMainX(window.consts.Y_END) - PIN_MAIN_HEIGHT ? getPinMainX(window.consts.Y_END) - PIN_MAIN_HEIGHT : mousePoint.clientY;

          // Определяем сдвиг курсора
          var shift = {
            x: mousePoint.clientX - startPoint.x,
            y: mousePoint.clientY - startPoint.y
          };

          // Обновляем стартовую позицию курсора
          startPoint = {
            x: mousePoint.clientX,
            y: mousePoint.clientY
          };

          // Определяем положение элемента
          var newLeft = ctx.elPinMain.offsetLeft + shift.x;
          var newTop = ctx.elPinMain.offsetTop + shift.y;

          // Определяем координаты острого конца
          var pinPos = {
            x: getPinMainX(newLeft),
            y: getPinMainY(newTop)
          };

          // Корректируем положение элемента отностельного острого конца
          newLeft = pinPos.x < 0 ? getPinMainLeft(0) : newLeft;
          newLeft = pinPos.x > ctx.elMap.clientWidth ? getPinMainLeft(ctx.elMap.clientWidth) : newLeft;
          newTop = pinPos.y < window.consts.Y_START ? getPinMainTop(window.consts.Y_START) : newTop;
          newTop = pinPos.y > window.consts.Y_END ? getPinMainTop(window.consts.Y_END) : newTop;

          // Перемещаем элемент на новую позицию
          ctx.elPinMain.style.left = newLeft + 'px';
          ctx.elPinMain.style.top = newTop + 'px';
          window.pinMain.detectAddress();
        };

        var onMouseUp = function () {
          window.pinMain.detectAddress();
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };

      ctx.elPinMain.addEventListener('mousedown', onPinMainMouseDown);
      this.initOnceMouseDown();
    }
  };
})();
