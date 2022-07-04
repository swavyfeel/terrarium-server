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

	app.post('/users/request/:username', (req, res) => {
		const data = { from: req.body.username, to: req.params.username };
		console.log(data);
		db.collection('friend_requests').insertOne(data, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(result.acknowledged);
			}
		});
	});

	app.post('/users/accept/:username', (req, res) => {
		const from = req.body.username;
		const to = req.params.username;
		console.log(data);
		db.collection('friend_requests').deleteOne({ from: from, to: to }, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(result.acknowledged);
			}
		});
		db.collection('friend_requests').deleteOne({ from: to, to: from }, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(result.acknowledged);
			}
		});
		db.collection('users').updateOne({ username: from }, { $push: { friends: to } }, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(result.acknowledged);
			}
		});
		db.collection('users').updateOne({ username: to }, { $push: { friends: from } }, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(result.acknowledged);
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

	app.get('/users/request/:username', (req, res) => {
		db.collection('friend_requests').find({ to: req.params.username }).toArray((err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(result);
			}
		});
	});

	app.get('/users/friends/:username', (req, res) => {
		db.collection('users').findOne({ username: req.params.username }, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(result);
			}
		});
	});

	app.delete('/users/:username', (req, res) => {
		const details = { 'username': req.params.username };
		db.collection('users').remove(details, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(result.acknowledged);
			}
		});
	});



	app.get('/users/:username', (req, res) => {
		const details = { 'username': { $regex: req.params.username, $options: 'i' } };

		db.collection('users').find(details).toArray((err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(result);
			}
		});
	});


	app.post('/users', (req, res) => {
		const data = { 'username': req.body.username, best_pet_birth_date: req.body.bestBorn, best_pet_death_date: req.body.bestDied };
		db.collection('users').insertOne(data, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(result.acknowledged);
			}
		});
	});

	app.post('/users/:username', (req, res) => {
		const data = { $set: { best_pet_birth_date: req.body.bestBorn, best_pet_death_date: req.body.bestDied } };
		const query = { username: req.params.username };
		console.log(query);
		console.log(data);
		db.collection('users').updateOne(query, data, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(result.acknowledged);
			}
		});
	});
};