'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* 레이어 팝업
* @author uncha
*
* @constructor
* @param {size value or String} left - 팝업 left position(생략 가능)
* @param {size value or String} top - 팝업 top position(생략 가능)
* @param {String} selector - 팝업 선택자
* @param {jQuery} element - 팝업 엘리먼트
* @param {String} buttonElement - 팝업을 띄울 버튼 선택자(생략 가능)
* @param {String} position - 팝업의 position값 absolute, fixed등(생략 가능)
* @param {color value} backgroundColor - 팝업 dimd색(생략 가능)
* @param {Boolean} defaultShow - 초기 팝업 보이기(생략 가능)
* @param {Function} show - 팝업이 열릴때 콜백(생략 가능)
* @param {Function} hide - 팝업이 닫힐때 콜백 (생략 가능)
*/
var Popup = exports.Popup = function () {
	function Popup(_ref) {
		var _ref$left = _ref.left,
		    left = _ref$left === undefined ? 'center' : _ref$left,
		    _ref$top = _ref.top,
		    top = _ref$top === undefined ? 'center' : _ref$top,
		    _ref$selector = _ref.selector,
		    selector = _ref$selector === undefined ? '' : _ref$selector,
		    _ref$element = _ref.element,
		    element = _ref$element === undefined ? '' : _ref$element,
		    _ref$buttonElement = _ref.buttonElement,
		    buttonElement = _ref$buttonElement === undefined ? '' : _ref$buttonElement,
		    _ref$buttonSelector = _ref.buttonSelector,
		    buttonSelector = _ref$buttonSelector === undefined ? '' : _ref$buttonSelector,
		    _ref$position = _ref.position,
		    position = _ref$position === undefined ? 'fixed' : _ref$position,
		    _ref$backgroundColor = _ref.backgroundColor,
		    backgroundColor = _ref$backgroundColor === undefined ? '' : _ref$backgroundColor,
		    _ref$defaultShow = _ref.defaultShow,
		    defaultShow = _ref$defaultShow === undefined ? false : _ref$defaultShow,
		    _ref$show = _ref.show,
		    show = _ref$show === undefined ? function () {} : _ref$show,
		    _ref$hide = _ref.hide,
		    hide = _ref$hide === undefined ? function () {} : _ref$hide;

		_classCallCheck(this, Popup);

		if (!selector && !element) throw new Error('인자 selector또는 element중 하나는 반드시 전달되어야 합니다.');

		_(this).$element = element || $(selector);

		// position style
		_(this).$element.css({ 'position': position });

		// left position
		if (left == 'center') {
			_(this).$element.css({ 'left': '50%', 'margin-left': _(this).$element.outerWidth(true) / -2 });
		} else {
			_(this).$element.css({ 'left': left, 'margin-left': '' });
		}

		// top position
		if (top == 'center') {
			_(this).$element.css({ 'top': '50%', 'margin-top': _(this).$element.outerHeight(true) / -2 });
		} else {
			_(this).$element.css({ 'top': top, 'margin-top': '' });
		}

		var _this = this;
		// close event
		_(this).$element.find('.btn-popup-close').on('click.Popup', function (e) {
			e.preventDefault();

			_this.hide();
		});

		// popup open button
		_(this).$buttonElement = buttonElement || $(buttonSelector);
		_(this).$buttonElement.on('click.Popup', function (e) {
			e.preventDefault();

			_this.show();
		});

		// create background
		if (backgroundColor) {
			_(this).$bg = $('<div class="popup-bg"></div>');
			_(this).$bg.css({
				position: 'fixed',
				width: '100%',
				height: '100%',
				left: 0,
				top: 0,
				zIndex: 900,
				display: 'none',
				background: backgroundColor
			});
			_(this).$element.after(_(this).$bg);
		}

		// callback
		_(this).show = show;
		_(this).hide = hide;

		if (defaultShow) this.show();
	}

	/*
 * 팝업 열기
 */


	_createClass(Popup, [{
		key: 'show',
		value: function show() {
			_(this).$element.fadeIn(400);
			if (_(this).$bg) _(this).$bg.fadeIn(400);

			_(this).show.apply(this, []);
		}

		/*
  * 팝업 닫기
  */

	}, {
		key: 'hide',
		value: function hide() {
			_(this).$element.fadeOut(400);
			if (_(this).$bg) _(this).$bg.fadeOut(400);

			_(this).hide.apply(this, []);
		}

		/*
  * 팝업 삭제
  */

	}, {
		key: 'destroy',
		value: function destroy() {
			_(this).$element.find('.btn-popup-close').off('click.Popup');
			_(this).$element.remove();

			if (_(this).$bg) _(this).$bg.remove();

			_(this).$buttonElement.off('click.Popup');
		}
	}]);

	return Popup;
}();
//# sourceMappingURL=../../maps/modules/ui/Popup.js.map
