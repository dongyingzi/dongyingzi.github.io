---
layout: post
title: jquery 的prototype
description: jquery 的框架分析
category: blog
---

####构造函数：
    function jquery(){}
    jquery.prototype ={
        say:function(){
            console.log(this.name)
        },
        name:"dongyingzi"
    }
    var d = new jquery();
    d.say(); //dongyingzi
    以上必须要new
    不想要new呢 
    function jquery(){
        console.log("死循环")
        return new jquery()
    }
    jquery()
    晕了 死循环
    function jquery(){
        return jquery.prototype.init()
    }
    jquery.prototype = {
        init:function(){
            console.log(this)
            return this;
        },
        say:function(){
            console.log(this.name)
        },
        name:"dongyingzi"
    }
    jquery().say();//dongyingzi
    init 中this 已经指向了jquery jquery的原型上了，能不能把this区分呢
    function jquery(){
        return new jquery.prototype.init()
    }
    jquery.prototype = {
        init:function(){
            console.log(this)
            return this;
        },
        say:function(){
            console.log(this.name)
        },
        name:"dongyingzi"
    }
    jquery().say()
    jquery.init {} VM633:7
    TypeError: undefined is not a function

    this是对了， init 实例化后有不能使用jquery的原型方法了，那就把juqery的原型方法给 init就可以了吗
    function jquery(){
        return new jquery.prototype.init()
    }
    jquery.prototype = {
        init:function(){
            console.log(this)
            return this;
        },
        say:function(){
            console.log(this.name)
        },
        name:"dongyingzi"
    }
    jquery.prototype.init.prototype=jquery.prototype;
    jquery().say()
    jquery.init {init: function, say: function, name: "dongyingzi"}
     VM679:7
    dongyingzi VM679:11

    jquery().say() 看着有点不习惯呢 

     function jquery(){
        return new jquery.prototype.init()
    }
    jquery.prototype = {
        init:function(){
            console.log(this)
            return this;
        },
        say:function(){
            console.log(this.name)
        },
        name:"dongyingzi"
    }
    jquery.prototype.init.prototype=jquery.prototype;
    var J = jquery();
    J.say()


##结语
多谢超哥今天和我说讨论的这个问题，让我静下心来好好思考了一下这个问题。
