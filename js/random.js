function getRandom(opt,range) {
    //防止超过数组的长度
    range = range > opt.length?opt.length:range;
    var newArray = opt.concat(), //拷贝原数组进行操作就不会破坏原数组
        valArray = new Array();
    for (var n = 0; n < range; n++) {
        var r = Math.floor(Math.random() * (newArray.length));
        valArray.push(newArray[r]);
        //在原数组删掉，然后在下轮循环中就可以避免重复获取
        newArray.splice(r, 1);
    }
    return valArray;
}
var imags = new Array('images/weixin_20180210160443.jpg',
'images/weixin_20180210160724.jpg',
'images/weixin_20180210160525.jpg',
'images/weixin_20180210160321.jpg');

function refreshSlider(){
	var randomImages = getRandom(imags,2);
	$('.1_page').attr('src', randomImages[0]);
	$('.2_page').attr('src', randomImages[1]);
}

function initRefresh(){
	$('#refresh').click(function(){
		refreshSlider();
	})
}
 
 
