var express = require('express');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');

module.exports = {
	framework: express(),
	express: express,
	mongoose: mongoose,
	session: expressSession,
	parsers: {
		cookieParser: cookieParser,
		bodyParser: bodyParser
	},
	orm: {}
}