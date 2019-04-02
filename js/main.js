$(function() {
	//	计算滑动的时间
	var clearTime = null;
	//	获取当前的序列号
	var $index = 0;
	//	当前滑到的页面
	var $qiandex = 0;

	//	当鼠标指针位于元素上方时，会发生 mouseover 事件
	$("#list li").mouseover(function() {
		//		clearInterval() 方法可取消由 setInterval() 设置的 timeout。
		//		鼠标停止，图片暂停
		clearInterval(clearTime);
		//		获取序列号 当前序列号等于这个页面的下标
		$index = $(this).index();

		//		开始滑动
		scrollPlay();
		//		把当前的赋值给下一次的前一个序列号
		$qiandex = $index;
	}).mouseout(function() {
		//		当鼠标移开，继续轮播
		autoPlay();
	});
	//	开始轮播
	autoPlay();

	function autoPlay() {
		//		设置时间
		clearTime = setInterval(function() {
			//			每次序列号+1
			$index++;

			if($index > 7) {
				$index = 0;
				//				$qiandex = 7;
			}

			//			开始滑动
			scrollPlay();

			$qiandex = $index;
		}, 3000);
	}

	function scrollPlay() {
		//		:eq() 选择器选取带有指定 index 值的元素。
		//通过为 	index 的 div 添加适当的类，将其变为白色：
		//		siblings() 获得匹配集合中每个元素的同胞，通过选择器进行筛选是可选的。
		$("#list li").eq($index).addClass("hover").siblings().removeClass("hover");
		//		向左移动
		if($index > $qiandex) {
			//			.stop 是jQuery中用于控制页面动画效果的方法。运行之后立刻结束当前页面上的动画效果。
			//stop在新版jQuery中添加了2个参数：
			//第一个参数的意思是是否清空动画序列，也就是stop的是当前元素的动画效果
			//			还是停止后面附带的所有动画效果，一般为false，跳过当前动画效果，执行下一个动画效果；
			//第二个参数是是否将当前动画效果执行到最后，意思就是停止当前动画的时候动画效果
			//			刚刚执行了一般，这个时候想要的是动画执行之后的效果，那么这个参数就为true。
			//否则动画效果就会停在stop执行的时候。
			$("#imgbox img").eq($qiandex).stop(true, true).animate({
				"left": "-100%"
			});

			$("#imgbox img").eq($index).css("left", "100%").stop(true, true).animate({
				"left": "0%"
			});
		} else if($index < $qiandex) {
			$("#imgbox img").eq($qiandex).stop(true, true).animate({
				"left": "100%"
			});

			$("#imgbox img").eq($index).css("left", "-100%").stop(true, true).animate({
				"left": "0%"
			});
		}
	}

});
$(function() {
	$(".plug-menu").click(function() {
		var li = $(this).parents('ul').find('li');
		if(li.attr("class") == "themeStyle on") {
			li.removeClass("themeStyle on");
			li.addClass("themeStyle out");
		} else {
			li.removeClass("themeStyle out");
			li.addClass("themeStyle on");
		}
	});
});

function playMusic(img) {
	var play = document.getElementById("music");
	if(play.paused) { //暂停
		play.play();
		img.src = "img/stop.png";
	} else { //播放
		play.pause();
		img.src = "img/play.png";
	}
}

function setTab(name, cursel, n) {
	for(i = 1; i <= n; i++) {
		var menu = document.getElementById(name + i);
		var con = document.getElementById("con_" + name + "_" + i);
		menu.className = i == cursel ? "hover" : "";
		con.style.display = i == cursel ? "block" : "none";
	}
}

//var game_box;
//$(document).ready(function(e) {
//	game_box = document.getElementById("menu4_bg_box");
//
//});
var t = 30;
var timer;
var duction = 1000;
var image = ["img/a1.jpg", "img/a2.jpg", "img/a3.jpg", "img/a4.jpg", "img/a5.jpg", "img/a6.jpg", "img/a7.jpg", "img/a8.jpg", "img/a9.jpg"];
var times = [30, 20, 15];
var speed = [1000, 500, 200];
var starts;
var fenshu = 0;

function section(numb) {
	switch(numb) {
		case 1:
			t = times[0];
			duction = speed[0];
			break;
		case 2:
			t = times[1];
			duction = speed[1];
			break;
		case 3:
			t = times[2];
			duction = speed[2];
			break;

	}
}

function startBtn(obj) {
	document.getElementById("start").onclick = null;
	starts = setInterval(function() {
		var x = Math.random() * 8;
		x = Math.round(x);
		var img = (document.getElementById("menu4_bg_box")).children[x];
		img.src = image[Math.round(Math.random() * 9)];
		var y = Math.random() * 8;
		y = Math.round(y);
		var img2 = (document.getElementById("menu4_bg_box")).children[y];
		img2.src = "img/logo.jpg";
	}, duction);

	timer = setInterval(function() {
		t -= 1;
		document.getElementById("time").innerHTML = "时间:" + t;
		if(t < 1) {
			if(fenshu > 20){
				alert("不错哦，你的分数为："+fenshu);
			}else{
				alert("菜鸟，你的分数为："+fenshu);
			}
			overBtn();
		}
	}, 1000);
}

function beat(obj) {
	var objSrc = obj.src;
	if(objSrc.search("a") != -1) {
		obj.src = "img/logo.jpg";
		fenshu++;
		document.getElementById("num").innerHTML = "分数:" + fenshu + "分";
	}
}

function overBtn() {
	clearInterval(starts);
	clearInterval(timer);
	fenshu = 0;
	document.getElementById("num").innerHTML = "分数:" + fenshu + "分";
	document.getElementById("time").innerHTML = "时间:00";
	for(var i = 0; i < 9; i++) {
		var img = (document.getElementById("menu4_bg_box")).children[i];
		img.src = "img/logo.jpg";
	}
	document.getElementById("start").onclick = startBtn;
}