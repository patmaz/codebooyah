var gulp = require('gulp');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');


gulp.task('default', function() {
    return gulp.src('src/js/app.js')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});