const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCssPlugin = new ExtractTextPlugin('app.css');

module.exports = {
    entry: ['babel-polyfill', 'whatwg-fetch', path.resolve(__dirname, 'client/js/index.js')],
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public/bundle')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: 'babel-loader'
            },
            {
                test: /\.less/,
                use: extractCssPlugin.extract(['css-loader', 'less-loader'])
            },
            {
                test: /\.png$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [extractCssPlugin]
};