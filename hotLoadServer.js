/*
 Copied from https://github.com/irvinebroque/isomorphic-hot-loader
 */

"use strict";

// This little dev server is basically a wrapped express server that
// 'hot loads' our javascript for super fast live reload in development
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var hotLoadPort = process.env.HOT_LOAD_PORT || 8885;

new WebpackDevServer(webpack(config), {
    contentBase: '//localhost:' + hotLoadPort,
    publicPath: config.output.publicPath,
    noInfo: true,
    hot: true,
    //https: true,
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
}).listen(hotLoadPort, 'localhost', function (err/*, result*/) {
        if (err) {
            console.log(err);
        }

        console.log('Hot load server listening at localhost:' + hotLoadPort);
    });
