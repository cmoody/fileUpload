var express = require('express');
var router = express.Router();

// router.use(function(req, res, next) {
// 	res.type('application/json');

// 	next();	
// });

router.route('/user')
	.get(function(req, res) {
  		res.json({ title: 'GET API' });
	})
	.post(function(req, res) {
  		res.json({ title: 'POST API' });
	})
	.delete(function(req, res) {
  		res.json({ title: 'DELETE API' });
	})
	.put(function(req, res) {
  		res.json({ title: 'PUT API' });
	})
	.patch(function(req, res) {
  		res.json({ title: 'PATCH API' });
	});

module.exports = router;
