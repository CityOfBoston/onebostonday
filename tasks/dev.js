'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    sassGlob = require('gulp-sass-glob'),
    uglify = require('gulp-uglifyjs'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    modernizr = require('gulp-modernizr'),
    cssmin = require('gulp-cssmin'),
    rename      = require('gulp-rename'),
    init        = require('../init.js');;


gulp.task('jshint', function() {
    return gulp.src('build/js/src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-js', function() {
    return gulp.src('./build/js/src/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('build-plugins', function() {
    return gulp.src('./build/js/plugins/**/*.js')
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest('public/js/'));
});

var BUILD_SCSS = 'build/scss/**/*.scss';
var DEST_CSS   = 'public/css/';

gulp.task('build-scss', function() {
    return gulp.src(BUILD_SCSS)
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(DEST_CSS));
});

gulp.task('build-html', function() {
    return gulp.src('craft/templates/**/*.twig')
        .pipe(livereload());
});

gulp.task('build-images', function(){
    return gulp.src('build/img/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('html/img'));
});

var modernizrConfig = {
    "cache" : false,
    "devFile" : false,
    "dest" : './build/js/plugins/modernizr.js',
    "options" : [
        "setClasses",
        "addTest",
        "html5printshiv",
        "testProp",
        "fnBind"
    ],
    "tests" : [],
    "excludeTests": [],
    "crawl" : true,
    "useBuffers" : false,
    "files" : {
        "src": [
            "*[^(g|G)runt(file)?].{js,css,scss}",
            "**[^node_modules]/**/*.{js,css,scss}",
            "!**/+(bourbon|neat)/**/*.scss"
        ]
    },
    "customTests" : []
};

gulp.task('build-modernizr', function() {
    return gulp.src(['./public/css/screen.css', './public/js/main.js'])
        .pipe(modernizr(modernizrConfig))
        .pipe(uglify())
        .pipe(gulp.dest("./build/js/plugins/"));
});
 
 gulp.task('serve', init);

// MAIN WATCH TASK
gulp.task('watch', function() {
    gulp.start('serve');

    gulp.watch('build/js/**/*.js', ['jshint','build-js', 'build-plugins']);
    gulp.watch('build/scss/**/*.scss', ['build-scss']);
    gulp.watch('build/img/*.*', ['build-images']);
});