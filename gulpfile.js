var browserify = require('browserify');
var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var babelify = require('babelify');

var paths = {
    demo: './src/jsx/demo.jsx',
    less: './src/less/calendar.less'
};

gulp.task('js', function () {
    var bundler = browserify({
        entries: [paths.demo],
        transform: [babelify, reactify],
        extensions: ['.jsx'],
        cache: {},
        packageCache: {},
        fullPaths: true // for watchify
    });

    var watcher = watchify(bundler);
    return watcher
        .on('update', function () {
            watcher.bundle()
                .pipe(source('demo.js'))
                .pipe(gulp.dest('./build/js'))
                .pipe(connect.reload());
        })
        .bundle() // Create the initial bundle when starting the task
        .pipe(source('demo.js'))
        .pipe(gulp.dest('./build/js'))
        .pipe(connect.reload());

});

gulp.task('css', function () {
    return gulp.src(paths.less)
       .pipe(less())
       .pipe(gulp.dest('./build/css'))
       .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        root: 'build',
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch([paths.less], ['css']);
});

gulp.task('default', ['connect', 'watch', 'js', 'css']);
