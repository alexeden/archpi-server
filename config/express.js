// Express Server Initialization

var config 		= require('./modeset'),
	bodyParser	= require('body-parser'),
	compress	= require('compression'),
	express 	= require('express'),
	flash		= require('connect-flash'),
	http 		= require('http'),
	methodOverride = require('method-override'),
	morgan		= require('morgan'),
	session		= require('express-session'),
	MongoStore	= require('connect-mongo')(session),
	socketio 	= require('socket.io');

// Module constructor
module.exports = function(db) {
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

	// Body parser
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Allow the storage of session info in a MongoDB instance
	var mongoStore = new MongoStore({
		db: 'mongodb://localhost/archpi'
	});


	// Express session data
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: mongoStore
	}));

	// User authentication
	app.use(flash());

	// MVC Implementation
	require('../app/routes/index.server.routes.js')(app);

	// Static client files
	app.use(express.static('./public'));

	
	// Call the Socket.io configuration module, which will set the Socket.io session
	require('./socketio')(server, io, mongoStore);


	

	return server;
};
