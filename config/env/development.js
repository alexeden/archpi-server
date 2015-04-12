// Development session secret string
module.exports = {
	sessionSecret: 'developmentSessionSecret',
	db: 'mongodb://localhost/archpi',
	google: {
		clientID: 'Application Id',
		clientSecret: 'Application Secret',
		callbackURL: 'http://localhost:3000/oauth/google/callback'
	}
};

