function ajax(url,obj,timeout,success,error){
	//0.将对象转换成字符串
		/*
		 * {
						"userName":"王国栋",
						"userPwd":"123456"
						"t" : "xxxxxxxxxxxxxxxxxxxxx"	
					}
					
		 */
	obj.t = new Date().getTime();
	var str =obj2str(obj);
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
	//1.创建异步对象
	var xmlHttp,timer;
//	var res = encodeURIComponent("张三")
//	console.log(res)
	//保证IE5 IE6兼容
	if(window.XMLHttpRequest){
		//code IE7+
		xmlHttp = new XMLHttpRequest();
		
	}else{
		//code for IE5 IE6
		xmlHttp = new ActiveXObject("Microsoft,XMLHTTP")
	}
	//2.设置请求内容
	xmlHttp.open("GET",url+"?"+str,true);
	//3.发送请求
	xmlHttp.send();
	//4.监听状态
	xmlHttp.onreadystatechange =function(){
		
		//5.返回
		if(xmlHttp.readyState==4){
			if(xmlHttp.status>=200 && xmlHttp.status<300 || xmlHttp.status===304){
			//5.返回数据
//			alert(xmlHttp.responseText)
			success(xmlHttp);
					
		}else{
//			console("接收数据失败")
			error(xmlHttp);
		}
			clearInterval(timer);
			console.log("完成数据传输过程");
		}
		
	}
	//判断外界是否传入了超时时间
	if(timeout){
		timer=setInterval(function(){
			console.log("中断请求");
			xmlHttp.abort();
			clearInterval(timer);
		},timeout)
	}
}

//注意细节:
	//1.要对相应超时的时间进行处理
	//2.在发送请求的过程中，URL不能出现中文