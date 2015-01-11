var gulp = require('gulp');
var exec = require('child_process').exec;
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var pngcrush = require('imagemin-pngcrush');

function spawn(cmd) {
  var child = exec(cmd);
  process.on('exit', function(code) {
    child.kill(code);
  });
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
}

gulp.task('less', function() {
  gulp.src('assets/less/main.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('ext/css'));
});

gulp.task('watch', function() {
  spawn('npm run watch-js');
  spawn('npm run watch-pages');
  gulp.watch('assets/less/**/*.less', ['less']);
});

gulp.task('imagemin', function() {
  gulp.src('ext/icons/*.png')
    .pipe(pngcrush({ reduce: true })())
    .pipe(gulp.dest('ext/icons'));
});

gulp.task('default', ['less', 'watch']);
