

module.exports = {
	make: function (view) {
		return app.req.res.render(view);
	},
	dd: function (data) {
		if (typeof data == 'String') app.req.res.send(data);
		if (typeof data == 'function') app.req.res.send(data.toString());
		if (typeof data == 'object') app.req.res.send(JSON.stringify(data));
		else app.req.res.send(data.toString());
	}
}