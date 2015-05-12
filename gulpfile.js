var gulp = require('gulp');
//Plugins
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate')
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var connect = require('gulp-connect');

var env,
	jsSources,
	sassSources,
	outputDir;

jsSources = [
	'static/scripts/app.js',
	'static/scripts/**/**.module.js',
	'static/scripts/authentication/**/*.js',
	'static/scripts/accounts/**/*.js',
	'static/scripts/orders/**/*.js',	
	'static/scripts/layout/**/*.js',
	'static/scripts/controllers/**/*.js',
	'static/scripts/directives/**/*.js',
	'static/scripts/modules/**/*.js'

]
sassSources = ['static/sass/main.scss'];

env = process.env.NODE_ENV || 'development';

if (env==='development') {
	outputDir = 'static/build/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'static/build/production/';
	sassStyle = 'compressed';
}

// JS concat and minify and add.min 
gulp.task('scripts', function(){
	gulp.src(jsSources)
		.pipe(concat('main.js'))
		.pipe(gulpif(env === 'production', rename({ suffix: '.min'})))
		.pipe(gulpif(env === 'production', ngAnnotate()))
		.pipe(gulpif(env === 'production', uglify())
		.on('error', gutil.log))
		.pipe(gulp.dest(outputDir + 'js'))
    	// .pipe(connect.reload())
});

//SASS/CSS concat and minify
gulp.task('compass', function() {
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'static/sass',
			css: outputDir + 'css',
			image: outputDir + 'images',
			style: sassStyle,
		})
		.on('error', gutil.log))
		.pipe(gulp.dest(outputDir + 'css'))
		// .pipe(connect.reload())
});

//Image compress for production only
gulp.task('images', function(){
  gulp.src('static/images/*.*')
  	.pipe(gulpif(env === 'production', imagemin({
  		progressive : true,
  		svgoPlugins: [{ removeViewBox: false }],
  		use: [pngquant()]
  	})))
  	.pipe(gulpif(env === 'production', gulp.dest(outputDir+'images')))
  	// .pipe(connect.reload())
});

//Watch for changes in the js, css and image files
gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch('static/sass/*.scss', ['compass']);
  // gulp.watch('builds/development/*.html', ['html']);
  gulp.watch('static/images/*.*', ['images']);
});

// Live reload upon changes to files
gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

// Default Task
gulp.task('default', ['scripts', 'compass', 'images', 'watch']);