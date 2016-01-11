var gulp = require('gulp');
var print = require('gulp-print');
var	uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var	concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var	sass = require('gulp-ruby-sass');
var	imagemin = require('gulp-imagemin');
var	prefix = require('gulp-autoprefixer');
var	browserSync = require('browser-sync').create();

// Error Function 
function errorLog(error){
	console.error.bind(error);
	this.emit('end');
}


///////////////// Server //////////////////////
// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./www"
    });

    gulp.watch('www/css/sass/**.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('www/js/*.js', ['scripts']).on('change', browserSync.reload);
    gulp.watch("www/*.html").on('change', browserSync.reload);
});


/////////////////  TASKS ////////////////////////
//Compresses Images
gulp.task('image', function(){
	gulp.src('www/img/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest('www/img'));
});

//Compresses and uglify the javascript files
gulp.task('scripts', function(){
	gulp.src('www/js/main.js')
	.pipe(concat('main.js'))
	.pipe(uglify())
	.on('error', errorLog)
	.pipe(gulp.dest('www/build/js'))
  .pipe(print(function(filepath) {
      return "built: " + filepath;
  }));

  gulp.src('www/js/mainEN.js')
  .pipe(concat('mainEN.js'))
  .pipe(uglify())
  .on('error', errorLog)
  .pipe(gulp.dest('www/build/js'))
  .pipe(print(function(filepath) {
      return "built: " + filepath;
  }));
});

// Compresses and prefix the scss files
gulp.task('sass', function () {
  return sass('www/scss/main.scss', {
  	style: 'compressed'
  })
  	.on('error', errorLog)
  	.pipe(prefix('last 2 versions'))
    .pipe(gulp.dest('www/build/css'))
    .pipe(print(function(filepath) {
      return "built: " + filepath;
    }));
});

// Combines the CSS support files 
gulp.task('supportCSS', function () {
  	gulp.src('support/css/*.css')
    .pipe(concatCss("support.css"))
    .pipe(cssnano())
    .pipe(gulp.dest('www/build/css'))
    .pipe(print(function(filepath) {
      return "built: " + filepath;
    }));
});

//Ugify the JS support files 
gulp.task('supportJS', function () {
    gulp.src('support/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('www/build/js'))
    .pipe(print(function(filepath) {
      return "built: " + filepath;
    }));
});

/////////////// Main Operations ////////////////
gulp.task('default', ['scripts', 'sass', 'serve']);

gulp.task('build', ['scripts', 'sass', 'supportCSS', 'supportJS']);