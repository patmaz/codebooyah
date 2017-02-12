var gulp = require('gulp');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

gulp.task('js', function() {
    return gulp.src('src/js/app.js')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('public/js'));
});

gulp.task('styles', function () {
    return gulp.src('src/style/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('public/style'))
});

gulp.task('default', ['styles'], function () {
    gulp.watch('src/style/**/*', ['styles']);
    gulp.watch('src/js/**/*', ['js']);
});