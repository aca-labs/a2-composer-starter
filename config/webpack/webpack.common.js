/**
* @author: @AngularClass
*/

const webpack = require('webpack');
const helpers = require('./helpers');

/*
* Webpack Plugins
*/
// problem with copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

/*
* Webpack configuration
*
* See: http://webpack.github.io/docs/configuration.html#cli
*/
module.exports = function(options) {
    isProd = options.env === 'production';
    return {

        /*
        * Cache generated modules and chunks to improve performance for multiple incremental builds.
        * This is enabled by default in watch mode.
        * You can pass false to disable it.
        *
        * See: http://webpack.github.io/docs/configuration.html#cache
        */
        //cache: false,


        /*
        * Options affecting the resolving of modules.
        *
        * See: http://webpack.github.io/docs/configuration.html#resolve
        */
        resolve: {

            /*
            * An array of extensions that should be used to resolve modules.
            *
            * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
            */
            extensions: ['.ts', '.js', '.json'],

            // An array of directory names to be resolved to the current directory
            modules: [helpers.root('.build'), 'node_modules'],

        },

        /*
        * Options affecting the normal modules.
        *
        * See: http://webpack.github.io/docs/configuration.html#module
        */
        module: {
            exprContextCritical: false,

            /*
            * An array of automatically applied loaders.
            *
            * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
            * This means they are not resolved relative to the configuration file.
            *
            * See: http://webpack.github.io/docs/configuration.html#module-loaders
            */
            loaders: [

                /*
                * Typescript loader support for .ts and Angular 2 async routes via .async.ts
                * Replace templateUrl and stylesUrl with require()
                *
                * See: https://github.com/s-panferov/awesome-typescript-loader
                * See: https://github.com/TheLarkInn/angular2-template-loader
                */
                {
                    test: /\.ts$/,
                    loaders: [
                        'awesome-typescript-loader',
                        'angular2-template-loader',
                        'angular2-router-loader?loader=system&genDir=.build/compiled/.build/app&aot=' + isProd
                    ],
                    exclude: [/\.(spec|e2e)\.ts$/]
                },

                /*
                * Json loader support for *.json files.
                *
                * See: https://github.com/webpack/json-loader
                */
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                },

                /*
                * to string and css loader support for *.css files
                * Returns file content as string
                *
                */
                {
                    test: /\.css$/,
                    loaders: ['to-string-loader', 'css-loader']
                },
                // Font Definitions
                { test: /\.svg$/, loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=assets/fonts/[name].[ext]' },
                { test: /\.woff$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]' },
                { test: /\.woff2$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=assets/fonts/[name].[ext]' },
                { test: /\.[ot]tf$/, loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]' },
                { test: /\.eot$/, loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=assets/fonts/[name].[ext]' },

                /* Raw loader support for *.html
                * Returns file content as string
                *
                * See: https://github.com/webpack/raw-loader
                */
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                    exclude: [ helpers.root('.build/index.html'), helpers.root('src/index.html') ]
                },

                /* File loader for supporting images, for example, in CSS files.
                */
                {
                    test: /\.(jpg|png|gif)$/,
                    loader: 'file'
                }
            ]
        },

        /*
        * Add additional plugins to the compiler.
        *
        * See: http://webpack.github.io/docs/configuration.html#plugins
        */
        plugins: [
            new AssetsPlugin({
                path: helpers.root('dist'),
                filename: 'webpack-assets.json',
                prettyPrint: true
            }),

            /*
            * Plugin: ForkCheckerPlugin
            * Description: Do type checking in a separate process, so webpack don't need to wait.
            *
            * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
            */
            //new ForkCheckerPlugin(),
            /*
            * Plugin: CommonsChunkPlugin
            * Description: Shares common code between the pages.
            * It identifies common modules and put them into a commons chunk.
            *
            * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
            * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
            */
            /*new webpack.optimize.CommonsChunkPlugin({
                name: ['app', 'webworker'].reverse()
            }),

            /**
            * Plugin: ContextReplacementPlugin
            * Description: Provides context to Angular's use of System.import
            *
            * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
            * See: https://github.com/angular/angular/issues/11580
            */
            new ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)(esm(\\|\/).build|.build)(\\|\/)linker/,
                helpers.root('.build') // location of your .build
            ),

            /*
            * Plugin: CopyWebpackPlugin
            * Description: Copy files and directories in webpack.
            *
            * Copies project static assets.
            *
            * See: https://www.npmjs.com/package/copy-webpack-plugin
            */
            new CopyWebpackPlugin([{
                from: '.build/assets',
                to: 'assets'
            }, {
                from: '.build/oauth-resp.html',
                to: 'oauth-resp.html'
            }/*, {
                from: '.build/assets/service-worker.js',
                to: 'sw.js'
            }, {
                from: '.build/assets/main.manifest',
                to: 'main.webmanifest'
            }*/]),

            /*
            * Plugin: HtmlHeadConfigPlugin
            * Description: Generate html tags based on javascript maps.
            *
            * If a publicPath is set in the webpack output configuration, it will be automatically added to
            * href attributes, you can disable that by adding a "=href": false property.
            * You can also enable it to other attribute by settings "=attName": true.
            *
            * The configuration supplied is map between a location (key) and an element definition object (value)
            * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
            *
            * Example:
            *  Adding this plugin configuration
            *  new HtmlElementsPlugin({
            *    headTags: { ... }
            *  })
            *
            *  Means we can use it in the template like this:
            *  <%= webpackConfig.htmlElements.headTags %>
            *
            * Dependencies: HtmlWebpackPlugin
            */
            new HtmlElementsPlugin({
                headTags: require('./head-config.common')
            }),

            /**
            * Plugin LoaderOptionsPlugin (experimental)
            *
            * See: https://gist.github.com/sokra/27b24881210b56bbaff7
            */
            new LoaderOptionsPlugin({}),

        ],

        /*
        * Include polyfills or mocks for various node stuff
        * Description: Node configuration
        *
        * See: https://webpack.github.io/docs/configuration.html#node
        */
        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }

    };
}
