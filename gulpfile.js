// npm install gulp gulp-concat gulp-util gulp-rename gulp-uglify gulp-ruby-sass gulp-minify-css gulp-minify-html gulp-autoprefixer colors --save-dev
// Dependent on ruby's sass compiler

var gulp 			= require('gulp');
var gutil 			= require('gulp-util');

var grename 		= require('gulp-rename');
var concat 			= require('gulp-concat');
var uglify 			= require('gulp-uglify');
var sass 			= require('gulp-ruby-sass');
var minifycss 		= require('gulp-minify-css');
var jade 			= require('gulp-jade');
//var minifyhtml = require('gulp-minify-html');
var autoprefixer 	= require('gulp-autoprefixer');

var exec 			= require('child_process').exec;
var sys 			= require('sys');
var colors 			= require('colors');

var currentDate = new Date();

var config = {
/*	html: {
		directory: 'app/assets/views/',
		destination: 'public/views/compiled/',
		config: {
			empty: true,
			cdata: true,
			comments: true,
			conditionals: true,
			spare: true,
			quotes: true
		},
	}, */
	jade: {
		directory: 'app/assets/jade/',
		destination: 'public/views/',
		config: {
			pretty: true
		}
	},
	sass: {
		directory: 'app/assets/sass/',
		destination: 'public/css/',
		config: {
			style: 'compressed'
		}
	},
	javascript: {
		directory: 'app/assets/javascript/',
		source: {
			controllers: 'controllers/',
			directives: 'directives/',
			repositories: 'repositories/',
			services: 'services/'
		},
		destination: 'public/js/',
		config: {
			rename: {
				suffix: ".min"
			}
		}
	},
	autoprefixer: {
		config: 'last 5 version'
	}
};

gulp.task('js', function() {
	var directory = config.javascript.directory;
	sys.puts(currentDate.toLocaleString().inverse.white);
	sys.puts('Building Javascript [Directory \'' + directory + '\'...');
	// Build Frontend Main Components
	gulp.src(directory + '*.js')
		.pipe(concat('main.js'))
		//.pipe(uglify())
		//.pipe(grename(config.javascript.config.rename))
		.pipe(gulp.dest(config.javascript.destination));

	// Build Frontend Controller Components
	gulp.src(directory + config.javascript.source.controllers + '**/*.js')
		.pipe(concat('controllers.js'))
		//.pipe(uglify())
		//.pipe(grename(config.javascript.config.rename))
		.pipe(gulp.dest(config.javascript.destination));

	// Build Frontend Directives Components
	gulp.src(directory + config.javascript.source.directives + '**/*.js')
		.pipe(concat('directives.js'))
		//.pipe(uglify())
		//.pipe(grename(config.javascript.config.rename))
		.pipe(gulp.dest(config.javascript.destination));

	// Build Frontend Repository Components
	gulp.src(directory + config.javascript.source.repositories + '**/*.js')
		.pipe(concat('repositories.js'))
		//.pipe(uglify())
		//.pipe(grename(config.javascript.config.rename))
		.pipe(gulp.dest(config.javascript.destination));

	// Build Frontend Service Components
	gulp.src(directory + config.javascript.source.services + '**/*.js')
		.pipe(concat('services.js'))
		//.pipe(uglify())
		//.pipe(grename(config.javascript.config.rename))
		.pipe(gulp.dest(config.javascript.destination));
});

gulp.task('css', function() {
	return gulp.src(config.sass.directory + '*.scss')
		.pipe(concat('main.css'))
		.pipe(sass(config.sass.config).on('error', gutil.log))
		.pipe(autoprefixer(config.autoprefixer.config).on('error', gutil.log))
		.pipe(gulp.dest(config.sass.destination));
});


//gulp.task('html', function () {
//
//	// Build Frontend Views
//	gulp.src(config.html.directory + '**/*.html')
//		.pipe(minifyhtml(config.html.config))
//		.pipe(gulp.dest(config.html.destination));
//}); */

gulp.task('jade', function () {

	return gulp.src(config.jade.directory + '**/*.jade')
		.pipe(jade(config.jade.config))
		.pipe(gulp.dest(config.jade.destination));
})

gulp.task('watch', function() {
//	gulp.watch(config.html.directory + '/**/*.html', ['html']);

	gulp.watch(config.jade.directory + '**/*.jade', ['jade']);

	gulp.watch(config.sass.directory + '**/*.sass', ['css']);
	gulp.watch(config.sass.directory + '**/*.scss', ['css']);

	gulp.watch(config.javascript.directory + '**/*.js', ['js']);
});

gulp.task('default', ['js', 'css', 'watch', 'jade']);