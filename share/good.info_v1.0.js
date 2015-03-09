var GoodInfo = {
		mp:function(ids,f){// m price
		    $.ajax({
		        url : 'http://p.3.cn/prices/mgets?skuids=J_' + ids.join(',J_') + '&origin=2&type=1',
		        dataType : 'jsonp',
		        success : function(data) {
		            if (data && data.length > 0) {
		                f(data);
		            }
		        }
		    });
		},
		p:function(ids,f){ //pc price
		    $.ajax({
		        url : 'http://p.3.cn/prices/mgets?skuIds=J_' + ids.join(',J_') + '&area=&type=1',
		        dataType : 'jsonp',
		        success : function(data) {
		            if (data && data.length > 0) {
		                f(data);
		            }
		        }
		    });
		},
		pm:function(ids,f) {// m Promotion
		    $.ajax({
		        url : 'http://pf.3.cn/flags/mgets?skuids=J_' + ids.join(',J_'),
		        dataType : 'jsonp',
		        success : function(data) {
					if (data && data.length > 0) {
		                f(data);
		            }
		        }
		    });
		},
		translatepf:function(k) {
			if(k == 21){
				return '享';
			}else if(k == 1){
				return '降';
			}else if(k == 5){
				return '赠';
			}else if(k == 4){
				return '豆';
			}else if(k == 3){
				return '券';
			}else if(k == 22){
				return '惠';
			}else {
				return '惠';
			}
		},
		adtitle:function(ids, f) {
			$.ajax({
				type: "GET",
				url: "http://ad.3.cn/ads/mgets?skuids=AD_"+ids.join(',AD_')+"&type=1",
				dataType: "jsonp",
				success: function (data) {
		            if (data && data.length > 0) {
		                f(data);
		            }
				}
			});
		},
		comments:function(ids, f) {
		    $.ajax({
		        url : 'http://club.jd.com/clubservice/summary-m-' + ids.join(',') + '.html',
		        dataType : 'jsonp',
		        type:"POST",
		        jsonp: "callback",
		        success:function(comment) {
		            if (comment && comment.CommentsCount) {
		                f(comment);
		            }
		        }
		    });
	}
};