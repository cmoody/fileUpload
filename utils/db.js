// https://github.com/Leveton/node-parse-api
var Parse = require('node-parse-api').Parse;

var db = {};
var APP_ID = '';
var MASTER_KEY = '';

var app = new Parse(APP_ID, MASTER_KEY);

// Get all for organization
db.getAllProducts = function(data) {
	app.findMany('Foo', '', function (err, response) {
	  console.log(response);
	});
};

// Insert products
db.insertProduct = function() {
	app.insert('Foo', { foo: 'bar' }, function (err, response) {
	  console.log(response);
	});
};

module.exports = db;