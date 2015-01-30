module.exports = {
    entry: './components/main.js',
    output: {

        filename: 'build/bundle.js'
    },
    module: {
        loaders: [
            {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'}, // use ! to chain loaders
            {test: /\.js$/, loader: 'jsx-loader?harmony'} // loaders can take parameters as a querystring
        ]
    },
    resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ['', '.js', '.json']
    }
};
