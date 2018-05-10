function initMine() {
	mui.init();
	mui.plusReady(function() {
		initLogin();
		initCard();
		initCollection();
		
	})

}

function initLogin() {

	if(isLogin()) {
		var $img = ("<img class=‘mui-media-object mui-pull-left head-img’ id=‘head-img’>");
		var $i = ("<i class=‘mui-pull-right update’>spp</i>");
		$('#user_info').append($img);
		$('#user_info').append($i);
		$('#user_info').click(function() {
			mui.openWindow({
				url: 'userInfo.html',
				id: 'info'
			});

		})
	} else {
		var cc = ('<div class="mui-media-object mui-pull-left head-img" id="login">登陆</div>');
		$('#user_info').append(cc);
		$('#user_info').click(function() {

			mui.openWindow({
				url: 'login.html',
				id: 'info'
			});
		});
	}
}

function initLoginIn() {
	$('#login_in').click(function() {
		var userName = $('#account').val();
		var passWord = $('#password').val();
		if("spp" == userName && "123" == passWord) {
			plus.storage.setItem("user_name", userName);
			plus.storage.setItem("pass_word", passWord);
			//获得列表界面的webview  
			var list = plus.webview.currentWebview().opener();
			//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
			mui.fire(list, 'aaa');
			//返回true，继续页面关闭逻辑  
			mui.currentWebview.close();
		} else {
			alert("密码错误");
		}

	});
}

function initCard() {
	$('#user_card').click(function() {
		mui.openWindow({
			url: 'home.html',
			id: 'info'
		});
	})
}

function initCollection() {
	if(isLogin()) {
		$("#user_collection").click(function() {
			mui.openWindow({
				url: 'collection.html',
				id: 'info'
			});
		})
	} else {
		$('#user_collection').click(function() {
			mui.openWindow({
				url: 'login.html',
				id: 'info'
			});
		})
	}
}

function isLogin() {
	var storage = window.localStorage;
	var userName = plus.storage.getItem('user_name');
	var passWorld = plus.storage.getItem('pass_word');
	if(userName == "spp" && passWorld == "123") {
		return true;
	} else {
		return false;
	}
}