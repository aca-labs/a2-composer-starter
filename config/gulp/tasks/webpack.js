'use strict';

var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var url = require('url');
var http = require('http');

var config_dev = require('../../webpack/webpack.dev.js')
var config_prod = require('../../webpack/webpack.prod.js')
var config_test = require('../../webpack/webpack.test.js')
var metadata = require('../../webpack/metadata.js');

gulp.task('serve:webpack:dev', ['build:watch'], function() {
    process.env.NODE_ENV = "development";
    process.env.ENTRY_TYPE = metadata.ENTRY_TYPE;
    // Start a webpack-dev-server
    var config = config_dev({env: 'development'}, metadata.ENTRY_TYPE);
    var compiler = webpack(config);

    var server = new WebpackDevServer(compiler, config.devServer);

    server.use('/', function (req, resp, next) {
        var opts = url.parse('http://localhost:3000');
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

    server.listen(3000, '0.0.0.0', function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:3000/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});

gulp.task('webpack:dev', ['ngc'], function() {
    process.env.NODE_ENV = "development";
    process.env.ENTRY_TYPE = metadata.ENTRY_TYPE;
    var config = config_dev({env: 'development'}, metadata.ENTRY_TYPE);
    // run webpack
    webpack(config, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
        //callback();
    });
});

gulp.task('webpack:prod', ['ngc'], function() {
    process.env.NODE_ENV = "production";
    process.env.ENTRY_TYPE = metadata.ENTRY_TYPE;
    var config = config_prod({env: 'production'}, metadata.ENTRY_TYPE);
    // run webpack
    webpack(config, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
        //callback();
    });
});

gulp.task('webpack:jit', ['ngc'], function() {
    process.env.NODE_ENV = "production";
    process.env.ENTRY_TYPE = 'jit';
    var config = config_prod({env: 'production'}, 'jit');
    // run webpack
    webpack(config, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
        //callback();
    });
});

gulp.task('webpack:aot', ['ngc'], function() {
    process.env.NODE_ENV = "production";
    process.env.ENTRY_TYPE = 'aot';
    var config = config_prod({env: 'production'}, 'aot');
    // run webpack
    webpack(config_prod, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
        //callback();
    });
});
