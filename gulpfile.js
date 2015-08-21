var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');

var lessPath = './demo/less/demo.less';

gulp.task('css', function () {
    return gulp.src(lessPath)
       .pipe(less())
       .pipe(gulp.dest('./demo/css'))
       .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        root: 'demo',
        livereload: true,
        port: 12453
    });
});

gulp.task('watch', function () {
    gulp.watch('./demo/less/*.less', ['css']);
});

gulp.task('default', ['connect', 'watch', 'css']);
