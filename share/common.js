function getQueryString(){var c=location.href;var b="";var a=c.indexOf("?");if(a>1){b=c.substr(a+1)}return b}

var Common = {
		ajax:function(url, func) {
			$.ajax({
			    url : url,
			    dataType : 'html',
			    success : function(data) {
			        func(data);
			    },
			    error: function(xhr, type) {
			    }
			});	
		},
		getQueryString:function(){
			var c=location.href;var b="";var a=c.indexOf("?");if(a>1){b=c.substr(a+1)}returnb;
		}
};
	     