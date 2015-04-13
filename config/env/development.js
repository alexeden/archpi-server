// Development session secret string
module.exports = {
	sessionSecret: 'developmentSessionSecret',
	db: 'mongodb://localhost/archpi',
	host: 'eden-archpi.attlocal.net:3000',
	google: {
		clientID: '604504829237-2mhm9b91kqkufa3lfb8fjkap23r97lee.apps.googleusercontent.com',
		clientSecret: '6gwAzg1YfZuwSWD5YQRL7IJ9',
		callbackURL: 'http://eden-archpi.attlocal.net:3000/oauth/google/callback'
	}
};


// Get the host names by typing "$ host -a"
