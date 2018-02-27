const path = require('path');

module.exports = {
    entry: {
        account: './js/main.js',
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }
        }]
    },
    watch: true,
    devtool: 'source-map'
};