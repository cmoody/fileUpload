// save file then open it parse excel then remove it
// Maybe use tmp folder

var fs = require('fs');
var XLSX = require('xlsx');
// var db = require('db');

var methodList = {
	cavalierdist: function(file) {
		var workbook = XLSX.readFile(file);
		console.log(workbook);
	}
};

function compareWorkbookDb() {
	// db.getAllProducts() // promise?
	// compare to workbook
};

var processor = {
	chooseMethod: function(file, id) {
		// id is string
		var method = methodList[id];
		method(file);
	}
};

module.exports = processor;