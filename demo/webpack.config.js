var path = require('path');

module.exports = {
    devtool: 'eval',
    entry: './jsx/demo.jsx',
    output: {
        path: path.join(__dirname, 'js'),
        filename: 'demo.js',
        publicPath: '/js/'
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, loaders: ['babel'], exclude: /node_modules/},
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    }
};
