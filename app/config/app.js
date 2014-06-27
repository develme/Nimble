var app_dir = APPLICATION_DIRECTORY;

var app = {
	name : "DevelMe",
	directory : {
		main: app_dir + 'DevelMe/'
	},
	debug : true
};

app.jqextend({
	files : {
		routes : APPLICATION_DIRECTORY + 'routes',
		models : APPLICATION_DIRECTORY + 'models/index'
	}
});

module.exports = app;