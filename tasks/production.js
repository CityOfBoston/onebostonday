'use strict';

var gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglifyjs'),
    rename = require('gulp-rename');


// MINIFY ALL CSS FILES
gulp.task('cssmin', function() {
    gulp.src('html/css/screen.css')
        .pipe(cssmin())
        .pipe(gulp.dest('html/css'));
});


// MINIFY ALL JS FILES
gulp.task('jsmin', function() {
    gulp.src('html/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('html/js'));
});


// ACCESIBILITY
// gulp.task('accessibility', function() {
//     return gulp.src('./html/**/*.html')
//         .pipe(access({
//             force: true
//         }))
//         .on('error', console.log)
//         .pipe(access.report({reportType: 'json'}))
//         .pipe(rename({
//             extname: '.json'
//         }))
//         .pipe(gulp.dest('reports/'));
// });