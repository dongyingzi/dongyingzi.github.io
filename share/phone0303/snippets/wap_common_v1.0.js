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

$(DOCUMENT).bind(START_EV,function(ev){
	isMove2 = true;
});
$(DOCUMENT).bind(MOVE_EV,function(ev){
	$(DOCUMENT).find(".touched").removeClass("touched");
	isMove = true;
	isMove2 = true;
	// $.each(attrEvent,function(i, n){$(n).removeClass("touched"); });
	// attrEvent.length = 0;
});
$(DOCUMENT).bind(END_EV,function(ev){
	$(DOCUMENT).find(".touched").removeClass("touched");
	ismove = false;
	isMove2 = false;
});
	
(function($){
	$(function(){
		//标题导航最后一个去边儿，标题导航吸顶效果
		$('.quick_search_box ul li s').last().hide();

		//返回顶部 *** start
		var scrollTop = DOCUMENT.documentElement.scrollTop || DOCUMENT.body.scrollTop,
			back2top = $(".back2top"),
			quickSearchBox = $('.quick_search_box'),
			quickSearchBoxCopy = $('.quick_search_box_copy'),
			quickSearchBoxTop = quickSearchBox.offset().top;
		
			$(WINDOW).bind("scroll",function(){ 
				scrollTop = DOCUMENT.documentElement.scrollTop || DOCUMENT.body.scrollTop;
				if( back2top.size()>0 ){ //存在返回顶部，则走下面
					if (scrollTop > 100 ) { 
						back2top.show();
					}else{
						back2top.hide(); 
					} 
					back2top.bind("click",function(ev){
						var ev = ev || window.event;
						var timer = setTimeout(function(){
							window.scrollTo(0,0);
							clearTimeout(timer);
						},300);
						ev.preventDefault();
					});
				}
				/*if(quickSearchBox.size()>0 ){ //存在返回顶部，则走下面
					if (scrollTop > quickSearchBoxTop) { 
						quickSearchBox.css({
							'position': 'fixed',
							'top': '-17px',
							'zIndex': '10'
						});
						quickSearchBoxCopy.show();
					} else {
						quickSearchBox.css({
							'position': 'static',
							'top': '0',
							'zIndex': '1'
						})
						quickSearchBoxCopy.hide();
					}
				}*/
			});
		
		//返回顶部 *** end	

		//初始化 touch事件——背景变灰色 *** start
		function commonInitEvent(){
			var attrEvent = [],
				isMaskClose = TRUE;  //蒙板 开关

			$(DOCUMENT).delegate("[role=text],[role=main_menu]", START_EV, function(ev){
				var thiz = $(this),
				parent = thiz.parent(),
				role = thiz.attr('role');

				switch(role){
					case "text": //文本 - touch事件
						attrEvent.push(thiz);
						thiz.addClass("touched");
						break;
					case "main_menu": //品牌选择
						attrEvent.push(thiz);
						thiz.addClass("touched");
						break;
				}
				ev.stopPropagation();
				isMove=false;
			});
			$(DOCUMENT).delegate("[role=text],[role=wap_version_text]", END_EV, function(ev) {
				if(isMove){
					isMove=false;
				}else{
					var thiz = $(this),
						role = thiz.attr('role');
					switch(role){
						case "text":
							thiz.removeClass("touched");
							break;
						case "text":
							thiz.removeClass("touched");
							break;
					}
				}
				attrEvent.length = 0;
			})
		}
		commonInitEvent();
		// touch事件——背景变灰色 *** end

	});
})(Zepto);

