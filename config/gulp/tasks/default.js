/**
* @Author: Alex Sorafumo
* @Date:   10/11/2016 5:04 PM
* @Email:  alex@yuion.net
* @Filename: default.js
* @Last modified by:   Alex Sorafumo
* @Last modified time: 30/01/2017 12:02 PM
*/

'use strict';

var gulp = require('gulp');
var del = require('del');
var exec = require('child_process').exec;
var clean = require('gulp-clean');

gulp.task('run',        ['webpack:dev']);
gulp.task('serve',      ['webpack:dev']);
gulp.task('build',      ['webpack:dev']);
gulp.task('build:dev',  ['webpack:dev']);
gulp.task('build:prod', ['webpack:prod']);
gulp.task('test',       ['webpack:test']);
gulp.task('build:test', ['webpack:test']);

gulp.task('source', ['prebuild'], function () {
    return gulp.src(['./src/**', '!./src/**/*.scss'])
        .pipe(gulp.dest('./.build'));
});

gulp.task('source:dev', function () {
    return gulp.src(['./src/**', '!./src/**/*.scss'])
        .pipe(gulp.dest('./.build'));
});

gulp.task('source:watch', ['source', 'sass'], function () {
    gulp.watch(['./src/**', '!./src/**/*.scss'], ['source:dev']);
    gulp.watch('./src/**/*.scss', ['sass:dev']);
});

gulp.task('prebuild', ['clean:dev']);

gulp.task('build', ['source', 'sass']);

gulp.task('build:watch', ['source:watch']);

gulp.task('ngc', ['build'], function (cb) {
    return exec('./node_modules/.bin/ngc -p "./tsconfig.aot.json"', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});
