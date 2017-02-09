/**
* @Author: Alex Sorafumo
* @Date:   19/10/2016 1:20 PM
* @Email:  alex@yuion.net
* @Filename: clean.js
* @Last modified by:   Alex Sorafumo
* @Last modified time: 31/01/2017 2:28 PM
*/

var gulp = require('gulp');
var config = require('../config')();
var del = require('del');

/* Run all clean tasks */
gulp.task('clean', ['clean-build', 'clean-coverage', 'clean-ngc']);

gulp.task('clean:prod', function() {
    return del([
        'dist',
        '.build'
    ]);
});

/* Clean build folder */
gulp.task('clean:dev', function () {
    return del([
        '.build'
    ]);
});

/* Clean coverage folder */
gulp.task('clean-coverage', function () {
    return del([
        config.coverage
    ]);
});
