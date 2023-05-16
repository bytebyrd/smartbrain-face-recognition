const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.png$/,
                loader: "file-loader"
            }
        ]
    },
    devServer:  {
        static:{
            directory: path.resolve(__dirname, 'public')
        },
        allowedHosts: [
            "0.0.0.0"
        ]
    }
}