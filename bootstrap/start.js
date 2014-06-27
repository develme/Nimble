(function () {

	var constants = {
		BASE : __dirname + '/../',
		APPLICATION_DIRECTORY: __dirname + '/../app/',
		APPLICATION_CONFIG_DIR : __dirname + '/../app/config/',
		VENDOR_DIRECTORY : __dirname + '/../lib/'
	};

	for (var c in constants)
		global[c] = constants[c];
})();

require('../app/helpers');

global.app = {};

app.autoloader = require(VENDOR_DIRECTORY + 'support/autoload');

app.jqextend(app.autoloader.load('config', 'app'));


//app.config = require(app.files.config);


var express = require('express');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');


app.framework = express();

app.express = express;

app.mongoose = mongoose;
app.orm = {};

app.parsers = {};
app.parsers.cookieParser = cookieParser;
app.parsers.bodyParser = bodyParser;

app.jqextend(app.autoloader.load('', 'lib'));

app.jqextend(app.autoloader.load('controllers', 'app'))
app.session = expressSession;

app.server = require('../server/httpd');

require(app.config.app.files.routes);