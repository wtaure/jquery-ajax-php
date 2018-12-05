function ajax(option){
//	0.将对象转换成字符串
	option.time.t = new Date().getTime();
	var str =obj2str(option.data);
	console.log(str);
	function obj2str(obj){
		var res = [];
		for (var key in obj) {
			//在URL中是不可以出现中文的,如果出现了中文需要转码
			//可以调用encodeURIComponent方法转码
			//URL中只可以出现字母/数字/下划线/ASCII码
			res.push(encodeURIComponent(key)+"="+encodeURIComponent(obj[key]));//[userName = wgd,userPwd=123456]
		}
		return res.join("&");//userName = wgd&userPwd=123456
		
	}
//	保证IE5 IE6兼容
	if(window.XMLHttpRequest){
		//code IE7+
		xmlHttp = new XMLHttpRequest();
		
	}else{
		//code for IE5 IE6
		xmlHttp = new ActiveXObject("Microsoft,XMLHTTP")
	}
	//1.创建异步对象
	var xmlHttp =new XMLHttpRequest();
	//2.设置传输内容和传输地址
	
	if(option.type.toLowerCase() === "get"){
		xmlHttp.open(option.type,option.url+"?"+str,true)
		xmlHttp.send();
	}else if(option.type.toLowerCase() === "post"){
		//POST传参
		xmlHttp.open(option.type,option.url,true);
		//以下代码必须放到open和send之间
		xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	//3.发送请求
		xmlHttp.send(str);
	}
		//POST传参
		//以下代码必须放到open和send之间
//		xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	//3.发送请求
//	xmlHttp.send("userName=wgd&userPwd=123456");
	//4.监听状态
	xmlHttp.onreadystatechange = function(){
						
	if(xmlHttp.readyState==4){
	//判断传输是否完成
	if(xmlHttp.status>=200&&xmlHttp.status<300||xmlHttp.status===304){
//	console.log("传输成功")
	option.success(xmlHttp);
	}else{
//					console.log("传输失败");
	option.error(xmlHttp);
	}
	console.log("post传输过程完成");
	}

	}
				
	
}
