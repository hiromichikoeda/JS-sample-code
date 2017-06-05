var PROJECT = PROJECT || {};
PROJECT.COMMON = {};


PROJECT.COMMON.GO_TO_TOP = {
	OFFSET_Y: 0,
	SCROLL_SPEED: 500,
	FADEIN_SCROLL_TOP: 500,
	
	init: function () {
		this.setParameters();
		this.bindEvent();
	},
	setParameters: function () {
		this.$window = $(window);
		this.$body = $('html,body');
		this.$goToTopTrigger = $('.jsc-goToTop');
	},
	bindEvent: function () {
		var myself = this;
		$('a[href^="#"]').on('click', function () {
			myself.moveToLink(this);
			return false;
		});
		
		this.$window.on('scroll', function(){
			myself.btnDisplayStateManagement();
		});
		
		this.$goToTopTrigger.on('click', function(){
			myself.goToTop();
		});	
	},
	moveToLink: function (anchor) {
		var target = $(anchor.hash);
		if (!target.length) return;
		var targetY = target.offset().top + this.OFFSET_Y;
		this.$body.animate({
			scrollTop: targetY
		}, this.SCROLL_SPEED, 'swing');
		window.history.pushState(null, null, this.hash);
	},
	goToTop : function () {
        this.$body.animate({scrollTop: 0}, this.SCROLL_SPEED);
        return false;
	},
	btnDisplayStateManagement : function () {
		var nowScrollTop = $( window ).scrollTop() ;
		
		// 最上部から現在位置までの距離(now)が1500px以上だったら
		if( nowScrollTop > this.FADEIN_SCROLL_TOP ){
			this.$goToTopTrigger.fadeIn('slow');
		}else{
			this.$goToTopTrigger.fadeOut( 'slow' ) ;
		}
	}
    
}

$(function () {
	PROJECT.COMMON.GO_TO_TOP.init();
});
