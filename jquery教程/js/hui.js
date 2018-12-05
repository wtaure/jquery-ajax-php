$(function(){

	//监听开始游戏按钮的监听
	$('.start').click(function(){
//		dispaly-none();
		$(this).stop().fadeOut(100);
		//调用进度条的方法
		progressHandle();
		//调用灰太狼动画的效果
		startWolfAnimation();
		
	})
	
	
	$('.reStart').click(function(){
		$('.mask').stop().fadeOut(100);
		$('.score').text(0);
		progressHandle();
		
		//调用灰太狼动画的效果
		startWolfAnimation()
		
	})	
	
	//定义一个专门处理进度条的方法
	function progressHandle(){
		//重新设置进度条宽度
		$('.progress').css({
				width: 180
			})
		//开启定时器处理进度条
		var timer =setInterval(function(){
			//拿到进度条当前的长度
			var progerssLength = $('.progress').width();
//			console.log(progerssLength)
			//减少当前的宽度
			progerssLength -= 1;
			//重新给进度条赋值宽度
			$('.progress').css({
				width:progerssLength
			});
			
			//监听进度条是否走完
			if(progerssLength<=0){
				//已经走完了,关闭定时器
				clearInterval(timer)
				//显示重新开始界面
				$('.mask').stop().fadeIn(100)	//game over 重新开始
				//停止灰太狼动画
				stopWolfAnimation()
			}
		},50)
		
		
		
	}
	
	//定义一个专门处理灰太狼动画的方法
	function startWolfAnimation() {
		//1.定义两个数组保存所有的灰太狼和小灰灰的图片
		var wolf_1 =['./img/aui/h0.png','./img/aui/h1.png','./img/aui/h2.png',
		'./img/aui/h3.png','./img/aui/h4.png','./img/aui/h5.png','./img/aui/h6.png',
		'./img/aui/h7.png','./img/aui/h8.png','./img/aui/h9.png']
		
		var wolf_2 =['./img/aui/x0.png','./img/aui/x1.png','./img/aui/x2.png',
		'./img/aui/x3.png','./img/aui/x4.png','./img/aui/x5.png','./img/aui/x6.png',
		'./img/aui/x7.png','./img/aui/x8.png','./img/aui/x9.png']
		
		//2.定义一个数组保存所有可能出现的位置
		var arrPos=[
		{left:"100px",top:"115px"},
		{left:"20px",top:"160px"},
		{left:"190px",top:"142px"},
		{left:"105px",top:"193px"},
		{left:"19px",top:"221px"},
		{left:"202px",top:"212px"},
		{left:"120px",top:"275px"},
		{left:"30px",top:"295px"},
		{left:"209px",top:"297px"},
		]
		
		//3.创建一个图片
		var $wolfImage = $("<img src='' class='wolfImg'>")
		//随机获取图片的位置
		var posIndex = Math.round(Math.random()*8)//随机生成1-8的整数 round 向上取整（四舍五入）
		
		//4.创建图片的位置
		$wolfImage.css({
			position : 'absolute',
			top : arrPos[posIndex].top,
			left: arrPos[posIndex].left
			
		})
		//随机获取数组的类型
		var wolfType = Math.round(Math.random())==0? wolf_1 :wolf_2
		//5.设置图片的内容
		window.wolfIndex =0
		window.wolfIndexEnd = 5
		 wolfTimer = setInterval(function(){
			if(wolfIndex>wolfIndexEnd){
				$wolfImage.remove()
				clearInterval(wolfTimer)
				startWolfAnimation()//关键点 第一次动画结束的时候要让第二个动画重新开始
			}
			$wolfImage.attr('src',wolfType[wolfIndex])
			wolfIndex++;
		},200)
		
		//6.将图片添加到界面上
		$('.container').append($wolfImage)
		
		
		//7.调用处理游戏规则的方法
		gameRules($wolfImage);
	} 
	function gameRules($wolfImage){
		$wolfImage.one('click',function(){
//			alert('aa')
//			console.log($(this).attr('src'))
			window.wolfIndex = 5;
			window.wolfIndexEnd = 9;

			var $src = $(this).attr('src')
			var flag =$src.indexOf('h') >=0;
			console.log(flag)
			//根据图片的点击类型增减分数
			if (flag==true) {
				//+10
				$('.score').text(parseInt($('.score').text())+10)
			}else{
				$('.score').text(parseInt($('.score').text())-10)
			}
			//-10
//				
		})
	}
	
	
	
	function stopWolfAnimation(){
		$('.wolfImg').remove()
		clearInterval(wolfTimer)
		
	}
	
	var wolfTimer
	//游戏规则点击事件
	$('.rules').click(function(){
		$('.rule').stop().fadeIn(100);
//		return false
	})
	
	$('.rule>a').click(function(){
		$('.rule').fadeOut(100);
	})
	
	
	
})
