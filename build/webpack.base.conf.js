const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
// console.log( 'devMode === ', devMode );
const MinCssExtractPlugin = require( "mini-css-extract-plugin" );

function resolve (dir) {
    let newPath = path.join(__dirname, '..', dir);
    // console.log("newPath == ", newPath);
    return newPath;
}

let baseConfig = {
    resolve: {
        // 定义别名
        alias: {
            '@': resolve('src'),
            'vue$': 'vue/dist/vue.esm.js',
            'src': path.resolve(__dirname, '../src'),
            'admin': path.resolve(__dirname, '../src/pages/manage/modules/admin'),
            'modules': path.resolve(__dirname, '../src/pages/manage/modules'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'api': path.resolve(__dirname, '../src/api'),
            'components': path.resolve(__dirname, '../src/components'),
            'views': path.resolve(__dirname, '../src/views'),
            'styles': path.resolve(__dirname, '../src/styles'),
            'utils': path.resolve(__dirname, '../src/utils'),
            'store': path.resolve(__dirname, '../src/store'),
            'router': path.resolve(__dirname, '../src/router'),
            'mock': path.resolve(__dirname, '../src/mock'),
            'vendor': path.resolve(__dirname, '../src/vendor'),
            'static': path.resolve(__dirname, '../static'),
            'PATH_SRC': path.resolve(__dirname, 'src'),
            'PATH_SRC_UTILS': path.resolve(__dirname, 'src/utils'),
            'PATH_SRC_PAGES': path.resolve(__dirname, 'src/pages')
        },
        // 告诉webpack解析模块时应该搜索哪些目录
        modules: [path.resolve( __dirname, 'src' ), 'node_modules'],
        extensions: ['.js', '.vue', '.json', '.less', '.scss'],
    },
    entry: {
        index: path.resolve( __dirname, '..', 'src/main.js' )
    },
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     exclude: [
            //         /node_modules\/(?!(element-ui)\/).*/
            //     ],
            //     use: [
            //         'style-loader',
            //         'css-loader'
            //     ]
            // },
            {
                test: /\.(c|sc|sa)ss$/,
                use: [
                    {
                        loader: 'vue-style-loader',
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'vue-style-loader',
                    },
                    'css-loader',
                    'less-loader',
                ]
            },
            // sass文件的处理
            // {
            //     test: /\.(sa|sc|c)ss$/,
            //     use: [
            //         'css-loader',
            //         'sass-loader'
            //     ],
            // },
            // {
            //     test: /\.(s*)css$/, // 正则匹配文件路径
            //     exclude: /node_modules/,
            //     use: ["css-loader", "style-loader"]
            // },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [resolve('src/assets/icons')],
                options: {
                    symbolId: 'icon-[name]'
                }
            },
            {
                test:/\.(ico|woff|eot|ttf)$/,
                // exclude: /(public)/,
                exclude: /(public)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 500,   //小于50K的 都打包

                            name:'[hash:8].[name].[ext]',
                            // publicPath:"img/",  //替换CSS引用的图片路径 可以替换成爱拍云上的路径
                            // outputPath:"../img/"        //生成之后存放的路径
                        }
                    }
                ]
            },
            {
                test:/\.(png|svg|jpe?g|gif)(\?.*)?$/,
                // exclude: /(public)/,
                exclude: [resolve('src/assets/icons')],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 500,   //小于50K的 都打包

                            name:'[hash:8].[name].[ext]',
                            // publicPath:"img/",  //替换CSS引用的图片路径 可以替换成爱拍云上的路径
                            // outputPath:"../img/"        //生成之后存放的路径
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }

        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};

exports.baseConfig = baseConfig;
