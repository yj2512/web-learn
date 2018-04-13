
// 做一个PC端的网页,设计图是1920X1080的. 要在常见屏上显示正常(比例正确可) 1280X720 1366X768 1440X900 1920X1080
// 著作权归作者所有。
// 商业转载请联系作者获得授权,非商业转载请注明出处。
// 链接:http://caibaojian.com/mobile-responsive-example.html
// 来源:http://caibaojian.com

// 互联网上的自适应方案到底有几种呢？就我个人实践所知，有这么几种方案：

// 1、固定一个某些宽度，使用一个模式，加上少许的媒体查询方案
// 2、使用flexbox解决方案
// 3、使用百分比加媒体查询
// 4、使用rem


//window.onload = function(){}
$(function () {
	
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px';

	//这个6.4怎么来的，当然是根据设计稿的横向分辨率/100得来的。下面总结下网易的这种做法：

	//先拿设计稿竖着的横向分辨率除以100得到body元素的宽度：

	// 如果设计稿基于iphone6，横向分辨率为750，body的width为750 / 100 = 7.5rem
	// 如果设计稿基于iphone4/5，横向分辨率为640，body的width为640 / 100 = 6.4rem
	// 播放器高度为210px，写样式的时候css应该这么写：height: 2.1rem。之所以取一个100作为参照，就是为了这里计算rem的方便！

	
	/*font-size可能需要额外的媒介查询，并且font-size不能使用rem，如网易的设置：
	@media screen and (max-width:321px){
	    html{
	    	font-size:15px
		}
	}

	@media screen and (min-width:321px) and (max-width:400px){
	    html{
	    	font-size:16px
		}
	}

	@media screen and (min-width:400px){
	    html{
	    	font-size:18px
		}
	}*/

	/*如果采用网易这种做法，视口要如下设置：
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1, minimum-scale=1, user-scalable=no">
	*/


	//获取屏幕宽高
	function getViewportSize () {
	    return {
	        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
	        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	    };
	}


	//css选择
	function cssLink(){
		if(window.screen.width>1427&&window.screen.width<=1920){  
   			document.write("<link href='${ctx}/resources/css/party-service/party-self-building-css2.css' rel='stylesheet'>");  
		}  
		if(window.screen.width<=1427){  
		   document.write("<link href='${ctx}/resources/css/party-service/party-self-building-css1.css' rel='stylesheet'>");  
		} 
	}


})
