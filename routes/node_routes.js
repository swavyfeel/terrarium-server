// routes/node_routes.js

var ObjectID = require('mongodb').ObjectId;

module.exports = function (app, db) {

	app.put('/users/:name', (req, res) => {
		const name = req.params.name;
		const details = { 'username': name };
		const data = { username: req.body.username, best_pet_birth_date: req.body.score };
		db.collection('users').update(details, data, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(data);
			}
		});
	});


	app.get('/users', (req, res) => {
		db.collection('users').find({}).toArray((err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(result);
			}
		});
	});

	app.delete('/users/:name', (req, res) => {
		const name = req.params.name;
		const details = { 'username': name };
		db.collection('users').remove(details, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send('score ' + name + ' deleted!');
			}
		});
	});



	app.get('/users/:name', (req, res) => {
		const name = req.params.name;
		const details = { 'username': name };

		db.collection('users').findOne(details, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(item);
			}
		});
	});


	app.post('/users', (req, res) => {
		const data = { 'username': req.body.username, best_pet_birth_date: req.body.score };
		db.collection('users').insertOne(data, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(result.acknowledged);
			}
		});
	});
};