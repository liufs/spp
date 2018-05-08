function initMine(){
	initLogin();
	initLoginOut();
	initCard();
	initCollection();
}

function initLogin(){

	if(isLogin()){
		var $img = ("<img class=‘mui-media-object mui-pull-left head-img’ id=‘head-img’>");
		var $i = ("<i class=‘mui-pull-right update’>spp</i>");
		$('#user_info').append($img);
		$('#user_info').append($i);
		$("#user_info").attr("href","#account");
	}else{
		var cc = ('<div class="mui-media-object mui-pull-left head-img" id="login">登陆</div>');
		$('#user_info').append(cc);
		$('#user_info').click(function(){
			window.open('login.html','_self');
		});
	}
}

function initLoginOut(){
	$('#login_out').click(function(){
		var storage = window.localStorage;
			storage["user_name"] = null;
			storage["pass_world"] = null;
			window.close();
			window.location.reload();
	});
	
}

function initLoginIn(){
	$('#login_in').click(function(){
		var userName =  $('#account').val();
		var passWord =  $('#password').val();
		if("spp"== userName && "123"==passWord){
			var storage = window.localStorage;
			storage["user_name"] = userName;
			storage["pass_world"] = passWord;
			window.history.go(-1); 
		}else{
			alert("密码错误");
		}
		
	});
}

function initCard(){
	$('#user_card').click(function(){
		window.open('home.html','_self');
	})
}

function initCollection(){
	if(isLogin()){
		$("#user_collection").click(function(){
			window.open('collection.html','_self');
		})
	}else{
		$('#user_collection').click(function(){
			window.open('login.html','_self');
		})
	}
}




function isLogin(){
	var storage = window.localStorage;
	var userName = storage["user_name"];
	var passWorld = storage["pass_world"];
	if(userName =="spp" && passWorld == "123"){
		return true;
	}else{
		return false;
	}
}
