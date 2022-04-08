const path = require('path');

module.exports = {
    entry: './src/index.js', // Dẫn tới file index.js ta đã tạo
    output: {
        path: path.join(__dirname, '/build'), // Thư mục chứa file được build ra
        filename: 'bundle.js', // Tên file được build ra
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Sẽ sử dụng babel-loader cho những file .js
                exclude: /node_modules/, // Loại trừ thư mục node_modules
                use: ['babel-loader'],
            },
            {
                test: /\.css$/, // Sử dụng style-loader, css-loader cho file .css
                use: ['style-loader', 'css-loader'],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: /node_modules\/@firebase/, //to exclude firebase from source-map
                exclude: /node_modules\/@firebase\/auth/, //to just exclude firebase auth from source-map
            },
        ],
    },
    // Chứa các plugins sẽ cài đặt trong tương lai
    plugins: [],
};
