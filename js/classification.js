function classification(name, id) {
	this.id = id;
	this.name = name;
}

function content(name, image) {
	this.name = name;
	this.image = image;
}

function queryClssification() {
	var query = 'SELECT * FROM classification';
	db.query(query, function(tx, res) {
		var classifications = new Array();
		for(var i = 0; i < res.rows.length; i++) {
			var c = new classification(res.rows[i].name, res.rows[i].id);
			classifications[i] = c;
		}
		addClassification(classifications);
	});
}

function addClassification(classifications) {
	var classificationEle = document.getElementById("item3");
	var cc = "";
	for(var i = 0; i < classifications.length; i++) {
		var h5 = document.createElement("h5");
		h5.style.display = "background-color:#efeff4";
		h5.innerHTML = classifications[i].name;
		classificationEle.appendChild(h5);
		var ul = document.createElement("ul");
		ul.className = "mui-table-view mui-grid-view";
		queryContent(classifications[i], ul);
		h5.appendChild(ul);
	}
}

function queryContent(classification, ul) {

	var query = "SELECT * FROM classified_works where classification_id='"+classification.id +"'";
//	alert("classification id:" + classification.id);
	db.query(query, function(tx, res) {
		var contents = new Array();
//		alert("contents size:" + res.rows.length);
		for(var i = 0; i < res.rows.length; i++) {
			var c = new content(res.rows[i].name, res.rows[i].image);
			contents[i] = c;
		}
		addContent(contents, ul);
	});

}

function addContent(contents, ul) {
	var html = "";
	for(var i = 0; i < contents.length; i++) {
		var content = contents[i];
//		alert("addContent:" + content.name);
		var li = document.createElement("li");
		li.className = "mui-table-view-cell mui-media mui-col-xs-3";
		li.innerHTML =
			//		html += "<li class='mui-table-view-cell mui-media mui-col-xs-3'>" +
			"<a href='#'>" +
			"<img class='mui-media-object' src='" +
			content.image +
			"'" +
			"style='width: 100px;height: 100px;'></a>";
		li.onclick = function() {
			alert("name:" + content.name)
		};
		ul.appendChild(li);
	}
//	ul.innerHTML = html;
}

function item3Click() {
	console.log("click");
	var query = 'SELECT * FROM classification';
	db.query(query, function(tx, res) {
		for(var i = 0; i < res.rows.length; i++) {
			var c = new classification(res.rows[i].name, res.rows[i].id);
			queryContent(c);
		}
	});
}