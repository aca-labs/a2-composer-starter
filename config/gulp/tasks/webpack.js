'use strict';

var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var config_dev = require('../../webpack/webpack.dev.js')({env: 'development'});
var config_prod = require('../../webpack/webpack.prod.js')({env: 'production'});
var config_test = require('../../webpack/webpack.prod.js')({env: 'testing'});

gulp.task('webpack:dev', ['build:watch'], function() {
    // Start a webpack-dev-server
    var compiler = webpack(config_dev);

    var server = new WebpackDevServer(compiler, config_dev.devServer);

    server.use('/', function (req, resp, next) {
        var opts = url.parse('http://localhost:8080');
        opts.method = req.method;
        opts.headers = req.headers;

        var myReq = http.request(opts, function (myRes) {
            var statusCode = myRes.statusCode;
            var headers = myRes.headers;
            var location = headers.location;

            if (200 !== statusCode) {
                next();

                return;
            }

            resp.writeHead(myRes.statusCode, myRes.headers);
            myRes.on('error', function (err) {
                next(err);
            });
            myRes.pipe(resp);
        });
        myReq.on('error', function (err) {
            next(err);
        });

        if (!req.readable) {
            myReq.end();
        } else {
            req.pipe(myReq);
        }
    });

    server.listen(3001, '0.0.0.0', function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:3000/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});

gulp.task('webpack:prod', ['ngc'], function() {
    // run webpack
    webpack(config_prod, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
        //callback();
    });
});
