/* search_result_show_v1.0.js by time 20150121 */	
//在此对当前的URL处理star 需要最先获取提为全局======================================
var noCurrUrl = window.location.href,
    rootDirectoryUrl,//&ev之前的部分==前半段
    evHalfUrl,//&ev之后的部分==后半段
    initialEv,//初始ev
    secondHalfUrl,//后半段条件url
    webUrl;//url

//取前半段
if (noCurrUrl.indexOf('&ev') != -1) {
	rootDirectoryUrl = noCurrUrl.substring(0, noCurrUrl.indexOf('&ev'));//&ev之前的部分
	evHalfUrl = noCurrUrl.substring(noCurrUrl.indexOf('&ev')+1);//&ev之后的部分
} else {
	
	if(noCurrUrl.indexOf('&') != -1){
		rootDirectoryUrl = noCurrUrl.substring(0, noCurrUrl.indexOf('&'));
		evHalfUrl = noCurrUrl.substring(noCurrUrl.indexOf('&'));
	} else {
		rootDirectoryUrl = noCurrUrl;
		evHalfUrl = '';
	}
	
}

//取最后的一段
if(evHalfUrl.indexOf('&') != -1){
	//如果ev后还有一段url条件
	secondHalfUrl = evHalfUrl.substring(evHalfUrl.indexOf('&'));
} else {
	secondHalfUrl = '';
}
//取原始ev
if (noCurrUrl.indexOf(('&ev')) != -1) {
	if(evHalfUrl.indexOf('&') != -1) {
		initialEv = noCurrUrl.substring(noCurrUrl.indexOf('&ev'), noCurrUrl.indexOf('&ev')+evHalfUrl.indexOf('&')+1);
	} else {
		initialEv = noCurrUrl.substring(noCurrUrl.indexOf('&ev'));
	}
} else {
	initialEv = '';
}

//拼单个Url时候怎么加&ev和中间的@
var symbolEv,curryEv;
if(initialEv == ''){
	symbolEv='&ev=';
} else {
	symbolEv='@';
}

//获取新的选项url首先把已有的此选项去除
//获取多选URL的方法
//type 1:brand  2:color  3:size  4:price  0:其他属性
function getManyEvUrl(name, value_arr){
	var fname = name+'_',
		preffix_idx = initialEv.indexOf(fname),
		a_ev_arr,
		b_ev_arr,
		c_ev_arr;

		if(preffix_idx > -1) {

			a_ev_arr = initialEv.substring(0, preffix_idx),
			b_ev_arr = initialEv.substring(preffix_idx),
			c_ev_arr = '';
			if(b_ev_arr.indexOf('@') > -1) {
				c_ev_arr = b_ev_arr.substring(b_ev_arr.indexOf('@') + 1);
			}
			if (c_ev_arr == '') {
				a_ev_arr = initialEv.substring(0, preffix_idx - 1);
			}
			
			curryEv_a = a_ev_arr + c_ev_arr;
			curryEv_a = (curryEv_a.length <= 4) ? "" : curryEv_a;
			
			if(value_arr && value_arr.length > 0){
				if(curryEv_a.length <= 4){
					curryEv_a = "&ev=";
					curryEv = (curryEv_a + name + '_' + value_arr.join('||'));
				} else {
					curryEv = (curryEv_a + symbolEv + name + '_' + value_arr.join('||'));
				}
			} else {
				curryEv = curryEv_a;
			}
		} else {
			if(value_arr && value_arr.length > 0){
				curryEv = (initialEv + symbolEv + name + '_' + value_arr.join('||'));
			} else {
				curryEv = initialEv;
			}
		}

		webUrl2 = rootDirectoryUrl + curryEv + secondHalfUrl;
		return webUrl2;
}

