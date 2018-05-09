function Dynasty(id, name){
	this.id = id;
	this.name = name;
}
function Author(id, name, dynasty,description){
	this.id = id;
	this.name = name;
	this.dynasty = dynasty;
	this.description;
}

function queryDynasty(){
	var query = 'SELECT * FROM dynasty';
	db.query(query, function(tx, res) {
		var dynastys = new Array();
		for(var i = 0; i < res.rows.length; i++) {
			var d = new Dynasty(res.rows[i].id, res.rows[i].name);
			dynastys[i] = d;
		}
		addDynasty(dynastys);
		queryAuthor(dynastys);
	});
}

function addDynasty(dynastys){
	for(var i=0; i<dynastys.length; i++){
		var dynasty = dynastys[i];
		var dynastyEle = document.createElement("a");
		dynastyEle.innerHTML = dynasty.name;
//		dynastyEle.onclick = function(){
//			$('html,body').animate({scrollTop:$('#d_'+dynasty.id).offset().top}, 800);
//		}
		$('#dynasty_list').append(dynastyEle);
	}
}

function queryAuthor(dynastys){
	for(var i=0; i<dynastys.length; i++){
		var dynasty = dynastys[i];
		var query = "SELECT * FROM author where dynasty_id='"+dynasty.id +"'";
		queryAuthor1(dynasty,query)
		
	}
}

function queryAuthor1(dynasty,query){
	db.query(query, function(tx, res) {
			var authors = new Array();
			for(var i = 0; i < res.rows.length; i++) {
				var a = new Author(res.rows[i].id, res.rows[i].name,res.rows.dynasty_id,res.rows[i].description);
				authors[i] = a;
			}
			addAuthors(dynasty,authors)
	});
}

function addAuthors(dynasty, authors){
	var li = document.createElement("li");
	li.setAttribute("id", "d_"+dynasty.id);
	li.className = "mui-table-view-divider mui-indexed-list-group";
	li.setAttribute('data-group',dynasty.name);
	li.innerHTML = dynasty.name;
	$('#author_list').append(li);
	for(var i=0; i<authors.length; i++){
		var li = document.createElement("li");
		li.className = "mui-table-view-cell mui-indexed-list-item";
		li.setAttribute('data-tags',dynasty.name+'_'+i);
		var author = authors[i];
		li.innerHTML = author.name;
		authorClick(author,li);
		$('#author_list').append(li);
	}
}

function authorClick(author,element){
	element.onclick= function () {
		alert("name:"+author.name);
	}
}
