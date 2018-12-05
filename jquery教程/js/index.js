$(function(){
	//0.监听内容的实时输入
	$('body').delegate(".comment","propertychange input",function(){
			//判断是否输入了内容
			if($(this).val().length>0){
				//让按钮可用
				$('.send').prop("disabled",false)
			}else{
				
				$('.send').prop("disabled",true)
			}
	})
	
	//1.监听发布按钮的点击
	$('.send').click(function(){
		//拿到用户输入的内容
		var $text = $('.comment').val()
		//根据内容创建节点
		var $weibo = createEle($text)
	 	//插入微博
	 	$('.message').prepend($weibo)
	})
	
	
	//创建节点的方法
function createEle(text){
	 	var $weibo =$("<div class=\"info\">\n"+
						"<p class=\"text-info\">"+text+"</p>\n"+
						"<p class=\"infoOperation\">\n"+
						"	<span class=\"infotime\">"+createTime()+" 来自 微博 weibo.com</span>\n"+
						"	<span class=\"infoHandle\">\n"+
						"		<a href=\"javascript:;\" class='infoTop'><i class=\"fa-address-book\"></i>0</a>\n"+
						"		<a href=\"javascript:;\" class='infoDown'>0</a>\n"+
						"		<a href=\"javascript:;\" class='infoDel'>删除</a>\n"+
						"	</span>\n"+
					"	</p>\n"+
				"	</div>");
		return $weibo;
	 	
	 }

	//生成时间的方法
	function createTime(){
		var date = new Date();
		var arr =[ date.getFullYear()+"-",
		date.getMonth() + 1 +"-",
		date.getDate()+" ",
		date.getHours()+":",
		date.getMinutes()+":",
		date.getSeconds ()]
		
//		console.log(date.getFullYear())
//		console.log(date.getMonth())
//		console.log(date.getDate())
//		console.log(date.getHours())
//		console.log(date.getMinutes())
//		console.log(date.getSeconds ())
		 return arr.join("");
//		console.log(arr.join(""))
	}
	
//createTime()

	//2.监听顶点击
	$('body').delegate('.infoTop','click',function(){
//		alert("top")
		$(this).text(parseInt($(this).text())+1)
	})
	//3.监听踩点击
	$('body').delegate('.infoDown','click',function(){
//		alert("down")
		$(this).text(parseInt($(this).text())-1)
	})
	//3.监听删除事件
	$('body').delegate('.infoDel','click',function(){
//		alert("del")
		$(this).parents('.info').remove();
//	console.log($('this').parents('.info'))
	})

})