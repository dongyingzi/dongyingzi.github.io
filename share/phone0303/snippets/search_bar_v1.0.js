/* search_bar_v1.0.js by time 20150120 */	
//搜索框form提交
function rrr(){
	var searchTxt = $(".search_bar_box input"), // 搜索输入框
		searchTxtV = searchTxt.val();  // 搜索里的文本
	//当输入框为空的时候默认取一个推荐搜索
	if(searchTxtV == '') {

		var $liArr = $("#popular_search_a a");
		var ad_link_null = $($liArr[parseInt(Math.random()*$liArr.length)]).html();

		searchTxt.val(ad_link_null);
		searchTxtV = searchTxt.val();

	}
	window.location.href = "http://re.m.jd.com/search?keyword="+searchTxtV+'&enc=utf-8';
	return false;
}

(function($){
	$(function(){
		//全局变量
		var BODY = $('body'),
			mask = $(".over"), // 蒙版
			touchBar = $('.touch_bar'),
			popularSearch = $(".popular_search"), // 热门搜索模块
			searchWhole = $(".search_whole"),   // 整个搜索模块
			searchNrBox = $(".search_bar_box"), // 搜索框区域
			searchTxt = $(".search_bar_box input"), // 搜索输入框
			searchBtn = $('.search_bar label'), // 搜索输入触发按钮
			searchCloseBtn = $('.search_bar b'), // 搜索框悬浮取消
			searchTxtV = searchTxt.val(),  // 搜索里的文本
			re=/\s/g,
			input_focus_btn = false, // 输入框 获取焦点时候 开关：获取焦点时：true
			ispopularSearch = true, // 热门搜索显示：true
			ev = ev || window.event,
			scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
			serachReplaceBox = $('.serach_replace_box'), // 搜索框悬浮替代高度模块
			searchBarSwitch = $('.search_bar_switch'), // 列表模式展示按钮
			oSrp = $('.srp'); // 商品列表展示区域


		//首先去除输入字符头尾空格
		var searchTxtVal = searchTxtV.replace(/^\s+|\s+$/g, '');
		var $liArr = $("#popular_search_a a");
		var ad_link_null = $($liArr[parseInt(Math.random()*$liArr.length)]).html();

		//当没有搜索词并且输入框为空的时候默认取一个推荐搜索
		if(searchTxtV == '' ||　searchTxtV.match(re)){
			

			searchTxt.val(ad_link_null);	

			searchBtn.bind("click", function(ev){
				var ev = ev || window.event;

				window.location.href = "http://re.m.jd.com/search?keyword="+searchTxtV+'&enc=utf-8';
				ev.stopPropagation();
				ev.preventDefault();
			});
		}
		//点击按钮跳转链接
		searchBtn.bind("click",function(){
			var searchTxt = $('.search_bar_box input'),
				searchTxtV = searchTxt.val(),
				re=/\s/g,
				searchTxtVal = searchTxtV.replace(/^\s+|\s+$/g, '');
			location.href = "http://re.m.jd.com/search?keyword="+encodeURIComponent(searchTxtVal) + '&enc=utf-8';
		});

		//对当前有没有keyword判断
		if(noCurrUrl.indexOf('keyword=') != -1){
			noCurrUrlA = noCurrUrl.substring(noCurrUrl.indexOf('?') + 1);
			noCurrUrlB = noCurrUrlA.split('&');
			for(var m = 0; m < noCurrUrlB.length; m++){
				
				if(noCurrUrlB[m].indexOf('keyword=') != -1) {
			
					noCurrUrlC = noCurrUrlB[m].split('=');
					noCurrUrlC = decodeURI(noCurrUrlC[1]);
					searchTxt.val(noCurrUrlC);
				}
			}
		}

		searchTxt.bind("focus",function(ev){ //输入框 获取焦点
			var ev = ev || window.event;
			searchWhole.addClass("suspension_search");
			$('.search_result_search_bar_inside').css({
				'position': 'relative',
				'top': '0',
				'zIndex': '10000000000'
			})	
			window.scrollTo(0,0);
			setTimeout(function(){
				window.addEventListener('touchmove', windowNoScroll, false);
				serachReplaceBox.show();
				input_focus_btn = true;
				isClose2 = true;
				//BODY.addClass("no_scroll");
				searchBtn.hide();
				searchCloseBtn.show();
				mask.show();
				if(ispopularSearch){
					popularSearch.show();
				};
				searchBarSwitch.hide();
				
				if($(this).val() == ad_link_null){  
					$(this).css("color","#333");
				    $(this).val("");
			 	};
			 	//$('#shelper_middle').show();
			 	if($(this).val() == ''){  
					$('#shelper_middle').hide();
			 	};

			 	if($('#shelper_middle').children().length > 0){
					$('#shelper_middle').show();
				} else {
					$('#shelper_middle').hide();
				}

				ev.stopPropagation();
				ev.preventDefault();
			},500);
		})

		searchTxt.bind('blur', function(){
			var ev = ev || window.event;
			if ($(this).val() == '') {
				$(this).css("color","#999");
				$(this).val(ad_link_null);
				$('#shelper_middle').hide();
			};
			if($('#shelper_middle').children().length == 0){  
				$('#shelper_middle').hide();
		 	};
		 	ev.stopPropagation();
			ev.preventDefault();
		});

		//点击右侧的取消时候把悬浮搜索框取消
		searchCloseBtn.bind('click', function(){
			window.removeEventListener('touchmove', windowNoScroll, false);
			serachReplaceBox.hide();
			$(this).hide();
			searchBtn.show();
			input_focus_btn = false;
			BODY.removeClass("no_scroll");
			searchWhole.removeClass("suspension_search");
			mask.hide();
			searchBarSwitch.show();
			popularSearch.hide();
			$('#shelper_middle').hide();
			ev.stopPropagation();
			ev.preventDefault();
		})


		searchTxt.bind('input propertychange', function(ev){
			ev = ev || window.event; 
			if(ev.keyCode != 40 && ev.keyCode != 38){
				var searchTxt = $(".search_bar_box input"),
					searchTxtV = searchTxt.val(),
					re=/\s/g,
					searchTxtVal = searchTxtV.replace(/^\s+|\s+$/g, '');

				isClose2 = true;

				var url = 'http://dd.search.jd.com/?key=' + searchTxtVal;
				$('#shelper_middle').show();
				if($(this).val() == ''){  
					$('#shelper_middle').hide();
					ispopularSearch = true;
					popularSearch.show();
			 	} else {
			 		$('#shelper_middle').show();
			 		ispopularSearch = false;
			 		popularSearch.hide();
			 	}

				$.ajax({
					type: "GET",
					url: url,
					dataType: "jsonp",
					success: function (data_search) {

						if(ispopularSearch = false){
							popularSearch.hide();
						}
						ispopularSearch = false;
						isClose2 = true;

						var ad_search_html = '',
							ad_search_tit = '',
							ad_search_top = '',
							ad_search_bot = '',
							data_search1 = [],
							data_search2 = [];

						for(var i in data_search){
							var ad_cname = data_search[i].cname;
							//console.log('第'+i+'个数：'+ad_cname);
							if(typeof(ad_cname) != 'undefined'){
								data_search1.push(data_search[i]);
							}

							if(typeof(ad_cname) == 'undefined'){
								data_search2.push(data_search[i]);
							}
						}
						//console.log(data_search1,data_search2);

			            $.each(data_search1,function(index,item){
							ad_search_tit = '<div class="fore1" title="'+ item.keyword +'">\
			                            <span class="search-item">'+ item.keyword +'</span>\
			                            <span class="search-count">约'+ item.amount +'件</span>\
			                        </div>';
						});
						$.each(data_search2,function(index,item){
							ad_search_bot += '<li title="'+ item.keyword +'" role="text">\
			                        <span class="search-item">'+ item.keyword +'</span>\
			                        <span class="search-count">约'+ item.amount +'件</span>\
			                    </li>';
						});

						if(ad_search_tit == ''){
							ad_search_html +=  ad_search_bot;
						} else {
							ad_search_html += '<li class="fore1" role="text">' + ad_search_tit + '</li>'+ ad_search_bot;
						}
						
						$('#shelper_middle').html(ad_search_html);

						//搜索框第一行跳转链接
						$(".fore1").delegate(".fore1","click",function(){
				    		var ad_link_tit = $(this).attr("title");

				    		var timer_list_tit = setTimeout(function(){
								window.location.href = "http://re.m.jd.com/search?keyword="+ad_link_tit+'&enc=utf-8';
								clearTimeout(timer_list_tit);
							},300);
						});
						//搜索框单类跳转链接
					    $("#shelper_middle").delegate("li","click",function(){
					    	if($(this).attr("class") != "fore1"){
					    		var ad_link = $(this).attr("title");
						    	
						    	var timer_list_li = setTimeout(function(){
									window.location.href = "http://re.m.jd.com/search?keyword="+ad_link+'&enc=utf-8';
									clearTimeout(timer_list_li);
								},300);	
					    	}
						});
					},
					error: function (msg) {
						//alert(msg.html());
					}
				});
			}
		});
		
		//搜索中间页才会触发的
		if(page_point == 'search_result') {
			var windowWidth = $(WINDOW).width();
			//判断手势方向当向上的时候搜索框出现，向下消失

			touch.bind(touchBar, 'swipeup', function(ev){
				ev = ev || window.event;
				$('.search_result_search_bar_inside').hide('fast');
				$('.search_result_search_bar_inside').css({
					'position': 'relative',
					'top': '',
					'width': '',
					'zIndex': '1'
				})
				serachReplaceBox.show();
			});
			touch.bind(touchBar, 'swipedown', function(ev){
				ev = ev || window.event;
				$('.search_result_search_bar_inside').show('fast');
				$('.search_result_search_bar_inside').css({
					'position': 'fixed',
					'top': '0',
					'width': windowWidth - 125,
					'zIndex': '100000'
				})	
				serachReplaceBox.show();
			});

			//首先当滑动超过44px整个搜索框隐藏
			$(window).bind("scroll",function(){ 
				var ev = ev || window.event;
				scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				screeningBarTop = $('.screening_bar').offset().top;
				//console.log(scrollTop, screeningBarTop)
				if (scrollTop < screeningBarTop ) { 
					$('.search_result_search_bar_inside').css({
						'display': 'block',
						'position': 'relative',
						'top': '',
						'width': '',
						'zIndex': '1'
					})
					serachReplaceBox.hide();
				}
				//ev.stopPropagation();
				//ev.preventDefault();
			});
			
			//当点击搜索框区域页面滚动回最顶部
			$('.search_result_search_bar_inside').bind('click', function(){
				window.scrollTo(0,0);
				ev.stopPropagation();
				ev.preventDefault();
			})


			//点击搜索模块的切换列表列表展示方式改变
			searchBarSwitch.on('click', function(){
				if(searchBarSwitch.hasClass('switch_list')) {
					$(this).removeClass('switch_list').addClass('switch_grid');
					oSrp.removeClass('album_display').addClass('list_display');
				} else {
					$(this).removeClass('switch_grid').addClass('switch_list');
					oSrp.removeClass('list_display').addClass('album_display');
				}
			})
			
		}
	});
})(Zepto);

