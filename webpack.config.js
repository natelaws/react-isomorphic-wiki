"use strict";

var webpack = require('webpack');
var path = require('path');
var hotLoadPort = process.env.HOT_LOAD_PORT || 8885;

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
var definePlugin = new webpack.DefinePlugin({
    "process.env": {
        "NODE_ENV": JSON.stringify('development'),
        "CLIENT": 'true',
        "SERVER": 'false'
    }
});


var config = {
    cache: true,
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    entry: [
        'webpack-dev-server/client?http://localhost:' + hotLoadPort,
        'webpack/hot/dev-server',
        './gui/index.jsx'
    ],
    output: {
        path: path.join(__dirname, '/static/public/build'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:' + hotLoadPort + '/static/build/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        definePlugin
    ],
    module: {
        loaders: [
            {
                test: /\.scss$/,
                exclude: /test/,
                loader: 'style-loader!css-loader!sass-loader?sourceMap'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?sourceMap'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"
            },
            {
                test: /\.jsx$/,
                loaders: ['react-hot', 'babel-loader?optional=runtime', 'jsx?harmony']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader?optional=runtime', 'jsx?harmony']
            }
        ]
    }
};

if (process.env.NODE_ENV === "development") {
    config.devtool = 'eval'; // This is not as dirty as it looks. It just generates source maps without being crazy slow.
    //config.devtool = 'sourcemap';
    //config.devtool = "#inline-source-map";
}

module.exports = config;
