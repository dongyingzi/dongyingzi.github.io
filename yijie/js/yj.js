$(document).ready(function() {
    //是否为移动端设备
    var isMobile = {  
        Android: function() {  
            return navigator.userAgent.match(/Android/i) ? true : false;  
        },  
        BlackBerry: function() {  
            return navigator.userAgent.match(/BlackBerry/i) ? true : false;  
        },  
        iOS: function() {  
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;  
        },  
        Windows: function() {  
            return navigator.userAgent.match(/IEMobile/i) ? true : false;  
        },  
        any: function() {  
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());  
        }  
    };
    //展开收起
    $('.yjShow').click(function(event) {
        if($(this).html()=="[展开]"){
             $('.yjIntro').css({
                "height": 'auto',
                "overflow": 'auto'
            });
            $(this).text("[收起]");
        }else{
            $('.yjIntro').css({
                "height": '40',
                "overflow": 'hidden'
            });
            $(this).text("[展开]");
        }
    });
            
    //回复部分
    $('.relay').click(function(event) {
        this.href = 'javascript://';
        $(this).parent().next().toggle();
    });
    $('.relayBtn').click(function(event) {
         $(this).parents('.relayCnt').hide();
    });
    //幻灯部分
    if(!isMobile.any()){
        $('#myModal').on('hidden.bs.modal', function () {
            $("html").css({
                "overflow": 'auto',
                "padding-right":"0"
            });
        })
        $('#myModal').on('shown.bs.modal', function () {
            $("html").css({
                "overflow": 'hidden',
                "padding-right":"16px"
            });
            $(".modal").css({
                "overflow": 'hidden'
            });
            $('.carousel').carousel('pause');
             var bodyH = $(window).height() - 20;
            $(".yjSlideR").css({
                "height": bodyH,
                "overflow":"auto"
            });
            var tHeight = $('.carousel-inner').height();
            var tLen = $('.carousel-inner').find('img').length;
            
           for (var i = 0; i < tLen; i++) {
            $('.carousel-inner').find('img').eq(i).css({
                "margin-top": (tHeight - $('.carousel-inner').find('.item').eq(i).height())/2
            });
               
           };
        })
        
    }else{
        $('#myModal').on('shown.bs.modal', function () {
            
            var tHeight = $('.carousel-inner').height();
            var tLen = $('.carousel-inner').find('img').length;
            
           for (var i = 0; i < tLen; i++) {
            $('.carousel-inner').find('img').eq(i).css({
                "margin-top": (tHeight - $('.carousel-inner').find('.item').eq(i).height())/2
            });
               
           };
        })
    }
    //吸顶效果
    if(!isMobile.any() && $(".yjSubTit2Pn").length>0){
        var sTop = $(".yjSubTit2Pn").offset().top;
        $(window).scroll(function(event) {
            var mTop = $(document).scrollTop();
            if(mTop > sTop){
                $(".yjSubTit2Pn").addClass('fixSub');
                var fixWidth = $(".yjSubTit2Pn").parents('.container').width()+20;
                $(".yjSubTit2Pn").find('.row').css({
                    "width": fixWidth,
                    "margin": '0 auto'
                });
            }else{
                $(".yjSubTit2Pn").removeClass('fixSub');
                $(".yjSubTit2Pn").find('.row').css({
                    "width": "auto",
                    "margin": '0 -10px'
                });
            }
        });
    } 
    //评论字数
    
    $(function(){
        function maxLimit(){
            var strlen=0; //初始定义长度为0
            var num = $('#comment').val();
            var maxNum = 140;
            function isChinese(str){  //判断是不是中文
                var reCh=/[u00-uff]/;
                return !reCh.test(str);
            }
            for(var i=0;i<num.length;i++){
                if(isChinese(num.charAt(i))==true){
                    strlen=strlen+2;//中文为2个字符
                }else{
                    strlen=strlen+2;//英文一个字符
                }
            }
            strlen=Math.ceil(strlen/2);//中英文相加除2取整数
            if(maxNum-strlen<0){
                $('#commetFont').html("已超出 <strong style='color:red' class='commetFontNum'>"+Math.abs(maxNum-strlen)+"</strong> 字"); //超出的样式
            }
            else{
                $('#commetFont').html("还可以输入 <strong class='commetFontNum'>"+(maxNum-strlen)+"</strong> 字"); //正常时候
            }
                
        };
        $("#comment").keyup(maxLimit);  
    });  
 
});