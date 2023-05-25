const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getHtmlPluginConfig = function (name) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
    }
};

module.exports = {
    entry: {
        'index' : './src/page/index/index.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
        new HtmlWebpackPlugin(getHtmlPluginConfig('index')),
    ],
    mode: 'development',
};
