var jsdoc = require('gulp-jsdoc3');
var gulp = require('gulp');
var convertEncoding = require('fd-gulp-convert-encoding');
var del = require('del');

gulp.task('clean', function (cb) {
  return del([
    'outputDocument/**/*',
    'encodedJsFiles/**/*'
  ]);
});

gulp.task('encodedJsFiles', ['clean'], function () {
  return gulp.src('./scripts/**/*.js')
    .pipe(convertEncoding('utf-8'))
    .pipe(gulp.dest('encodedJsFiles'));
});

gulp.task('doc', ['clean', 'encodedJsFiles'], function (cb) {
  var config = require('./node_modules/gulp-jsdoc3/dist/jsdocConfig.json');
  gulp.src(['README.md', './encodedJsFiles/**/*.js'], {read: false})
    .pipe(jsdoc(config, cb));
});