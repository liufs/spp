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
			window.open('userInfo.html', '_self');

		})
	} else {
		var cc = ('<div class="mui-media-object mui-pull-left head-img" id="login">登陆</div>');
		$('#user_info').append(cc);
		$('#user_info').click(function() {
			window.open('login.html', '_self');
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
			window.history.go(-1);
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