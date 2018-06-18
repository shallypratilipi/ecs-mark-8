'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
const cookie = require('cookie');
const request = require('request');
let StringReplacePlugin = require('string-replace-webpack-plugin');
const translation = require('./i18n');
const languageJSON = translation[process.env.LANGUAGE || 'hi'];

const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,
    
    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                {from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')},
            ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay
            ? {warnings: false, errors: true}
            : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        },
        before: (app) => {
            app.use((req, res, next) => {
                const access_token = cookie.parse(req.headers.cookie || '').access_token;
                request.get({
                    url: 'https://gamma.pratilipi.com/user/accesstoken?accessToken=' + access_token,
                    json: true
                }, function(errorInResponse, response, data) {
                    if (req.path.indexOf('static') > -1) {
                        next();
                        return;
                    }
                    res.cookie('access_token', data.accessToken, {
                        domain: process.env.DOMAIN || 'localhost',
                        path: '/',
                        httpOnly: false,
                        maxAge: 60 * 60 * 1000,
                    });
                    next();
                });
            });
        }
    },
    
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, '../src/sw.js'),
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Popper: ['popper.js', 'default'],
            Promise: 'es6-promise-promise'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.dev.assetsSubDirectory,
                ignore: ['.*'],
                transform(content, path) {
                    return new Promise((resolve, reject) => {
                        if (path.indexOf('manifest.json') > -1) {
                            const manifestData = JSON.parse(content.toString('utf-8'));
                            manifestData.lang = process.env.LANGUAGE;
                            manifestData.description = languageJSON['home_page_title'];
                            manifestData.short_name = languageJSON['pratilipi'];
                            manifestData.name = languageJSON['pratilipi'];
                            manifestData.gcm_sender_id = '659873510744';
                            resolve(JSON.stringify(manifestData, null, 4));
                        } else {
                            resolve(content);
                        }
                    });
                }
            }
        ])
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
            // add port to devServer config
            devWebpackConfig.devServer.port = port
            
            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors
                    ? utils.createNotifierCallback()
                    : undefined
            }))
            
            resolve(devWebpackConfig)
        }
    })
})