//获取单个url的方法比如价格选项的
function getevUrl(name, value){
	var fname = name+'_',
		preffix_idx = initialEv.indexOf(fname),
		a_ev,
		b_ev,
		c_ev;

		if(preffix_idx > -1) {
			a_ev = initialEv.substring(0, preffix_idx),
			b_ev = initialEv.substring(preffix_idx),
			c_ev = '';

			if(b_ev.indexOf('@') > -1) {
				c_ev = b_ev.substring(b_ev.indexOf('@') + 1);
			}
			if (c_ev == '') {
				a_ev = initialEv.substring(0, preffix_idx - 1);
			}
			curryEv_a = a_ev+c_ev;
			curryEv_a = (curryEv_a.length <= 4) ? "" : curryEv_a;

			if(value != ''){
				if(curryEv_a.length <= 4){
					curryEv_a = "&ev=";
					curryEv = (curryEv_a + name + '_' + encodeURI(value));
				} else {
					curryEv = (curryEv_a + symbolEv + name + '_' + encodeURI(value));
				}
			} else {
				curryEv = curryEv_a;
			}
		} else {
			curryEv = (initialEv + symbolEv + name + '_' + encodeURI(value));
		}	

	webSelectUrl = rootDirectoryUrl + curryEv + secondHalfUrl;
	return webSelectUrl;
}


