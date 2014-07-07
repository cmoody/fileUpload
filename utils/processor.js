// save file then open it parse excel then remove it
// Maybe use tmp folder

var fs = require('fs');
var XLSX = require('xlsx');

var processor = {
	jackieos: function(file) {
		var workbook = XLSX.readFile(file);
		console.log(workbook);
	}
};

module.exports = processor;