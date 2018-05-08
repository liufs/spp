 function cDB(confs) {
 	var ret = {
 		_db: null,
 		_response: null,
 		_error: null,
 		check: function(tbl) {
 			if(!this._db)
 				return false;
 			var _sql = '',
 				_sqlField = '',
 				_field = [];

 			for(var i = 0; i < tbl.length; i++) {
 				_sql = "CREATE TABLE IF NOT EXISTS " + tbl[i].table + " (";
 				_field = tbl[i].properties;
 				_sqlField = '';

 				for(var j = 0; j < _field.length; j++) {
 					_sqlField += ',`' + _field[j].name + '` ' + _field[j].type;
 				}

 				_sql += _sqlField.substr(1) + ");";

 				this.query(_sql, null, null, null);
 			}

 			return true;
 		},
 		getResult: function() {
 			return this._response;
 		},
 		getError: function() {
 			return this._error;
 		},
 		callback_error: function(tx, _er) {
 			var err = '';
 			if(typeof(tx) == 'object') {
 				for(var q in tx) {
 					err += q + ' = "' + tx[q] + '"; ';
 				}
 			} else {
 				err += tx + '; ';
 			}
 			if(typeof(_er) == 'object') {
 				for(var q in _er) {
 					err += q + ' = "' + _er[q] + '"; ';
 				}
 			} else if(typeof(_er) == 'undefined') {
 				err += _er + '; ';
 			}
 			// 			console.log(err);
 			//if(callback) callback();
 			return false;
 		},
 		query: function(sql, callback, params, er) {
 			if(!this._db)
 				return false;
 			var self = this;

 			function _er(tx, __er) {
 				__er = jQuery.extend(__er, {
 					sql: sql
 				});
 				if(er)
 					er(tx, __er);
 				else
 					self.callback_error(tx, __er);
 			};
 			this._db.transaction(function(tx) {
 				tx.executeSql(sql, (params ? params : []), callback, _er);
 			}, _er);
 		},
 		update: function(tbl, sets, clauses, callback) {
 			var __sql = 'UPDATE ' + tbl,
 				_field = null,
 				__set = '',
 				__clause = '',
 				__values = [];

 			for(var i = 0; i < sets.length; i++) {
 				0
 				_field = sets[i];
 				for(var j = 0; j < _field.length; j++) {
 					__set += ',`' + _field[j].name + '`=?';
 					__values.push(_field[j].value);
 				}
 			}

 			for(var i = 0; i < clauses.length; i++) {
 				__clause += ',`' + clauses[i].name + '`=?';
 				__values.push(clauses[i].value);
 			}
 			__sql += ((__set != '') ? ' SET ' + __set.substr(1) : '') + ((__clause != '') ? ' WHERE ' + __clause.substr(1) : '') + ';';
 			this.query(__sql, callback, __values);
 			return true;
 		},
 		remove: function(tbl, clauses) {
 			var __sql = 'DELETE FROM ' + tbl,
 				__clause = '';

 			for(var i = 0; i < clauses.length; i++)
 				__clause += ',`' + clauses[i].name + '`="' + escape(clauses[i].value) + '"';

 			__sql += ' WHERE ' + ((__clause != '') ? __clause.substr(1) : 'FALSE') + ';';

 			this.query(__sql);
 			return true;
 		},
 		multiInsert: function(tbl, rows, callback, er) {
 			if(!this._db)
 				return false;
 			var self = this;
 			var __sql = '',
 				_field = null,
 				__field = '',
 				__qs = [],
 				__values = [];

 			this._db.transaction(function(tx) {
 				for(var i = 0; i < rows.length; i++) {
 					__qs = [];
 					__values = [];
 					__field = '';
 					_field = rows[i];

 					for(var j = 0; j < _field.length; j++) {
 						__field += ',`' + _field[j].name + '`';
 						__qs.push('?');
 						__values.push(_field[j].value);
 					}
 					tx.executeSql('INSERT INTO ' + tbl + ' (' + __field.substr(1) + ') VALUES(' + __qs.join(',') + ');', __values, function() {
 						return false;
 					}, (er ? er : self.callback_error));
 				}
 			}, self.callback_error, function() {
 				if(callback)
 					callback();
 				return true;
 			});
 			return true;
 		},
 		insert: function(tbl, rows, callback) {
 			var __sql = '',
 				_field = null,
 				__field = '',
 				__qs = [],
 				__values = [],
 				__debug = '';

 			for(var i = 0; i < rows.length; i++) {
 				__qs = [];
 				__field = '';
 				_field = rows[i];

 				__debug += _field[0].name + ' = ' + _field[0].value + ';';
 				for(var j = 0; j < _field.length; j++) {
 					__field += ',`' + _field[j].name + '`';
 					__qs.push('?');
 					__values.push(_field[j].value);
 				}
 				__sql += 'INSERT INTO ' + tbl + ' (' + __field.substr(1) + ') VALUES(' + __qs.join(',') + ');';
 			}
 			this.query(__sql, callback, __values);
 			return true;
 		},
 		insertReplace: function(tbl, rows, debug) {
 			var __sql = '',
 				_field = null,
 				__field = '',
 				__qs = [],
 				__values = [],
 				__debug = '';

 			for(var i = 0; i < rows.length; i++) {
 				__qs = [];
 				__field = '';
 				_field = rows[i];

 				__debug += _field[0].name + ' = ' + _field[0].value + ';';
 				for(var j = 0; j < _field.length; j++) {
 					__field += ',`' + _field[j].name + '`';
 					__qs.push('?');
 					__values.push(_field[j].value);
 				}
 				__sql += 'INSERT OR REPLACE INTO ' + tbl + ' (' + __field.substr(1) + ') VALUES(' + __qs.join(',') + ');';
 			}
 			this.query(__sql, null, __values);
 			return true;
 		},
 		dropTable: function(tbl, callback) {
 			var __sql = '';
 			if(tbl == null)
 				return false;
 			__sql = 'DROP TABLE IF EXISTS ' + tbl;
 			this.query(__sql, callback);
 			return true;
 		}
 	}
 	return jQuery.extend(ret, confs);
 }

 /*=======================================
 使用方法：
 /*=======================================*/

 /*=======================================*/
 //创建数据库：
 /* Create or open database with 'websiteDB' as database name and 'website DB' as title, and database site is 5MB */
 /* I'm not using 1024 for the size multiplying because i don't want to be near at the margin size                          */
 var db = new cDB({
 	_db: window.openDatabase("websiteDB", "", "website DB", 5 * 1000 * 1000)
 });
 db.dropTable('classification');
 db.dropTable('classified_works');
 db.dropTable('product');
 /*=======================================*/
 // 建表:
 /* dbTable is database structure in this example, and contains 2 tables 'foo' and 'boo' */
 /* and also the table structure in table properties   */
 var dbTable = [{
 	table: 'classification',
 	properties: [{
 		name: 'id',
 		type: 'PRIMARY KEY'
 	}, {
 		name: 'name',
 		type: ''
 	}]
 }, {
 	table: 'classified_works',
 	properties: [{
 		name: 'id',
 		type: 'PRIMARY KEY'
 	}, {
 		name: 'classification_id',
 		type: ''
 	}, {
 		name: 'name',
 		type: ''
 	}, {
 		name: 'image',
 		type: ''
 	}, {
 		name: 'info',
 		type: ''
 	}]
 }, {
 	table: 'product',
 	properties: [{
 		name: 'product_id',
 		type: 'INT PRIMARY KEY ASC'
 	}, {
 		name: 'classification_id',
 		type: ''
 	}, {
 		name: 'product_name',
 		type: ''
 	}, {
 		name: 'product_author',
 		type: ''
 	}, {
 		name: 'product_info',
 		type: ''
 	}]
 }, {
 	table: 'dynasty',
 	properties: [{
 			name: "id",
 			type: 'INT PRIMARY KEY ASC'
 		},
 		{
 			name: 'name',
 			type: ''
 		}
 	]
 }, {
 	table: 'author',
 	properties: [{
 			name: "id",
 			type: 'INT PRIMARY KEY ASC'
 		},
 		{
 			name: 'name',
 			type: ''
 		},
 		{
 			name: 'dynasty_id',
 			type: ''
 		},
 		{
 			name: "description",
 			type: ''
 		}
 	]
 },{
 	table: 'collection',
 	properties: [{
 		name: 'product_id',
 		type: 'INT PRIMARY KEY ASC'
 	},{
 		name: 'user_name',
 		type: ''
 	},{
 		name: 'classification_id',
 		type: ''
 	}, {
 		name: 'product_name',
 		type: ''
 	}, {
 		name: 'product_author',
 		type: ''
 	}, {
 		name: 'product_info',
 		type: ''
 	}]
 }];

 /* this line is checking if the database exist or not and then create the database structure.  */
 /* table will be created if the table is not exist yet, if the table already exist, it will skip the */
 /* table and continue with others tables                                                                                  */
 if(!db.check(dbTable)) {
 	db = false;
 	alert('Failed to cennect to database.');
 } else {
 	alert("tabel exist");
 }

 /*=======================================*/
 //删除表：
