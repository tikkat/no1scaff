// set up ==============================

var express 			= require('express'),
	app 				= express(),
	bodyParser			= require('body-parser'),
	mongoose			= require('mongoose'),
	configDB 			= require('./server/config/database.js'),
    passport 			= require('passport'),
    flash    			= require('connect-flash'),
    cookieParser 		= require('cookie-parser'),
    session 			= require('express-session');

// configuration ========================

mongoose.connect(configDB.url);
require('./server/config/passport')(passport); 		//Passport setup

app.use(express.static(__dirname + '/app')); 		// set the static files location
app.use(bodyParser());
app.use(cookieParser());
app.use(session({ secret: 'tikkasaurusandoak' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// application ============================


	app.use('/*', function(req, res){
  		// loads the view file, Angular takes care of the frontend routing
  		res.sendfile(__dirname + '/app/index.html');
	});

// app.get('/', function (req, res) {
// 	res.sendFile(__dirname + '/app/views/login.html');
// });

app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile);
// app.get('/', function (req, res) {
// 	res.sendfile(__dirname + '/app/index.html');
// });
//Separate the routing for login handling
require('./server/controllers/routes.js')(app, passport);

// listen (start cmd: node server.js) =========

app.listen(3000, function() {
	console.log("Listening...");
});