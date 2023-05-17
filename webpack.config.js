const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
module.exports = () => {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    if(process.env.NODE_ENV === 'development'){
        dotenv.config(
            {
                path: 'config/.env.development'
            }
        )
    }
    return {
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
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
        plugins: [
            new webpack.DefinePlugin({
                'process.env.SERVER_URL': JSON.stringify(process.env.SERVER_URL),
            })
        ],
        devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'inline-source-map',
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'public')
            },
            allowedHosts: [
                "0.0.0.0"
            ]
        }
    }
}