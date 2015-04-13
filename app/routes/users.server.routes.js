// Route all user-related routes to the controller's methods
// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport');

// Define the routes module' method
module.exports = function(app) {

	// Set up the 'signin' routes 
	app
	.route('/signin')
	.get(users.renderSignin);

	// The first route will use the passport.authenticate() method to 
	// start the user authentication process
	app.get(
		'/oauth/google', passport.authenticate(
			'google', {
				failureRedirect: '/signin',
				scope: [
					'https://www.googleapis.com/auth/userinfo.profile',
					'https://www.googleapis.com/auth/userinfo.email'
				]
			}
		)
	);

	// The second route uses the passport.authenticate() method to 
	// finish the authentication process once the user used their Google profile to connect
	app.get(
		'/oauth/google/callback', passport.authenticate(
			'google', {
				failureRedirect: '/signin',
				successRedirect: '/'
			}
		)
	);



	// Set up the 'signout' route
	app.get('/signout', users.signout);
};
