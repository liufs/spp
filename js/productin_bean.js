function production(name, author, description) {
	this.name = name;
	this.author = author;
	this.description = description;
}

function showProduction(productions) {
	var productionEle = document.getElementById("production");
	var pp = "";
	for(var i = 0; i < productions.length; i++) {
		var production = productions[i];
		pp += "<li class='mui-table-view-cell' ><div class='mui-table'>" +
			"<div class='mui-table-cell mui-col-xs-10'>" +
			"<h4 class='mui-ellipsis'>" +
			production.name +
			"</h4>" +
			"<p class='mui-h6 mui-ellipsis'>" +
			production.description +
			"</div>" +
			"<div class='mui-table-cell mui-col-xs-2 mui-text-right'>" +
			"	<span class='mui-h6'>" +
			production.author +
			"</span></div></div></li>";
	}
	productionEle.innerHTML = pp;
}

//查询
function queryProduction() {
	var query = 'SELECT * FROM product';
	db.query(query, function(tx, res) {
		var producrions = new Array();
		for(var i = 0; i < res.rows.length; i++) {
			var p = new production(res.rows[i].product_name, res.rows[i].product_author, res.rows[i].product_info);
			producrions[i] = p;
		}
		showProduction(producrions);
	});

}