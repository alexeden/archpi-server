// Express Server Initialization

var config 		= require('./modeset'),
	http 		= require('http'),
	socketio 	= require('socket.io'),
	express 	= require('express'),
	morgan		= require('morgan'),
	session		= require('express-session'),
	flash		= require('connect-flash');

// Module constructor
module.exports = function() {
	var app = express();
	var server = http.createServer(app);
	var io = socketio.listen(server);

	// Environment mode
	if(process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}
	else if(process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	require('../app/routes/index.server.routes.js')(app);


	// Express session data
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	// Static client files
	app.use(express.static('./public'));

	return server;
};
