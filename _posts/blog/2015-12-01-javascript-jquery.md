---
layout: post
title: javascript的prototype和构造函数的使用分析
description: javascript的prototype的使用
category: blog
---

####构造函数：
    function person(){}
    person.prototype ={
        say:function(){
            console.log(this.name)
        },
        name:"dongyingzi"
    }
    var d = new person();
    d.say(); //dongyingzi
    以上必须要new
    不想要new呢 
    function person(){
        console.log("死循环")
        return new person()
    }
    person()
    晕了 死循环 还有没有其他办法呢？
    function person(){
        return person.prototype.init()
    }
    person.prototype = {
        init:function(){
            console.log(this)
            return this;
        },
        say:function(){
            console.log(this.name)
        },
        name:"dongyingzi"
    }
    person().say();//dongyingzi
    init 中this 已经指向了person的原型上了，男人，女人 想区分一下怎么办呢？
    function person(){
        return new person.prototype.init()
    }
    person.prototype = {
        init:function(){
            console.log(this)
            return this;
        },
        say:function(){
            console.log(this.name)
        },
        name:"dongyingzi"
    }
    person().say()
    person.init {} VM633:7
    TypeError: undefined is not a function

    this是对了， init 实例化后有不能使用person的原型方法了，那就把juqery的原型方法给 init就可以了吗
    function person(){
        return new person.prototype.init()
    }
    person.prototype = {
        init:function(){
            console.log(this)
            return this;
        },
        say:function(){
            console.log(this.name)
        },
        name:"dongyingzi"
    }
    person.prototype.init.prototype=person.prototype;
    person().say()
    person.init {init: function, say: function, name: "dongyingzi"}
     VM679:7
    dongyingzi VM679:11

    person().say() 看着有点不习惯呢 

     function person(){
        return new person.prototype.init()
    }
    person.prototype = {
        init:function(){
            console.log(this)
            return this;
        },
        say:function(){
            console.log(this.name)
        },
        name:"dongyingzi"
    }
    person.prototype.init.prototype=person.prototype;
    var J = person();
    J.say()
    收工

##结语
多谢超哥今天和我说讨论的这个问题，让我静下心来好好思考了一下这个问题。
