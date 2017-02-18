var gulp = require('gulp');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var gutil = require('gulp-util');

var conf = {
    prod: gutil.env.env === 'prod'
}

gulp.task('jswebpack', function() {
    return gulp.src('src/js/app.js')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('public/js'));
});

gulp.task('js', function() {
    return gulp.src('src/js/script.js')
        .pipe(conf.prod ? uglify() : gutil.noop())
        .pipe(gulp.dest('public/js'));
});

gulp.task('styles', function () {
    return gulp.src('src/style/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(conf.prod ? autoprefixer('last 2 version') : gutil.noop())
        .pipe(conf.prod ? cssnano() : gutil.noop())
        .pipe(gulp.dest('public/style'))
});

gulp.task('default', ['styles', 'jswebpack', 'js'], function () {
    gulp.watch('src/style/**/*', ['styles']);
    gulp.watch(['src/js/**/*', '!src/js/script.js'], ['jswebpack']);
    gulp.watch('src/js/script.js', ['js']);
});

gulp.task('nowatch', ['styles', 'jswebpack', 'js'], function () {
    console.log('##### prod ready #####');
});