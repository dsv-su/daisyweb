'use strict;'
var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', ['course-segments-css', 'course-segments-js']);

gulp.task('course-segments-css', function () {
    return gulp.src('bower_components/footable/css/footable.core.css')
        .pipe(concat('course_segments.css'))
        .pipe(gulp.dest('public/css/'));
});

gulp.task('course-segments-js', function () {
    return gulp.src('bower_components/footable/js/footable.js')
        .pipe(concat('course_segments.js'))
        .pipe(gulp.dest('public/js/'));
});
