var gulp = require('gulp');
var exec = require('child_process').exec;
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('less', function() {
  gulp.src('assets/less/main.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('ext/css'));
});

gulp.task('watch', function() {
  var watchify = exec('npm run watch-js');
  process.on('exit', function(code) {
    watchify.kill(code);
  });

  watchify.stdout.pipe(process.stdout);
  watchify.stderr.pipe(process.stderr);

  gulp.watch('assets/less/**/*.less', ['less']);
});

gulp.task('default', ['less', 'watch']);
