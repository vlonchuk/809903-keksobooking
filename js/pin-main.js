'use strict';

(function () {
  var HEIGHT = 60 + 22;

  var ctx; // Ссылка на контекст с глобальными переменными

  // Вычисляет координату острого конца главной метки, относительно ее свойства Left
  var getX = function (left) {
    return left + Math.round(ctx.elPinMain.clientWidth / 2);
  };

  // Вычисляет значения свойства Left главной метки, относительно положения ее острого конца
  var getLeft = function (x) {
    return x - (ctx.elPinMain.clientWidth / 2);
  };

  // Вычисляет координату Y острого конца главной метки, относительно ее свойства Top и высоты
  var getY = function (top) {
    return top + HEIGHT;
  };

  // Вычисляет значения свойства Top главной метки, относительно положения ее острого конца
  var getTop = function (y) {
    return y - HEIGHT;
  };

  window.pinMain = {
    detectAddress: function (ctxRef) {
      if (!ctx) {
        ctx = ctxRef;
      }
      ctx.elAddress.value = getX(ctx.elPinMain.offsetLeft) + ', ' + getY(ctx.elPinMain.offsetTop);
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

      var onMouseDown = function (downEvt) {
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
          mousePoint.clientY = mousePoint.clientY < getX(window.consts.Y_START) - HEIGHT ? getX(window.consts.Y_START) - HEIGHT : mousePoint.clientY;
          mousePoint.clientY = mousePoint.clientY > getX(window.consts.Y_END) - HEIGHT ? getX(window.consts.Y_END) - HEIGHT : mousePoint.clientY;

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
            x: getX(newLeft),
            y: getY(newTop)
          };

          // Корректируем положение элемента отностельного острого конца
          newLeft = pinPos.x < 0 ? getLeft(0) : newLeft;
          newLeft = pinPos.x > ctx.elMap.clientWidth ? getLeft(ctx.elMap.clientWidth) : newLeft;
          newTop = pinPos.y < window.consts.Y_START ? getTop(window.consts.Y_START) : newTop;
          newTop = pinPos.y > window.consts.Y_END ? getTop(window.consts.Y_END) : newTop;

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

      ctx.elPinMain.addEventListener('mousedown', onMouseDown);
      this.initOnceMouseDown();
    }
  };
})();
