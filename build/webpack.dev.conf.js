/**
 * 功能：webpack 开发环境
 * 作者：Abbott.liu
 * 时间：2019年5月1日
 */

const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.conf.js');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MinCssExtractPlugin = require( "mini-css-extract-plugin" );

let resultMerge = merge( base.baseConfig, {
    output: {
        filename: '[name].bundle.js',
        path: __dirname + 'service/dist', //打包路径
        publicPath:'dist/', // 用于处理静态资源引用地址问题
    },
    devtool: 'source-map',
    devServer: {
        host: '0.0.0.0',
        compress: false,
        port: 6600,
        contentBase: './server', //告诉服务器从哪里提供内容
        hot: true,
        historyApiFallback: true,
        open: false, // 是否自动打开网页
        proxy: {
            // 请求到 '/device' 下 的请求都会被代理到 target： http://debug.xxx.com 中
            '/test': {
                target: 'http://39.105.168.44:9091',
                pathRewrite:{'^/test':''} // 将/api重写为""空字符串
            },
            '/api': {
                target: 'http://123.56.242.13:1314',
                pathRewrite:{'/api':''} // 将/api重写为""空字符串
            },
            '/reqJava': {
                target: 'http://39.105.168.44:9091',
                changeOrigin: true,
                pathRewrite: {
                    '^/reqJava': ''
                }
            },
            '/reqNode': {
                target: 'http://39.106.161.34:3060',
                changeOrigin: true,
                pathRewrite: {
                    '^/reqNode': ''
                }
            }
        }
    },
    plugins: [
        // DefinePlugin 允许创建一个在编译时可配置的全局常量
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //   title: 'Output Management'
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new MinCssExtractPlugin( {
            //为抽取出的独立的CSS文件设置配置参数
            filename: "[name].css"
        } )
    ]
});

module.exports = resultMerge


