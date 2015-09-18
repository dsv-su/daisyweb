'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');

gulp.task('default', ['footable']);

gulp.task('footable', ['footable-css', 'footable-js']);

gulp.task('footable-css', ['footable-fonts'], function () {
    return gulp.src('bower_components/footable/css/footable.core.css')
        .pipe(concat('footable.css'))
        .pipe(csso())
        .pipe(gulp.dest('public/css/'));
});

gulp.task('footable-js', ['jquery'], function () {
    return gulp.src(['bower_components/footable/js/footable.js',
                     'bower_components/footable/js/footable.sort.js',
                     'bower_components/footable/js/footable.filter.js',
                     'js/footable-init.js'])
        .pipe(concat('footable.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'));
});

gulp.task('footable-fonts', function () {
    return gulp.src('bower_components/footable/css/fonts/*')
        .pipe(gulp.dest('public/css/fonts/'));
});

gulp.task('jquery', function () {
    return gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('public/js/'));
});
