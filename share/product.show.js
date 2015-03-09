var gi = GoodInfo;
var Product = {
		iprice:function(a){
			gi.mp(a, function(data) {
				if (!data || data.length==0) return;
				var price = data[0].p,
					html_pc = (null == price || price <= 0)?'暂无报价':('¥'+price);
				$(".shop_info_box_rt .detail_price .price").html(html_pc);
				gi.p(a, function(data1){
					if (!data1 || data1.length==0) return;
					if ((data1[0].p-price).toFixed(2) > 0) {
						$(".shop_info_box_rt .cheap_ico").html("比PC端便宜 " + (data1[0].p-price).toFixed(2) + "元");
					}
				});
			});
			gi.pm(a, function(data) {
				if (!data || data.length==0) return;
				var d = data[0].pf;
				for (var i=0;i<d.length;i++) {
					$(".shop_info_box_rt .voucher_ico").append('<span>'+gi.translatepf(d[i])+'</span>');
				}
			});
		},
		title:function(a) {
			gi.adtitle(a,function(data){
				if (!data || data.length==0) return;
				$('.detail_info_name_red').html('<span>'+data[0].ad+'</span>');
			});
		},
		comments:function(a) {
			gi.comments(a, function(data){
				 var val = data.CommentsCount;
				 if (val.length == 0) return;
				 var html = "";
				 if (val[0].CommentCount>0) {
					 html = '<span>好评度：'+(val[0].GoodCount/val[0].CommentCount).toFixed(2)*100+'%</span><span>已评价：'+val[0].CommentCount+'</span>';
				 } else {
					 html = '<span>好评度：100%</span>';
				 }
				 $('.eval_box').html(html);
			});
		}
};