var PROJECT = PROJECT || {};
PROJECT.COMMON = PROJECT.COMMON || {};


PROJECT.COMMON.LINK_SCROLL = {
	SCROLL_SPEED: 500,
	FADEIN_SCROLL_TOP: 200,
	FADEIN_SCROLL_BOTTOM: 1000,

	init: function () {
		this.setParameters();
		this.bindEvent();
	},
	setParameters: function () {
		this.windowElement = window;
		this.bodyElement = document.body;
		this.htmlElement = document.documentElement;
		this.GoToTopTrigger = document.getElementById('jsiGoToTop');
		this.aElement = document.querySelectorAll('.jscLinkScroll');
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
			var rect = targetLinkElement.getBoundingClientRect();
			var positionX = rect.left + window.pageXOffset;
			var positionY = rect.top + window.pageYOffset;
			console.log(positionX);
			console.log(positionY);
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
		});
	},
	changeGoToTopTriggerDisplayState: function () {
		var nowScrollTop = window.pageYOffset;
		var nowScrollBottom = this.bodyElement.scrollHeight - nowScrollTop;
		console.log('nowScrollTop：' + nowScrollTop);
		console.log('bodyHeight：' + this.bodyElement.scrollHeight);
		console.log('nowScrollBottom：' + nowScrollBottom);
		if (nowScrollTop < this.FADEIN_SCROLL_TOP) {
			console.log("aaa");
		}else{
			console.log("bbb");
			this.fadeIn(this.GoToTopTrigger,500)
		}
	},
	fadeIn: function (element, time, callback) {
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

document.addEventListener('DOMContentLoaded', function () {
	PROJECT.COMMON.LINK_SCROLL.init();
});