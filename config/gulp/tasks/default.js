'use strict';

var gulp = require('gulp');
var del = require('del');
var exec = require('child_process').exec;
var clean = require('gulp-clean');

gulp.task('run',        ['serve:webpack:dev']);
gulp.task('serve',      ['serve:webpack:dev']);
gulp.task('serve:dev',  ['serve:webpack:dev']);
gulp.task('build:dev',  ['webpack:dev']);
gulp.task('build:prod', ['webpack:prod']);
gulp.task('build:aot',  ['webpack:aot']);
gulp.task('build:jit',  ['webpack:jit']);
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
