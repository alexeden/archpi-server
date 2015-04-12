var	config = require('./modeset'),
	mongoose = require('mongoose');


// Use the Mongoose module and connect to the MongoDB instance using the db property
module.exports = function() {
	var db = mongoose.connect(config.db);
	// Implement the Model schemas
	require('../app/models/user.server.model');
	return db;
}
