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
	socketio 	= require('socket.io'),
	passport	= require('passport');

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
		mongooseConnection: db.connection
	});


	// Express session data
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: mongoStore
	}));

	// Use EJS as the default template engine
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	// Register the connect-flash middleware for displaying error messages
	app.use(flash()); // Exposes the req.flash() method

	// Register the init and session Passport middleware
	app.use(passport.initialize());	// Bootstraps the Passport module
	app.use(passport.session());	// Keeps track of user's session

	// MVC Implementation
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);

	// Static client files
	app.use(express.static('./public'));

	
	// Call the Socket.io configuration module, which will set the Socket.io session
	require('./socketio')(server, io, mongoStore);


	

	return server;
};
