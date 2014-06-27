app.framework.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://develme.dev.local');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.framework.set('views', APPLICATION_DIRECTORY + 'views/');

app.framework.set('view engine', 'jade');

app.framework.use(app.express.static(BASE + 'public/'));
app.framework.use(require('prerender-node').set('prerenderServiceUrl', 'http://prerender.dev.local'));
app.framework.use(app.parsers.bodyParser());
app.framework.use(app.parsers.cookieParser());
app.framework.use(app.session({secret: 'framework'}));
app.framework.use(app.auth.method.initialize());
app.framework.use(app.auth.method.session());

module.exports = app.framework.listen(5000, function () {
	console.log('Listening on port %d', module.exports.address().port);
});