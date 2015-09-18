'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');

gulp.task('default', ['course-segments']);

gulp.task('jquery', function () {
    return gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('public/js/'));
});

gulp.task('footable-fonts', function () {
    return gulp.src('bower_components/footable/css/fonts/*')
        .pipe(gulp.dest('public/css/fonts/'));
});

gulp.task('course-segments-css', ['footable-fonts'], function () {
    return gulp.src('bower_components/footable/css/footable.core.css')
        .pipe(concat('course_segments.css'))
        .pipe(csso())
        .pipe(gulp.dest('public/css/'));
});

gulp.task('course-segments-js', ['jquery'], function () {
    return gulp.src(['bower_components/footable/js/footable.js',
                     'bower_components/footable/js/footable.sort.js',
                     'js/course_segments.js'])
        .pipe(concat('course_segments.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'));
});

gulp.task('course-segments', ['course-segments-css', 'course-segments-js']);
