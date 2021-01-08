/**
 * 功能：webpack 生产环境
 * 作者：Abbott.liu
 * 时间：2018年7月23日
 */

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.conf.js');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const fs = require("fs");

const root = path.join(__dirname);

//获取文件夹下的所有文件
// getFiles.getFileList( path.resolve( __dirname, 'src/pages/' ) );

// console.log( path.resolve( __dirname, 'src/pages/' ) );

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = merge( base.baseConfig, {
    output: {
        filename: '[name].bundle_[chunkhash:8].js',
        path: path.resolve( __dirname, '../public' )
    },
    plugins: [
        new VueLoaderPlugin(),
        // new HtmlWebpackPlugin({  // Also generate a test.html
        //     // inject: false,
        //     template: path.resolve( __dirname, 'src/pages/home/index.ejs' ),
        //     filename: path.resolve( __dirname, 'public/home.html' ),
        //     chunks: ['home']
        // }),
        new HtmlWebpackPlugin({
            title: 'Custom template',
            // template: path.resolve( __dirname, 'src/pages/home/index.html' )
            template: path.resolve( __dirname, '../src/pages/manage/index.html' )
        }),
        new CleanWebpackPlugin()
    ]
});

function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    // console.log(' files ===', files);
    files.forEach( (item, index) =>{
        var stat = fs.statSync(path + item);  // statSync 同步获取文件信息
        if (stat.isDirectory()) {
            //递归读取文件
            readFileList(path + item + "/", filesList)
        } else {

            let obj = {};//定义一个对象存放文件的路径和名字
            obj.path = path;//路径
            obj.filename = item;//名字
            filesList.push(obj);
        }

    })

}

var getFiles = {
    //获取文件夹下的所有文件
    getFileList: function (path) {
        var filesList = [];
        readFileList(path, filesList);
        // console.log(' filesList ===', filesList);
        return filesList;
    }
};

// 获取文件夹下的所有文件
// getFiles.getFileList("./src/");

let addEntry =()=> {

};