//在此对当前的URL处理end======================================
(function($){
	$(function(){

		//全局变量
		var BODY = $('body'),
			mask = $(".over"), // 蒙版
			screeningBar = $(".screening_bar"), // 品牌选择模块
			screeningBarHd = $(".screening_bar_hd"), // 品牌选择按钮头部模块
			screenBox = $('.screen_box'),  // 选择模块集合
			brandScreen = $(".brand_screen"), // 品牌选择模块
			colorScreen = $(".color_screen"), // 颜色选择模块
			priceScreen = $(".price_screen"), // 价格选择模块
			sizeScreen = $(".size_screen"), // 尺寸选择模块
			screenBoxBdLiA = $('.screen_box .bd li a'),
			//valueCount = 0, 单类选择条件个数 不能超过5个
			isJiaGe = false, //增加一个价格出现时的开关 true 价格选项显示
			screeningBarP = '', //品牌选择是否有这一项 p内的内容
			brandCount,
			colorCount,
			sizeCount,
			screenHandBg = $('.screen_hand_bg'),
			keyword = $('.search_bar_box input').val();

		//展示效果类代码放到逻辑展示后边================================
		//点击哪一个选择条件之后的效果
		screeningBarHd.delegate('a', 'click', function(){
			var _this = $(this),
				_thisName = _this.attr('data-name');


			_this.addClass('curr').siblings('a').removeClass('curr');
			screenBox.css({
				"display": "none",
				"opacity": '0',
				"zIndex": '0'
			});
			screeningBar.css({
				"zIndex": '0'
			});
			BODY.addClass('no_scroll');
			screenHandBg.show();

			switch(_thisName){
				case "pinpai": 
					brandScreen.css({
						"display": "block",
						"opacity": '1',
						"zIndex": '1'
					})
					screeningBar.css({
						"zIndex": '10'
					});
					isJiaGe = false;
					//当已经有上次已选择的品牌时
					if(brandCount != 0){
						return false;
					} else {
						$('a', screenBox).parent().removeClass('av_selected');
					}
					break;
				case "yanse": 
					colorScreen.css({
						"display": "block",
						"opacity": '1',
						"zIndex": '1'
					})
					screeningBar.css({
						"zIndex": '10'
					});
					isJiaGe = false;
					//当已经有上次已选择的颜色时
					if(colorCount != 0){
						return false;
					} else {
						$('a', screenBox).parent().removeClass('av_selected');
					}
					break;
				case "jiage": 
					priceScreen.css({
						"display": "block",
						"opacity": '1',
						"zIndex": '1'
					});
					screeningBar.css({
						"zIndex": '10'
					});
					isJiaGe = true;
					break;
				case "chima": 
					sizeScreen.css({
						"display": "block",
						"opacity": '1',
						"zIndex": '1'
					})
					screeningBar.css({
						"zIndex": '10'
					});
					isJiaGe = false;
					//当已经有上次已选择的颜色时
					if(sizeCount != 0){
						return false;
					} else {
						$('a', screenBox).parent().removeClass('av_selected');
					}
					break;
			}
		})	
		//选择条件只存在品牌、颜色、尺码
		screenBox.delegate('a', 'click', function(){
			var _this_screen_box_bd_li = $(this).parent();

			if(isJiaGe != true){
				if(!_this_screen_box_bd_li.hasClass('av_selected')){
					_this_screen_box_bd_li.addClass('av_selected');
				} else if(_this_screen_box_bd_li.hasClass('av_selected')) {
					_this_screen_box_bd_li.removeClass('av_selected');
				}
			}
			
		})
		//清除选择条件只存在品牌、颜色、尺码
		screenBox.delegate('.clear_selection', 'click', function(){
			var _this_clear_select = $(this);
			_this_clear_select.parents('.screen_box').find('li').removeClass('av_selected');
			BODY.addClass('no_scroll');
		})

		//点击品牌选择区域背景时选择模块消失
		screenHandBg.on('click', function(){
			$(this).hide();
			$('a', screeningBarHd).removeClass('curr');
			screenBox.animate({
				"display": "none",
				"opacity": '0',
				"zIndex": '0'
			});
			screeningBar.css({
				"zIndex": '0'
			});
			BODY.removeClass('no_scroll');
		});

		//逻辑代码类代码 star 获取数据并展示 匹配选择之后的url================================
		var brandHtml = '',
			screeningBarP_pingpai = '';
		//取商品的名称
		if (returnedData.brand && returnedData.brand != '') {
			var brandValue = returnedData.brand.value,
				brandValue_arr = brandValue.split(";"),
				brandValue_arr_end = brandValue_arr.length > 20 ? brandValue_arr.slice(0, 20) : brandValue_arr.slice(0, brandValue_arr.length - 1),
				brandHtmlUl = '';
				
			screeningBarP_pingpai = '<a href="javascript:;" role="main_menu" data-name="pinpai">品牌</a>';

			for (var i = 0; i < brandValue_arr_end.length;i++) {
				var brandItem = '<li>\
									<a href="javascript:;" title="'+ brandValue_arr_end[i] +'">\
										<label>'+brandValue_arr_end[i]+'</label>\
									  	<input type="checkbox" class="checkbox">\
									</a>\
								</li>'
				brandHtmlUl += brandItem;
			}
			
			brandHtml += '<div class="hd clearfix">\
								<h5>品牌</h5>\
								<button class="clear_selection">清除选择</button>\
								<button class="determine_selection">确定</button>\
							</div>\
							<div class="bd">\
								<ul>'+brandHtmlUl+
								'</ul>\
							</div>';
			$(".brand_screen").append(brandHtml);

		}

		var colorHtml = '',
			screeningBarP_yanse = '';
		//取商品的颜色
		if (returnedData.exp_color && returnedData.exp_color != '') {
			var colorValue = returnedData.exp_color.value,
				colorValue_arr = colorValue.split(";"),
				colorValue_arr_end = colorValue_arr.slice(0, colorValue_arr.length -1),
				colorHtmlUl = '';
				

			screeningBarP_yanse = '<a href="javascript:;" role="main_menu" data-name="yanse">颜色</a>';

			//console.log(colorValue_arr_end)
			for (var i = 0; i < colorValue_arr_end.length;i++) {
				var colorItem = '<li>\
									<a href="javascript:;" title="'+ colorValue_arr_end[i] +'">\
										<span><s></s></span>\
									  	<input type="checkbox" class="checkbox">\
									</a>\
								</li>';
				colorHtmlUl += colorItem;
			}
			
			colorHtml += '<div class="hd clearfix">\
								<h5>颜色</h5>\
								<button class="clear_selection">清除选择</button>\
								<button class="determine_selection">确定</button>\
							</div>\
							<div class="bd">\
								<ul>\
								'+ colorHtmlUl +	
								'</ul>\
							</div>';
			$(".color_screen").append(colorHtml);


			//添加颜色值
			var getColor = {
				'黑色': '#333',
				'灰色': '#bbb',
				'白色': '#fff',
				'粉色': '#FFD8D8',
				'红色': 'red',
				'玫瑰红': '#FF028B',
				'紫色': '#B237F1',
				'花色': 'url(http://static.360buyimg.com/ad/m/imgs/huase_ico.png) no-repeat',
				'蓝色': '#2A8CFA',
				'绿色': '#17BC32',
				'黄色': '#fc0',
				'橙色': '#FF8A00',
				'棕色': '#814312',
				'驼色': '#C69C81',
				'裸色': '#F3DCC9'
				
			}
			var color_a_arr = $('.color_screen a');
			for(var i = 0; i < color_a_arr.length; i++){
				for (var j in getColor){
					if ($(color_a_arr[i]).attr('title') == j) {
						//console.log(i,j)
						$(color_a_arr[i]).find('s').css({
							'background': getColor[j]
						})
					}
				}
			}
			
		}

		//获取价格开始
		var priceHtml = '',
			screeningBarP_jiage = ''; 
		if (returnedData.price && returnedData.price != '') {
				var priceValue = returnedData.price,
					priceHtmlUl = '',
					

				screeningBarP_jiage = '<a href="javascript:;" role="main_menu" data-name="jiage">价格</a>';

				for (var i = 0; i < priceValue.length;i++) {
					if(!priceValue[i].max){
						continue;
					}
					var priceitem = '<li><a href="'+ getevUrl('price', (priceValue[i].min + '-' + priceValue[i].max)) +'" rel="nofollow">' + priceValue[i].min + '-' + priceValue[i].max + '</a></li>';
					priceHtmlUl += priceitem;
				}
				priceHtml += '<div class="hd clearfix">\
									<input type="text" name="start_price" class="start_price" maxlength="6" />\
									<span class="av-sep">-</span>\
									<input type="text" name="end_price" class="end_price" maxlength="6" />\
									<b class="one">￥</b>\
									<b class="two">￥</b>\
									<button class="determine_selection">确定</button>\
								</div>\
								<div class="bd">\
									<ul><li><a href="'+ getevUrl('price','') +'" rel="nofollow">全部</a></li>\
									'+ priceHtmlUl +
									'</ul>\
								</div>';
				$(".price_screen").append(priceHtml);	
		}
		//获取价格结束//////////
		//把价格点击时的值

		//获取尺寸开始
		var sizeHtml = '',
			screeningBarP_chima = '';
		if (returnedData.exp_size && returnedData.exp_size != '') {
			var sizeValue = returnedData.exp_size.value,
				sizeValue_arr = sizeValue.split(";"),
				sizeValue_arr_end = sizeValue_arr.slice(0, sizeValue_arr.length - 1),
				sizeHtmlUl = '',
				
				
			screeningBarP_chima = '<a href="javascript:;" role="main_menu" data-name="chima">尺码</a>';

			for (var i = 0; i < sizeValue_arr_end.length;i++) {
				var sizeItem = '<li>\
									<a href="javascript:;" rel="nofollow" title="'+ sizeValue_arr_end[i] +'">\
										<label>'+sizeValue_arr_end[i]+'</label>\
									  	<input type="checkbox" class="checkbox" />\
									</a>\
								</li>';
				sizeHtmlUl += sizeItem;
			}
			
			sizeHtml += '<div class="hd clearfix">\
								<h5>尺码</h5>\
								<button class="clear_selection">清除选择</button>\
								<button class="determine_selection">确定</button>\
							</div>\
							<div class="bd">\
								<ul>\
								'+ sizeHtmlUl +
								'</ul>\
							</div>';
			$(".size_screen").append(sizeHtml);
		}
		//获取尺寸结束

		//品牌选择是否有这一项 p内的内容
		screeningBarP = screeningBarP_pingpai + screeningBarP_yanse + screeningBarP_jiage + screeningBarP_chima;
		$('.screening_bar p').html(screeningBarP);

		//当所有的品牌选项都没有的情况下就把选择区域隐藏
		if(screeningBarP == ''){
			$('.screening_bar').hide();
		} else {
			$('.screening_bar').show();
		}


		//确定按钮点击之后筛选触发
		screenBox.delegate('.determine_selection', 'click', function(){
			if(isJiaGe != true) {
				var valueArr = new Array(),
				    getUrlName = $(this).parent('.hd ').find('h5').html(), 
					getUrlHerf;

				if (getUrlName == '品牌') {
					$.each($(this).parents('.screen_box').find('.av_selected a'), function(){
						valueArr.push($(this).find('label').html());
					})
					getUrlHerf = getManyEvUrl('brand',valueArr);
				} else if(getUrlName == '颜色') {
					$.each($(this).parents('.screen_box').find('.av_selected a'), function(){
						valueArr.push($(this).attr('title'));
					})
					getUrlHerf = getManyEvUrl('color',valueArr);
				} else if(getUrlName == '尺码') {
					$.each($(this).parents('.screen_box').find('.av_selected a'), function(){
						valueArr.push($(this).find('label').html());
					})
					getUrlHerf = getManyEvUrl('size',valueArr);
				}
				
				//console.log(getUrlHerf)
				window.location.href = getUrlHerf;
			}

			screenBox.css({
				"display": "none",
				"opacity": '0',
				"zIndex": '0'
			});
			screeningBar.css({
				"zIndex": '0'
			});
			BODY.removeClass('no_scroll');
			screenHandBg.hide();
			valueCount = 0;
		})
		

		//对价格单独处理===========
		//价格输入框验证只能输入数字
		var priceRangeVal;
		$('.price_screen input[type="text"]').keyup(function(){
			priceRangeVal = $(this).val();
			if(isNaN(priceRangeVal)){
				$(this).val(priceRangeVal.substring(0,priceRangeVal.length - 1));
			}
		})

		//价格输入框单独的url
		$('.price_screen').delegate('.determine_selection', 'click', function(){
			var firstPrice = $('.start_price').val(), 
			    twicePrice = $('.end_price').val();

			if(priceRangeVal && firstPrice && twicePrice){
				if(twicePrice < firstPrice){
					var input_price_val = twicePrice + '-' + firstPrice;
				} else {
					var input_price_val = firstPrice + '-' + twicePrice;
				}
			} else if (priceRangeVal && firstPrice =='' && twicePrice) {
				var input_price_val = '0-' + twicePrice;
			} else if (priceRangeVal && firstPrice && twicePrice == '') {
				var input_price_val = firstPrice;
			} else {
				return false;
			}

			window.location.href = getevUrl('price',input_price_val);
			//console.log(getevUrl('price', input_price_val))
		})

		//对已选择的条件匹配展示============================
		var selectConditions='';
		var num_count;
		if(returnedData.titles && returnedData.titles != ''){
			
			$.each(returnedData.titles, function(i, item){
				var titlesName = returnedData.titles[i].Name,
					titlesCondition = returnedData.titles[i].Condition;
				
				//对已选择的条件飘红
				/*if(titlesName && titlesName){
					switch(titlesName){
						case "brand": 
							$('.screening_bar p a[data-name="pinpai"]').addClass('curr')
							break;
						case "price": 
							$('.screening_bar p a[data-name="jiage"]').addClass('curr')
							break;
						case "exp_size": 
							$('.screening_bar p a[data-name="chima"]').addClass('curr')
							break;
						case "exp_color": 
							$('.screening_bar p a[data-name="yanse"]').addClass('curr')
							break;
					}
					
				}*/
				//对已存在的价格处理展示在两个输入框里
				var priceShow = [];
				if(titlesName == 'dredisprice' && titlesCondition != ''){
					if(titlesCondition.indexOf('-') != -1){
						priceShow = titlesCondition.split('-');
						$('.start_price').val(priceShow[0]);
						$('.end_price').val(priceShow[1]);
					} else {
						$('.start_price').val(titlesCondition);
					}
				}



				function matchingSelected(titlesName, arrname, stra){
					stra = stra.split('、');
					num_count = 0;
					var arrname_html;

					for(var m = 0; m < arrname.length; m++) {

						if(titlesName != 'exp_color'){
							arrname_html = $(arrname[m]).html();
						} else {
							arrname_html = $(arrname[m]).attr('title');
						}
						
						for(var n = 0; n < stra.length; n++) {
							if(arrname_html == stra[n]) {
								$(arrname[m]).parents('li').addClass('av_selected');
								num_count++;
							}
						}
					}
					//console.log(num_count)
					
				}
				
				//当为品牌
				if (titlesName == 'brand') {
					var brandValueArrEnd = $('.brand_screen .bd li label');
					matchingSelected(titlesName, brandValueArrEnd, titlesCondition);
					brandCount = num_count;
				}
				//当为尺寸
				if (titlesName == 'exp_size') {
					var sizeValueArrEnd = $('.size_screen .bd li label');
					matchingSelected(titlesName, sizeValueArrEnd, titlesCondition);
					sizeCount = num_count;
				}

				//当为颜色
				if (titlesName == 'exp_color') {
					var colorValueArrEnd = $('.color_screen .bd li a');
					matchingSelected(titlesName, colorValueArrEnd, titlesCondition);
					colorCount = num_count;
				}

				//当为价格时
				if (titlesName == 'dredisprice') {
					return;	
				}

				//当为其他
				if (titlesName == 'locationid') {
					return false;
				}
				
				//当为其他选择项时
				if (titlesName == 'expand_name') {
					return false;
				}

			});
			
		}	

		//get search keyword
		/*function getSearchKeyword() {
			var url = "http://qpsearch.jd.com/relationalSearch?keyword=" + keyword;
			$.ajax({url:url, dataType:'jsonp', success:function(data) {
				data = $.trim(data);

				if(data) {
					var arr = data.split("*");
					var khtml = '';

					$.each(arr, function(i, word) {

						//取到相关搜索后随机的让几个选项变红
						function getRandomNum(min, max){ 
							return min + Math.floor(Math.random() * (max - min + 1)); 
						}

						var	arrLength = arr.length,
							styles = ["curr", "", "", "curr", "", "curr", "", "", "", "curr", "",""];

						arrRandom = getRandomNum(0, arrLength-1);
						currentStyle = styles[arrRandom]; 

						if(word) {
							khtml += ('<a href="http://re.m.jd.com/search?keyword=' + encodeURI(word) + '" role="text" class="'+ currentStyle +'">' + word + '</a>');
						}
					});
					
					if(khtml) $(".related_searches .suggest_hotkey").append($(khtml));
				} else {
					$(".related_searches .suggest_hotkey").hide();
				}
			}});
		}
		getSearchKeyword();*/

		//点击相关搜索时候把该值传入到搜索框中
		/*$('.popular_search .suggest_hotkey a').bind('click', function(){
			var suggestHotkeyAHtml = $(this).html(),
				suggestHotkeyAUrl = $(this).attr('_href');
			$('.search_bar_box input').val(suggestHotkeyAHtml);
			$(this).attr('href', suggestHotkeyAUrl);
		});*/

	});
})(Zepto);

