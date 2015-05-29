'use strict;'
var gulp = require('gulp');
var twig = require('gulp-twig');

gulp.task('default', ['twig']);

gulp.task('twig', function () {
    return gulp.src('tmpl/*.twig')
        .pipe(twig())
        .pipe(gulp.dest('public/tmpl/'));
});
