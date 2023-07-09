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
        'user-register'    : './src/page/user-register/index.js',
        "user-password-reset"   : "./src/page/user-password-reset/index.js",
        "user-password-update"  : "./src/page/user-password-update/index.js",
        'product-list'  : './src/page/product-list/index.js',
        "product-detail"        : "./src/page/product-detail/index.js",
        'common'        : './src/page/common/index.js',
        "user-center"           : "./src/page/user-center/index.js",
        "cart"                  : "./src/page/cart/index.js",
        "checkout"              : "./src/page/checkout/index.js",
        "address-list"          : "./src/page/address-list/index.js",
        "add-to-cart"           : "./src/page/add-to-cart/index.js",
        "order-list"            : "./src/page/order-list/index.js",
        "order-info"            : "./src/page/order-info/index.js",
        "order-pay"             : "./src/page/order-pay/index.js",
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
        new HtmlWebpackPlugin(getHtmlPluginConfig('user-register')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('user-password-reset')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('product-list')),
        new HtmlWebpackPlugin(getHtmlPluginConfig("user-center")),
        new HtmlWebpackPlugin(getHtmlPluginConfig("cart")),
        new HtmlWebpackPlugin(getHtmlPluginConfig("user-password-update")),
        new HtmlWebpackPlugin(getHtmlPluginConfig("product-detail")),
        new HtmlWebpackPlugin(getHtmlPluginConfig("checkout")),
        new HtmlWebpackPlugin(getHtmlPluginConfig("address-list")),
        new HtmlWebpackPlugin(getHtmlPluginConfig("add-to-cart")),
        new HtmlWebpackPlugin(getHtmlPluginConfig("order-list")),
        new HtmlWebpackPlugin(getHtmlPluginConfig("order-info")),
        new HtmlWebpackPlugin(getHtmlPluginConfig("order-pay")),
    ],
    resolve: {
        alias: {
            page: path.resolve(__dirname, '/src/page'),
            utils: path.resolve(__dirname, '/src/utils'),
            view: path.resolve(__dirname, '/src/view'),
            service: path.resolve(__dirname, '/src/service'),
            node_modules: path.resolve(__dirname, '/node_modules'),
            dist: path.resolve(__dirname, '/dist'),
            data: path.resolve(__dirname, "src/data"),
        }
    },
    devServer: {
        static : './dist'
    },
    mode: 'development',
};
