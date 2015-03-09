var gi = GoodInfo;
var Product_list = {
		iprice:function(a){
			gi.mp(a, function(data) {
				if (!data || data.length==0) return;
				for (var i=0;i<data.length;i++) {
					var price = data[i].p,
						html_pc = (null == price || price <= 0)?'暂无报价':('¥'+price),
						sku = data[i].id;
						$("#"+sku +" em").html(html_pc);
				}
			});
			gi.pm(a, function(data) {
				if (!data || data.length==0) return;
				for (var i=0;i<data.length;i++) {
					var d = data[i].pf,
						sku = data[i].pid;
					for (var n=0;n<d.length;n++) {
						$('div[id=J_'+sku+']').append('<span>'+gi.translatepf(d[n])+'</span>');
					}
				}
			});
		},
		comments:function(a) {
			gi.comments(a, function(data){
				 var val = data.CommentsCount;
				 if (val.length == 0) return;
				for (var i=0;i<val.length;i++) {
					var goodcount = val[i].GoodCount,
						count = val[i].CommentCount,
						sku = val[i].SkuId;					
					var html = "";
					if (count>0) {
						html = (goodcount/count).toFixed(2)*100+'%好评（'+count+'人评价）';
					} else {
						html = '100%好评';
					}
					$('div[id=E_'+sku+']').html(html);
				}
			});
		}
};