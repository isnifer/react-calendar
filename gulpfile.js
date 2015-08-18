var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');

var lessPath = './src/less/demo.less';

gulp.task('css', function () {
    return gulp.src(lessPath)
       .pipe(less())
       .pipe(gulp.dest('./build/css'))
       .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        root: 'build',
        livereload: true,
        port: 12453
    });
});

gulp.task('watch', function () {
    gulp.watch('./src/less/*.less', ['css']);
});

gulp.task('default', ['connect', 'watch', 'css']);
