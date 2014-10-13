module.exports = function(app, passport) {

	//The base route for all angular injections.
	app.get('/index', isLoggedIn, function(req, res) {
		res.render('index.html', {
			user : req.user
		});
	});


	//Get request to ge thte current logged in user.
	app.get('/currentUser', isLoggedIn, function(req, res) {
		res.json(req.user);
	});


	
	//----------------------------LOGIN ROUTES----------------------------
	//Route for the login-page
	app.get('/login', function(req, res) {
		res.render('login', { message: req.flash('loginMessage') });
	});

	//Logout GET-request
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	//POST request to log the user in
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/index', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	//POST request to log the user in
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/index', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	//----------------------------LOGIN ROUTES----------------------------


	//----------------------------REST API----------------------------
	//Get the express router and set it to listen to /api
	var User     	= require('../models/user.js');
	var express    	= require('express');
	var router 		= express.Router();
	
	app.use('/api', router);

	//This is the middleware, when you access the the /api you will first hit this method.
	//Perfect way to do initial setup, see it as a constructor. next() makes express to 
	//look further down the chain
	router.use(function(req, res, next) {
		console.log('Welcome to No1Scaff API.');
		next();
	});

	//Base route at /api
	router.get('/', function(req, res) {
		res.json({ message: 'Welcome to No1Scaff API.' });	
	});

		//:::::::::::::USERS API:::::::::::::
		router.route('/users').get(function(req, res) {
			User.find(function(err, users) {
				if (err)
					res.send(err);

				res.json(users);
			});
		});

		router.route('/createUser').post(function(req, res) {
		
			var user = new User();
			user.email = req.body.email;
			user.password = user.generateHash(req.body.password);
			user.firstName = req.body.firstName;
			user.lastName = req.body.lastName;
			user.isAdmin = req.body.isAdmin;

			user.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'User created!' });
			});
		});

		router.route('/users/:user_id').get(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if (err)
					res.send(err);
				res.json(user);
			});
		});

		//:::::::::::::USERS API:::::::::::::
	

	//----------------------------REST API----------------------------
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}