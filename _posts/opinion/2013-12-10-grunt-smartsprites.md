---
layout: post
title: 无线建站制作环境简介
description: grunt+smartsprites
category: opinion
---

# 无线建站制作环境简介

grunt+smartsprites



## 无线建站简介

无线建站是方便商家快速创建活动页面，全平台适配（pc+移动端）浏览器支持方面舍去了ie6。



## 初期的讨论和思考
* 讨论：php和js要求模块化，css和html也要按照模块化去处理。


* 思考：
	* 图片：舍去ie6后可以使用png24，retina显示屏的2倍图片支持，这里可以用smartsprites进行2倍图像的自动  合并，自动background-size，自动生成css，在主css中引用。普通图片用smartsprites进行合并即可。ie8及以下不支持background-size，用浏览器判断，引入普通图片即可。
			<!--[if lt IE 9]>
				<link href="../css/yqSpritesIe-sprite.css" rel="stylesheet" media="screen">
			<![endif]-->


	* css：使用less对css进行模块处理，less可以引入@import单个页面的less,并自动合并成一个css。这里参考了[Bootstrap]: http://www.bootcss.com/ 

	大体分四个部分 
	1. reset 
	2. 变量 
	3. 公共函数 
	4. 单个页面


* html5及ie8-的响应式支持：
		<!--[if lt IE 9]>
			<script src="http://mat1.gtimg.com/www/mb/falcon/js/shiv.js"></script>
		<![endif]-->

	跨域问题（此js必须和html在同一域下）
	




## grunt 的应用
工欲善其事，必先利其器


优点

*  实施预览剩去f5，所见即所得
*  include html自动合并，服务器静态化。
*  @import css合并及压缩。
*  less自动监听并编译。
*  图片自动压缩。
*  自动相对地址转换绝对地址。
*  插件多多，没有做不到的只有你想不到的。


###目录结构

	│Gruntfile.js
	│gruntLive.bat
	│package.json
	│smartsprite.bat 
	├─css
	├─html
	├─img
	│  ├─mobile     
	│  ├─sprites    
	│  └─sprites-ie     
	├─imgMin
	├─js  
	├─less
	├─module  
	├─node_modules              
	└─pages


###grunt 介绍
中文官网[grunt]: http://www.gruntjs.net/

为何要用构建工具？

一句话：自动化。对于需要反复重复的任务，例如压缩（minification）、编译、单元测试、linting等，自动化工具可以减轻你的劳动，简化你的工作。当你正确配置好了任务，任务运行器就会自动帮你或你的小组完成大部分无聊的工作。


为什么要使用Grunt？

Grunt生态系统非常庞大，并且一直在增长。由于拥有数量庞大的插件可供选择，因此，你可以利用Grunt自动完成任何事，并且花费最少的代价。如果找不到你所需要的插件，那就自己动手创造一个Grunt插件，然后将其发布到npm上吧。


###grunt安装
1. nodejs安装
node官网[]http://www.nodejs.org/

2. 安装grunt cli
		npm install -g grunt-cli



##less的应用
工欲善其事，必先利其器


优点

*  模块引入自动合并
*  公共库引入省去查找的麻烦（比如：手机的reset，png24滤镜，已知宽高的块水平垂直居中等等）
*  更好的封装的模块
*  多人协作的代码一致性。
		.alphaBlack(@alpha){
		  filter:progid:DXImageTransform.Microsoft.gradient(enabled='true',startColorstr='#@{alpha}000000',endColorstr='#@{alpha}000000');
		  background:rgba(0,0,0,@alpha/100);
		}
		.absolute-center-center(@width,@height){
		  position:absolute;left:50%;top:50%;
		  width:@width;height:@height;
		  margin-left:-@width/2; margin-top:-@height/2;
		}


###less 介绍
中文官网[less]: http://www.bootcss.com/p/lesscss/

sublime text中less的应用[lesssublime安装向导]:http://fdream.net/blog/article/783.aspx



#讨论

* 能不能统一我们的制作环境，less是不是应该使用？
* grunt 能不统一应用 弊 和 利？
* 标准库和公用函数库 是不是有专人去维护？



#谢谢！

腾讯微博@longzubuluo

gitBlog[]:http://dongyingzi.github.com

yingzidong