// routes/node_routes.js

var ObjectID = require('mongodb').ObjectId;

module.exports = function(app, db) {

	app.put('/leaderboard/:id', (req, res) => {
	    const id = req.params.id;
	    const details = { '_id': new ObjectId(id) };
	    const newscore = { name: req.body.name, score: req.body.score };
	    db.collection('scores').update(details, newscore, (err, result) => {
	      if (err) {
	          res.send({'error':'An error has occurred'});
	      } else {
	          res.send(newscore);
	      } 
	    });
 	});


	app.get('/leaderboard', (req, res) => {
	    db.collection('scores').find({}).toArray((err, result) => {
	      if (err) {
	        res.send({'error':'An error has occurred'});
	      } else {
	        res.send(result);
	      }
	    });
 	 });

	app.delete('/leaderboard/:id', (req, res) => {
	    const id = req.params.id;
	    const details = { '_id': new ObjectId(id) };
	    db.collection('scores').remove(details, (err, item) => {
	      if (err) {
	        res.send({'error':'An error has occurred'});
	      } else {
	        res.send('score ' + id + ' deleted!');
	      } 
	    });
  	});


	
	app.get('/leaderboard/:id', (req, res) => {
	    const id = req.params.id;
    	const details = { '_id': new ObjectId(id) };
	    
	    db.collection('scores').findOne(details, (err, item) => {
	      if (err) {
	        res.send({'error':'An error has occurred'});
	      } else {
	        res.send(item);
	      }
	    });
 	 });
	

	app.post('/leaderboard', (req, res) => {
    const score = { name: req.body.name, score: req.body.score };
    db.collection('scores').insertOne(score, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
		res.send("Processed request");
      }
    });
  });
};