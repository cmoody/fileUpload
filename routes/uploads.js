var express = require('express');
var router = express.Router();
var util = require('util');
var fs = require('fs');
var multer = require('multer');

var processor = require('../utils/processor');

router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

router.use(multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
    }
}));

router.get('/', function(req, res) { 
	res.render('fileupload', {title: "I love files!"}); 
}); 
 
router.route('/submit/:id')
	// Default for trying to browse page
	.get(function(req, res, next) {
		res.send('This is not the page youre looking for.');
	})

	.post(function(req, res, next){
		if (req.files) { 
			console.log(util.inspect(req.files));

			if (req.files.myFile.size === 0) {
			    return next(new Error("Hey, first would you select a file?"));
			}

			fs.exists(req.files.myFile.path, function(exists) {
				if(exists) {
					processor.chooseMethod(req.files.myFile.path, req.params.id);

					res.end("Got your file!"); 
				} else { 
					res.end("Well, there is no magic for those who don’t believe in it!"); 
				} 
			}); 
		} 
	});

module.exports = router;