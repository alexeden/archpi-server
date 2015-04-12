var	config = require('./modeset'),
	mongoose = require('mongoose');


// Use the Mongoose module and connect to the MongoDB instance using the db property
module.exports = function() {
	console.log("Mongoose initializer, config: ", config);
	var db = mongoose.connect(config.db);
	console.log("db:\n", db);
	// Implement the Model schemas
//	require('../app/models/article.server.model');
	return db;
}
