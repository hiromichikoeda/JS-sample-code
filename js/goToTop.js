var PROJECT = PROJECT || {};
PROJECT.COMMON = {};


PROJECT.COMMON.LINK_SCROLL = {
	SCROLL_SPEED: 500,
	FADEIN_SCROLL_TOP: 200,
	FADEIN_SCROLL_BOTTOM: 1000,

	init: function () {
		this.setParameters();
		this.bindEvent();
		// this.changeGoToTopTriggerDisplayState();

	},
	setParameters: function () {
		// 注意：document.querySelectorとdocument.querySelectorAllはかなり遅いです。
		// もし、パフォーマンスが必要ならdocument.getElementByIdやdocument.getElementsByClassName、document.getElementsByTagNameを使ってください。
		this.windowElement = window;
		// this.$body = $('html,body');
		this.bodyElement = document.body;
		this.htmlElement = document.documentElement;
		this.GoToTopTrigger = document.getElementById('jsiGoToTop');
		// this.goToTopTrigger = document.getElementsByClassName('jsc-goToTop');
		this.aElement = document.querySelectorAll('.jscLinkScroll');
		// this.aElement = document.getElementsByClassName('jscLinkScroll');
		// this.href = document.querySelectorAll('a')[0].getAttribute('href');
		console.log(this.aElement);


	},
	bindEvent: function () {
		var _self = this;
		for (var i = 0; i < this.aElement.length; i++) {
			this.aElement[i].addEventListener('click', function (e) {
				e.preventDefault();
				_self.linkScroll(this);
			});
		}

		this.windowElement.addEventListener('scroll', function (e) {
			_self.changeGoToTopTriggerDisplayState();

		});

		this.GoToTopTrigger.addEventListener('click', function (e) {
			e.preventDefault();
			_self.smoothScroll(0);
		});
	},
	linkScroll: function (Elm) {
		var regex = /^#\S*/;
		var targetText = Elm.getAttribute('href');
		if (!regex.test(targetText) || targetText === "#") {
			console.log('return');
			return;
		} else {
			var id = targetText.replace(/#/, "");
			console.log(id);
			var targetLinkElement = document.getElementById(id);
			// element.scrollTop とかだと親からの相対値になっちゃいます
			// getBoundingClientRect() を使えば絶対座標を取得できます
			// http://phiary.me/javascript-get-bounding-client-rect-absolute-position/
			// https://syncer.jp/javascript-reverse-reference/get-offsettop-offsetleft
			var rect = targetLinkElement.getBoundingClientRect();

			// 座標を計算する
			var positionX = rect.left + window.pageXOffset;	// 要素のX座標
			var positionY = rect.top + window.pageYOffset;	// 要素のY座標
			console.log(positionX);
			console.log(positionY);
			// this.smoothScroll(positionX, positionY);
			// id = "#"+id;
			this.smoothScroll(positionY);
		}
	},
	smoothScroll: function (positionY) {
		console.log('smooth');
		anime({
			targets: 'body',
			scrollTop: positionY,
			duration: this.SCROLL_SPEED,
			easing: 'easeInOutExpo'
			// easing: 'easeOutCirc'
		});
	},
	changeGoToTopTriggerDisplayState: function () {
		var nowScrollTop = window.pageYOffset;
		var nowScrollBottom = this.bodyElement.scrollHeight - nowScrollTop;
		console.log('nowScrollTop：' + nowScrollTop);
		console.log('bodyHeight：' + this.bodyElement.scrollHeight);
		console.log('nowScrollBottom：' + nowScrollBottom);
		// FADEIN_SCROLL_TOP(500)よりnowScrollTopが小さかったらfadeOutもしくはdisplay:none
		// FADEIN_SCROLL_TOP(500)よりnowScrollTopが大きかったらfadeIn
		// bodyHeight - FADEIN_SCROLL_BOTTOM(5416-500)よりnowScrollTopが大きかったらfadeIn
		// bodyHeight - FADEIN_SCROLL_BOTTOM(5416-500)よりnowScrollTopが大きかったらfadeOut

		// if (nowScrollTop < this.FADEIN_SCROLL_TOP) {
		// 	console.log("aaa");
		// 	this.fadeIn();
		// } else if (nowScrollTop > this.FADEIN_SCROLL_TOP) {
		// 	if (nowScrollBottom < this.FADEIN_SCROLL_BOTTOM) {
		// 		console.log('ddd');
		// 		this.fadeOut();
		// 		return;
		// 	}
		// 	console.log("bbb");
		// 	this.fadeIn()
		// }
		if (nowScrollTop < this.FADEIN_SCROLL_TOP) {
			console.log("aaa");
			// this.fadeOut(this.GoToTopTrigger,500);
		}else{
			console.log("bbb");
			this.fadeIn(this.GoToTopTrigger,500)
		}
	},
	fadeIn: function (element, time, callback) {
		// var _self = this;
		// var begin = new Date() - 0;
		// var myTime = 600;
		// var id = setInterval(function () {
		// 	var current = new Date() - begin;
		// 	if (current > myTime) {
		// 		clearInterval(id);
		// 		current = myTime;
		// 	}
		// 	obj.opacity = current / myTime;
		// }, 10);

		console.log('fadeIn');

		var fadeTime = (time) ? time : 400,
			keyFrame = 30,
			stepTime = fadeTime / keyFrame,
			minOpacity = 0,
			stepOpacity = 1 / keyFrame,
			opacityValue = 1,
			sId = '';
			sId = '';
		console.log(element);
		if (!element) return;
		console.log('Element');
		element.setAttribute('data-fade-stock-display', element.style.display.replace('none', ''));

		var setOpacity = function (setNumber) {
			if ('opacity' in element.style) {
				element.style.opacity = setNumber;
			} else {
				element.style.filter = 'alpha(opacity=' + (setNumber * 100) + ')';

				if (navigator.userAgent.toLowerCase().match(/msie/) && !window.opera && !element.currentStyle.hasLayout) {
					element.style.zoom = 1;
				}
			}
		};

		if (!callback || typeof callback !== 'function') {
			callback = function () {
			};
		}

		setOpacity(1);

		sId = setInterval(function () {
			opacityValue = Number((opacityValue - stepOpacity).toFixed(12));

			if (opacityValue < minOpacity) {
				opacityValue = minOpacity;
				element.style.display = 'none';
				clearInterval(sId);
			}

			setOpacity(opacityValue);

			if (opacityValue === minOpacity) {
				callback();
			}
		}, stepTime);

		return element;

	},
	fadeOut: function (element, time, callback) {
		// var _self = this;
		// var begin = new Date() - 0;
		// var myTime = 600;
		// var id = setInterval(function () {
		// 	var current = new Date() - begin;
		// 	if (current > myTime) {
		// 		clearInterval(id);
		// 		current = myTime;
		// 		obj.style.display = "none";
		// 	}
		// 	obj.style.opacity = 1 - (current / myTime);
		// }, 10);
		console.log('fadeOut');
		var fadeTime = (time) ? time : 400,
			keyFrame = 30,
			stepTime = fadeTime / keyFrame,
			minOpacity = 0,
			stepOpacity = 1 / keyFrame,
			opacityValue = 1,
			sId = '';

		if (!element) return;

		element.setAttribute('data-fade-stock-display', element.style.display.replace('none', ''));

		var setOpacity = function (setNumber) {
			if ('opacity' in element.style) {
				element.style.opacity = setNumber;
			} else {
				element.style.filter = 'alpha(opacity=' + (setNumber * 100) + ')';

				if (navigator.userAgent.toLowerCase().match(/msie/) && !window.opera && !element.currentStyle.hasLayout) {
					element.style.zoom = 1;
				}
			}
		};

		if (!callback || typeof callback !== 'function') {
			callback = function () {
			};
		}

		setOpacity(1);

		sId = setInterval(function () {
			opacityValue = Number((opacityValue - stepOpacity).toFixed(12));

			if (opacityValue < minOpacity) {
				opacityValue = minOpacity;
				element.style.display = 'none';
				clearInterval(sId);
			}

			setOpacity(opacityValue);

			if (opacityValue === minOpacity) {
				callback();
			}
		}, stepTime);

		return element;
	}
}

//$(document).readyと同じ
document.addEventListener('DOMContentLoaded', function () {
	PROJECT.COMMON.LINK_SCROLL.init();
});

