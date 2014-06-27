var passport = require('passport');
var passportStrategies = [];

passportStrategies['local'] = require('passport-local').Strategy;

var localStrategy = passportStrategies['local'];
passport.use(new localStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}

	,function (email, password, done) {
		app.models.user.findOne({ 'local.email' : userpass[0]}, function (err, user) {
			if (!user) 
				return done(null, false, { message: 'Incorrect username' });
				
			if (app.hash.check(userpass[1], user.local.password))
				return done(null, user);

			else
				return done(null, false, {message: err})
		});
	}
));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	app.models.user.findById(id, function ( err, user) {
		done(err, user);
	});
})

module.exports = {

	attempt: function (userpass, remember, callback) {
		app.models.user.findOne({ 'local.email' : userpass[0]}, function (err, user) {
			if (!user) 
				callback.call(null, false);
				
			if (app.hash.check(userpass[1], user.local.password))
				callback.call(null, user);

			else
				callback.call(null, false);
		});
		//return app.hash.check(userpass[1], "$2a$08$kPvWBfkXM9W.JRvf6758kueGZ70CypJTYQ0KNVKqlniaiZYkUKjDi");
	},

	method: passport,

	strategies: passportStrategies
}