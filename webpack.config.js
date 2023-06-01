const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getHtmlPluginConfig = function (name) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common', name],
    }
};

module.exports = {
    entry: {
        'index'         : './src/page/index/index.js',
        'user-login'    : './src/page/user-login/index.js',
        'common'        : './src/page/common/index.js',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'resources/[name][ext][query]',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|gif|jpg|avif|png|webp)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(htm|string)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        esModule: false
                    }
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
        new HtmlWebpackPlugin(getHtmlPluginConfig('index')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('user-login')),
    ],
    resolve: {
        alias: {
            page: path.resolve(__dirname, '/src/page'),
            utils: path.resolve(__dirname, '/src/utils'),
            view: path.resolve(__dirname, '/src/view'),
            service: path.resolve(__dirname, '/src/service'),
            node_modules: path.resolve(__dirname, '/node_modules'),
            dist: path.resolve(__dirname, '/dist'),
        }
    },
    devServer: {
        static : './dist'
    },
    mode: 'development',
};
