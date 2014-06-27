var fs = require('fs');
var path = require('path');

module.exports = autoloader = {
	load: function (directory, rootDir) {
		console.log(rootDir);
		rootDir = rootDir || '';
		directory = directory.str_finish('/');
		var _rootDirectory = path.join(BASE, rootDir);
		var _relativeRootDir = path.join(rootDir, directory.str_finish('/'));
		var _toLoad = path.join(_rootDirectory, directory.str_finish('/'));
		var _loaded = {};
		var _loadLibrariesTo = {};

		var _loadedName = directory.camelCase('/');

		if (fs.existsSync(_toLoad)) {
			fs.readdirSync(_toLoad).forEach(function (listed) {
				var _listingToLoad = _toLoad + listed;

				console.log(_rootDirectory);

				if (fs.statSync(_listingToLoad).isDirectory()) _loadLibrariesTo.jqextend(autoloader.load(listed, _relativeRootDir));

				if (fs.statSync(_listingToLoad).isFile() && _listingToLoad.extension() == 'js') {
					var _moduleName = listed.remove_extension();
					console.log('load me');

					if (_moduleName == 'index')
						_loadLibrariesTo.jqextend(require(_listingToLoad));
					else
						_loadLibrariesTo[_moduleName] = require(_listingToLoad);
				}
			});
		}
		if (_loadedName != '')
			_loaded[_loadedName] = _loadLibrariesTo;
		else
			_loaded.jqextend(_loadLibrariesTo);

		return _loaded;
	}
}