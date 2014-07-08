// save file then open it parse excel then remove it
// Maybe use tmp folder

var fs = require('fs');
var XLSX = require('xlsx');
// var db = require('db');

var methodList = {
	cavalierdist: function(file) {
		var jsonFile = XLSX.readFile(file);

		// process file here

		getJSONDB(jsonFile);
	},

	chasesawesomedist: function(file) {
		var jsonFile = XLSX.readFile(file);

		// process different file format

		getJSONDB(jsonFile);
	}
};

function getJSONDB(jsonFile) {
	// db.getAllProducts()
	// 	.then(function(jsonDB) {
	// 		compareFileDB(jsonFile, jsonDB);
	// 	})
	// 	.fail(function(err) {
	// 		console.log(err);
	// 	});
};

function compareFileDB(jsonFile, jsonDB) {
	// run through both sets of json data
};

var processor = {
	chooseMethod: function(file, id) {
		// id is string
		var method = methodList[id];
		method(file); // chooses method for processing
	}
};

module.exports = processor;