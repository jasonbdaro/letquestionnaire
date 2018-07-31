const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './resources/assets/js/app.js',
    mode: "production",
    devtool: 'source-map',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public/js'),
    },
    module: {
        rules: [
            { test: /\.jsx?$/, exclude: '/node_modules/', loader: 'babel-loader', query: { compact: false }}
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
};