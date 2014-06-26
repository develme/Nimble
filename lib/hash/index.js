
var bcrypt = require('bcrypt-nodejs');

module.exports = {

	make: function (password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	},

	check: function (plain, hash) {
		return bcrypt.compareSync(plain, hash);
	}
}