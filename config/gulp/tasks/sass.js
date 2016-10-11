'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', ['prebuild', 'source'], function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass({outputStyle: 'compressed', includePaths: ['./src/app/shared/']}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./.build'));
});

gulp.task('sass:dev', ['source:dev'], function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass({outputStyle: 'compressed', includePaths: ['./src/app/shared/']}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./.build'));
});
