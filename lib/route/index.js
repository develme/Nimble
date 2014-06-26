

module.exports = {
	controller: function (route, controller) {
		var _route = route == '' ? '/*' : '/' + route + '/*';
		var _controller = app.controllers[controller];
		app.framework.all(_route, function (req, res) {
			var _method = req.method.toLowerCase();
			var _missingMethod = _method + "Missing";

			if (req.method == "POST") {
				app.input = req.body;
			}

			if (req.user) {
				console.log('Welcome Back ' + req.user.name);
			}
			app.req = req;
			var urlBits = req.url.split('/');

			// Remove part of route stored in route variable
			urlBits.shift();
			if (_route != "/*") urlBits.shift();


			// Magic to create controller method
			var controllerMethod = urlBits == '' ? req.method.toLowerCase() + 'Index' : req.method.toLowerCase() + urlBits.shift().proper();

			console.log(app.controllers[controller]);
			//console.log(controllerMethod);

			if (_controller[controllerMethod] == undefined)
				if (_controller[_missingMethod] == undefined)
					throw "Controller method " + controllerMethod + " not found. " + _missingMethod + " method not defined within controller.";
				else {
					urlBits.unshift(controllerMethod);
					_controller[_missingMethod].apply(this, [urlBits]);
				}
			else
				app.controllers[controller][controllerMethod].apply(this, [urlBits]);
		});
	},
	get : function (route, callback) {
		app.framework.get(route, callback);
	}
}