//db.dropTable('collection');

 /*=======================================*/
 function insertProduct(product_id, classification_id, product_name, product_author, product_info) {
 	var row = [];
 	row.push([{
 			'name': 'product_id',
 			'value': product_id
 		},
 		{
 			'name': 'classification_id',
 			'value': classification_id
 		},
 		{
 			'name': 'product_name',
 			'value': product_name
 		},
 		{
 			'name': 'product_author',
 			'value': product_author
 		},
 		{
 			'name': 'product_info',
 			'value': product_info
 		},
 	]);
 	db.insert('product', row, function() {
 		// 		alert("insert " + product_name);
 	})
 }
 insertProduct("2", "2", "桑生李树", "[秦]佚名", "南顿张助，于田中种禾，见李核，欲持去，顾见空桑，中");
 insertProduct("3", "2", "董行成", "[秦]佚名", "唐怀州河内县董行成能策贼");
 insertProduct("4", "2", "寇准读书", "[秦]佚名", "初，张咏在成都，闻准入相，谓其僚属曰：“寇公奇材，。。。。。”");
 insertProduct("5", "2", "2", "2", "2");
 insertProduct("6", "2", "2", "2", "2");
 insertProduct("7", "2", "2", "2", "2");

 function insertClassification(id, name) {
 	var row = [];
 	row.push([{
 		'name': 'id',
 		'value': id
 	}, {
 		'name': 'name',
 		'value': name
 	}])
 	db.insert('classification', row, function() {
 		// 		alert("insert " + name);
 	})
 }
 insertClassification('1', '诗歌');
 insertClassification('2', '主题');
 insertClassification('3', '写景');
 insertClassification('4', '节日');

 function insertClassifiedWorks(id, classification_id, name, image, info) {
 	var row = [];
 	row.push([{
 		'name': 'id',
 		'value': id
 	}, {
 		'name': 'classification_id',
 		'value': classification_id
 	}, {
 		'name': 'name',
 		'value': name
 	}, {
 		'name': 'image',
 		'value': image
 	}, {
 		'name': 'info',
 		'value': info
 	}])
 	db.insert('classified_works', row, function() {
 		// 		alert("insert " + name);
 	})
 }
 insertClassifiedWorks("12", '1', "诗经全集", "images/1.3.jpg");
 insertClassifiedWorks("13", "1", "诗经楚辞节选", "images/1.4.jpg");
 insertClassifiedWorks("14", "1", "道德经", "images/1.5.jpg");
 insertClassifiedWorks("15", "1", "诗经", "images/1.1.jpg");

 insertClassifiedWorks("2a", '2', "诗经全集", "images/1.3.jpg");
 insertClassifiedWorks("2b", "2", "诗经楚辞节选", "images/1.4.jpg");
 insertClassifiedWorks("2c", "2", "道德经", "images/1.5.jpg");
 insertClassifiedWorks("2d", "2", "诗经", "images/1.1.jpg");

 function insertDynasty(id, name) {
 	var row = [];
 	row.push([{
 		'name': 'id',
 		'value': id
 	}, {
 		'name': 'name',
 		'value': name
 	}])
 	db.insert('dynasty', row, function() {
 		// 		alert("insert " + name);
 	})
 }
 insertDynasty("a", "a");
 insertDynasty("b", "b");
 insertDynasty("c", "c");

 function insertAuthor(id, name, dynasty_id, description) {
 	var row = [];
 	row.push([{
 		'name': 'id',
 		'value': id
 	}, {
 		'name': 'name',
 		'value': name
 	}, {
 		'name': 'dynasty_id',
 		'value': dynasty_id
 	}, {
 		'name': 'description',
 		'value': description
 	}])
 	db.insert('author', row, function() {
 		// 		alert("insert " + name);
 	})
 }
 insertAuthor("a1","a1", "a", "aaaa");
 insertAuthor("a2","a2", "a", "aaaa");
 insertAuthor("a3","a3", "a", "aaaa");
 insertAuthor("b1","b1", "b", "bbbb");
 insertAuthor("b2","b2", "b", "bbbb");
 insertAuthor("b3","b3", "b", "bbbb");
 insertAuthor("c1","c1", "c", "cccc");
 insertAuthor("c2","c2", "c", "cccc");
 insertAuthor("c3","c3", "c", "cccc");
 
 function insertCollection(user_name,product_id, classification_id, product_name, product_author, product_info) {
 	var row = [];
 	row.push([{
 			'name': 'product_id',
 			'value': product_id
 		},
 		{
 			'name': 'user_name',
 			'value': user_name
 		},
 		{
 			'name': 'classification_id',
 			'value': classification_id
 		},
 		{
 			'name': 'product_name',
 			'value': product_name
 		},
 		{
 			'name': 'product_author',
 			'value': product_author
 		},
 		{
 			'name': 'product_info',
 			'value': product_info
 		},
 	]);
 	db.insert('collection', row, function() {
   		 		alert("insert " + product_name);
 	});
 }
 insertCollection("spp","2", "2", "桑生李树", "[秦]佚名", "南顿张助，于田中种禾，见李核，欲持去，顾见空桑，中");
 insertCollection("spp","3", "2", "董行成", "[秦]佚名", "唐怀州河内县董行成能策贼");

 //插入数据：
 // var row = [];
 // row.push([{
 // 	'name': 'foo_id',
 // 	'value': 1
 // }, {
 // 	'name': 'foo_field_1',
 // 	'value': 'value 1 field_1'
 // }, {
 // 	'name': 'foo_field_2',
 // 	'value': 'value 1 field_2'
 // }]);
 // db.insert('foo', row);

 //插入多行记录：
 /*
 SQLite is not accepting more than 1 line statement,
 that is the reason why we not able to do more than one statement query, like insertion.
 If you want to insert more than 1 record at the time, you need to use this function.
  */
 // var rows = [];
 // rows.push([{
 // 	'name': 'boo_id',
 // 	'value': 1
 // }, {
 // 	'name': 'boo_field_1',
 // 	'value': 'value 1 field_1'
 // }, {
 // 	'name': 'boo_field_2',
 // 	'value': 'value 1 field_2'
 // }]);
 // rows.push([{
 // 	'name': 'boo_id',
 // 	'value': 2
 // }, {
 // 	'name': 'boo_field_1',
 // 	'value': 'value 2 field_1'
 // }, {
 // 	'name': 'boo_field_2',
 // 	'value': 'value 2 field_2'
 // }]);
 // db.multiInsert('boo', rows, function() {
 // 	alert('insertion done');
 // });

 /*
 如果想合并insert 和 multiInsert两个函数，可以按下面的方法增加一个判断来处理
  */

 // if(rows.length >= 2) {
 // 	db.multiInsert('boo', rows, function() {
 // 		alert('insertion done');
 // 	});
 // } else {
 // 	db.insert('boo', rows);
 // }

 /*=======================================*/
 //删除数据：
 // db.remove('boo', [{
 // 	'name': 'boo_id',
 // 	'value': 1
 // }])

 /*=======================================*/
 //更新数据
 // db.update('boo',
 // 	[{
 // 		'name': 'boo_id',
 // 		'value': 2
 // 	}, {
 // 		'name': 'boo_field_1',
 // 		'value': 'boo value'
 // 	}, {
 // 		'name': 'boo_id', 
 // 		'value': 2
 // 	}])

 /*=======================================*/
 //查询
 // var query = 'SELECT * FROM product';
 // db.query(query, function(tx, res) {
 // 	if(res.rows.length) {
 // 		alert('found ' + res.rows.length + ' record(s)');
 // 		alert(res.rows[0].product_id);
 // 	} else {
 // 		alert('table foo is empty');
 // 	}
 // });