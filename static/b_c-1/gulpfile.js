var gulp = require('gulp'),
    gutil = require('gulp-util'),
    // coffee = require('gulp-coffee'),
    // browserify = require('gulp-browserify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    jsonminify = require('gulp-jsonminify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    gulpBowerFiles = require('gulp-bower-files'),
    concat = require('gulp-concat');

var env,
    coffeeSources,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    outputDir,
    bowerSources,
    sassStyle;

env = process.env.NODE_ENV || 'development';

if (env==='development') {
  outputDir = 'builds/development/';
  sassStyle = 'expanded';
} else {
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
}

bowerSources = ['static/'];
// coffeeSources = ['components/coffee/tagline.coffee'];
jsSources = [
  'static/scripts/**/**/*.js',
  // 'components/scripts/pixgrid.js',
  // 'components/scripts/tagline.js',
  // 'components/scripts/template.js'
];
sassSources = ['static/sass/main.scss'];
htmlSources = [outputDir + '*.html'];
// jsonSources = [outputDir + 'js/*.json'];

// gulp.task('coffee', function() {
//   gulp.src(coffeeSources)
//     .pipe(coffee({ bare: true })
//     .on('error', gutil.log))
//     .pipe(gulp.dest('components/scripts'))
// });
 
gulp.task("bower-files", function(){
    gulpBowerFiles().pipe(gulp.dest("test_bower"));
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    // .pipe(browserify())
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});

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
    .pipe(connect.reload())
});

gulp.task('watch', function() {
  // gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  gulp.watch('static/sass/*.scss', ['compass']);
  gulp.watch('builds/development/*.html', ['html']);
  // gulp.watch('builds/development/js/*.json', ['json']);
  gulp.watch('builds/development/images/**/*.*', ['images']);
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src('builds/development/*.html')
  	.pipe(gulpif(env === 'production', minifyHTML()))
  	.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
    .pipe(connect.reload())
});

gulp.task('images', function(){
  gulp.src('builds/development/images/**/*.*')
  	.pipe(gulpif(env === 'production', imagemin({
  		progressive : true,
  		svgoPlugins: [{ removeViewBox: false }],
  		use: [pngquant()]
  	})))
  	.pipe(gulpif(env === 'production', gulp.dest(outputDir+'images')))
  	.pipe(connect.reload())
});

// gulp.task('json', function() {
//   gulp.src('builds/development/js/*.json')
//   	.pipe(gulpif(env === 'production', jsonminify()))
//   	.pipe(gulpif(env === 'production', gulp.dest('builds/production/js')))
//     .pipe(connect.reload())
// });

gulp.task('default', ['html', 'js', 'compass', 'images', 'connect', 'watch']);