const path= require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    watch : false,
    mode : 'development',                           
    entry: ['./src/index.jsx'],
    output: {                                           
        path: path.join(__dirname, '/dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.jsx','.styl'],
    },
    module: {                                          
        rules: [
            {
                test: /\.(js|jsx)$/,                     
                exclude: /node_module/,                 
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.styl$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.(mp4)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                {
                    loader: 'url-loader',
                    options: {
                    limit: 4000
                    }
                },
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    "postcss-loader"
                ],
            },
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: "html-loader"
                    }
                ],
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin(),
        // new FaviconsWebpackPlugin({
        //     logo : './imgs/r.png'
        // }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename : './index.html',
        }),
    //    new CopyPlugin({
    //         patterns: [
    //             { from: './imgs', to: 'imgs' }
    //         ],
    //     }),
    ],
    devServer : {
        hot : true,
        port : 3000
    }
}