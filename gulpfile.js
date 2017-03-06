'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    sassGlob = require('gulp-sass-glob'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    harp        = require('harp');


gulp.task('build-js', function() {
    return gulp.src('build/js/**/*.js')
        // .pipe(uglify({
        //     console: true
        // }))
        // .pipe(concat('main.js'))
        .pipe(gulp.dest('public/js/'))
        .pipe(browserSync.stream());
});

gulp.task('build-scss', function() {
    return gulp.src('build/sass/**/*.scss')
        .pipe(sassGlob())
        //.pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(browserSync.stream());
});

gulp.task('build-html', function() {
    return gulp.src('craft/templates/**/*.*')
        .pipe(browserSync.reload);
});

gulp.task('build-images', function(){
    return gulp.src('build/img/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img'))
        .pipe(browserSync.reload);
});

gulp.task('jshint', function() {
    return gulp.src('build/js/**/*.js')
        .pipe(jshint({
            curly: true,
            eqeqeq: true,
            eqnull: true,
            browser: true,
            "globals": {
                "$": true
            }
        }))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('serve', function () {
  harp.server(__dirname, {
    port: 9000
  }, function () {
    browserSync({
      proxy: "localhost:9000",
      open: false,
      /* Hide the notification. It gets annoying */
      notify: {
        styles: ['opacity: 0', 'position: absolute']
      }
    });
    /**
     * Watch for scss changes, tell BrowserSync to refresh main.css
     */
    gulp.watch(["*.css", "*.sass", "*.scss", "*.less"], function () {
      reload("main.css", {stream: true});
    });
    /**
     * Watch for all other changes, reload the whole page
     */
    gulp.watch(["*.html", "**/*.ejs", "*.jade", "*.js", "*.json", "*.md"], function () {
      reload();
    });
  })
});

/**
 * Default task, running `gulp` will fire up the Harp site,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['serve']);

gulp.task('watch', function() {
  gulp.start('serve');
  gulp.watch('build/js/**/*.js', ['jshint','build-js']);
  gulp.watch('build/sass/**/*.scss', ['build-scss']);
  gulp.watch('build/img/*.*', ['build-images']);
  gulp.watch('public/**/*.html', ['build-html','build-images']);
  gulp.watch('craft/**/*.ejs', ['build-html','build-images']);
});