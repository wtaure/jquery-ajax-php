$(function(){
	//0.自定义滚动条
	 $(window).on("load",function(){
            $(".list").mCustomScrollbar();
        });
	//1.监听歌曲的移入移出事件
	$('.list_music').hover(function(){
		//移入事件
		//显示子菜单
		$(this).find('.list_mune').stop().fadeIn(100)
		//隐藏时长
		$(this).find('.list_time span').stop().fadeOut(100)
		$(this).find('.list_time a').stop().fadeIn(100)
	},function(){
		//移出事件
		//隐藏子菜单
			$(this).find('.list_mune').stop().fadeOut(100)
		//显示时长
		$(this).find('.list_time span').stop().fadeIn(100)
		$(this).find('.list_time a').stop().fadeOut(100)
	})
	//2.监听复选框的点击事件
	$('.list_check').click(function(){
		$(this).toggleClass('list_checked')
		
	})
})
