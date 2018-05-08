function initCollectinData(){
	var query = "SELECT * FROM collection where user_name='spp'";
	db.query(query, function(tx, res) {
		var collections = new Array();
		for(var i = 0; i < res.rows.length; i++) {
			var p = new production(res.rows[i].product_name, res.rows[i].product_author, res.rows[i].product_info);
			collections[i] = p;
		}
		showProduction1(collections);
	});
}

function production(name, author, description) {
	this.name = name;
	this.author = author;
	this.description = description;
}


function showProduction1(productions) {
	for(var i = 0; i < productions.length; i++) {
		var production = productions[i];
		var li = document.createElement("li");
		$('#collection_data').append(li);
		li.className = 'mui-table-view-cel';
		var div = document.createElement('div');
		div.className = 'mui-table';
		li.append(div);
		var div2 = document.createElement('div');
		div2.className='mui-table-cell mui-col-xs-10';
		div.append(div2);
		var h4 = document.createElement('h4');
		h4.className='mui-ellipsis';
		h4.innerHTML = production.name;
		div2.append(h4);
		var p = document.createElement('p');
		p.className='mui-h6 mui-ellipsis';
		p.innerHTML=production.description;
		div2.append(p);
		var div3 =  document.createElement('div');
		div3.className = 'mui-table-cell mui-col-xs-2 mui-text-right';
		div.append(div3);
		var span = document.createElement('span');
		span.className='mui-h6';
		span.innerHTML = production.author;
		div3.appendChild(span);
		
	}
}