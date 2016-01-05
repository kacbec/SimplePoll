var express = require('express');
var router = express.Router();

router.get('/poll_entries', function(req, res) {
    var db = req.db;
    var collection = db.get('poll_options');
    collection.find({},{},function(e,docs){
		res.json(docs);
    });
});

router.post('/vote', function(req, res) {
    var db = req.db;
    var collection = db.get('poll_options');

    collection.update(
   		{ Name: req.body.name },
   		{ $inc: { Votes: 1 } }
	)

    res.send(req.body.name);
});

router.post('/reset', function(req, res) {
    var db = req.db;
    var collection = db.get('poll_options');

    collection.update(
   		{ Name: 'Windows' },
   		{ $set:{Votes: 0} }
	);

    collection.update(
   		{ Name: 'Linux' },
   		{ $set:{Votes: 0} }
	);

	res.send('clear');
    
});

module.exports = router;
