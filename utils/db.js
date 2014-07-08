// https://github.com/Leveton/node-parse-api
var Parse = require('node-parse-api').Parse;
var Q = require('q');

var db = {};
var APP_ID = '';
var MASTER_KEY = '';

var app = new Parse(APP_ID, MASTER_KEY);

// Get all for organization
db.getAllProducts = function(data) {
	var deferred = Q.defer();

	app.findMany('Foo', '', function (err, response) {
		if(err) {
			deferred.reject(err);
		}else{
			deferred.resolve(response);
		}
	});

	return deferred.promise;
};

// Insert product
db.insertProduct = function() {
	app.insert('Foo', { foo: 'bar' }, function (err, response) {
	  console.log(response);
	});
};

// Update product
db.updateProduct = function() {
	app.insert('Foo', { foo: 'bar' }, function (err, response) {
	  console.log(response);
	});
};

module.exports = db;