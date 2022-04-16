const path = require('path');

module.exports = {
    // The entry point file described above
    entry: './src/index.js',
    // The location of the build folder described above
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: /node_modules\/@firebase\/auth/, //to just exclude firebase auth from source-map
    },
    // Optional and for development only. This provides the ability to
    // map the built code back to the original source format when debugging.
    devtool: 'eval-source-map',
};
