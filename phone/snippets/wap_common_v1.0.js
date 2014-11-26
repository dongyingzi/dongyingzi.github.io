/* wap_common_v1.0.js */
var WINDOW = window,
	DOCUMENT = document,
	TRUE = true,
	FALSE = false,
	NULL = null,
	UNDEFINED,
	BASEURL = "./",
	_setTimeout = setTimeout,
	_clearTimeout = clearTimeout,	
	hasTouch = 'ontouchstart' in WINDOW || window.DocumentTouch, // hasTouch = 'ontouchstart' in WINDOW, // 手机上 true
	RESIZE_EV = 'onorientationchange' in WINDOW ? 'orientationchange' : 'resize',
	START_EV = hasTouch ? 'touchstart' : 'mousedown',
	MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
	END_EV = hasTouch ? 'touchend' : 'mouseup',
	isMove = false,
	isMove2 = false,
	NAVIGATOR = navigator,
	isAndroid = (/android|HTC_Sensation/gi).test(navigator.userAgent),
	isIPhone=(/(iPhone|iPod|iPad)/i.test(navigator.appVersion)),
	scroll; //全局iscroll对象

var windowNoScroll = function(ev){
	ev.preventDefault();
	return false;
};
	
(function($){
	$(function(){
		
		//返回顶部 *** start
		var scrollTop = DOCUMENT.documentElement.scrollTop || DOCUMENT.body.scrollTop,
			back2top = $(".back2top");
		if( back2top.size()>0 ){ //存在返回顶部，则走下面
			$(WINDOW).bind("scroll",function(){ 
				scrollTop = DOCUMENT.documentElement.scrollTop || DOCUMENT.body.scrollTop;
				if (scrollTop > 100 ) { 
					back2top.show();
				}else{
					back2top.hide(); 
				} 
			});
			back2top.bind("click",function(ev){
				var ev = ev || window.event;
				var timer = setTimeout(function(){
					window.scrollTo(0,0);
					clearTimeout(timer);
				},300);
				ev.preventDefault();
			});
		}
		//返回顶部 *** end	
	});
})(Zepto);

