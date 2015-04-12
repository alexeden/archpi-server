
// Import passport module, the Google strategy object,
// the environmental configuration file, the User Mongoose model,
// and the Users controller.
var passport = require('passport'),
	url = require('url'),
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
	config = require('../modeset'),
	users = require('../../app/controllers/users.server.controller');

module.exports = function() {
	console.log("Google strategy initializer, config:\n", config);
	// Register the strategy and create an instance of a GoogleStrategy object
	passport.use(
		// The GoogleStrategy constructor takes two arguments:
		//	[1]	the Google application information
		//	[2] callback function called trying to authenticate a user
		new GoogleStrategy(
			{
				clientID: config.google.clientID,
				clientSecret: config.google.clientSecret,
				callbackURL: config.google.callbackURL,
				passReqToCallback: true
			},	
			// The authentication trigger callback takes five arguments:
			// [1]	HTTP request object
			// [2]	accessToken object to validate future requests
			// [3]	refreshToken object to grab new access tokens
			// [4]	profile object containing the user profile
			// [5]	done callback called when the authentication process is over
			function(req, accessToken, refreshToken, profile, done) {
				// Create a new user object using the Google profile information
				var providerData = profile._json;
				providerData.accessToken = accessToken;
				providerData.refreshToken = refreshToken;

				var providerUserProfile = {
					firstName: profile.name.givenName,
					lastName: profile.name.familyName,
					fullName: profile.displayName,
					email: profile.emails[0].value,
					username: profile.username,
					provider: 'google',
					providerId: profile.id,
					providerData: providerData
				};

				// Call our controller's predefined saveOAuthUserProfile() method
				users.saveOAuthUserProfile(req, providerUserProfile, done);
			}
		)
	);
};