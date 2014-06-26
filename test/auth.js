var auth = require('../lib/auth/index.js');

// Mock Application
global.app = {
	models: {
		user: {
			findOne: function (obj, callback) {
				callback.call(null, null, {name: 'Testing Account', local: {password: 'testing'}});
				//if (obj[1] == 'testing') callback.call(null, {status: 'success'});
			}
		}
	},
	hash: {
		check: function (pass1, pass2) {
			if (pass1 == pass2) return true;
			else return false;
		}
	}
}

var assert = require('assert');

describe('Auth', function () {
	describe('#attempt()', function () {
		it('should exist', function () {
			assert.ok(typeof auth.attempt !== 'undefined');
		});

		it('should return successful authentication with user name "Testing Account"', function (done) {
			var userpass = ['test@test.com', 'testing'];
			var remember = true;
			auth.attempt(userpass, remember, function (result) {
				if (!result) return done('Authentication Failed');

				assert.equal(result.name, 'Testing Account');
				done();
			});
		});

		it('should return unsuccessful authentication with email "test@test.com"', function (done) {
			var userpass = ['test@test.com', 'testing2'];
			var remember = true;
			auth.attempt(userpass, remember, function (result) {
				if (!result) done();
				else done('Authentication successful');
			})
		});

		it('should return -1 when the value is not present', function () {
			assert.equal(-1,[1,2,3].indexOf(5));
		});
	});

	describe('#{method}', function () {
		it('should exist', function () {
			assert.ok(typeof auth.method !== 'undefined');
		});

		if (auth.method._key === 'passport') {
			describe('#{passport}', function () {
				it('should have strategies set', function () {
					assert.ok(typeof auth.strategies !== 'undefined');
				})
			});
		}
	});
})