/**
 * webpack.config.js
 */
// 1、导入html-webpack-plugin这个插件，得到插件的构造函数
const HtmlPlugin = require('html-webpack-plugin')

// 2、new构造函数，创建插件的实例对象
const htmlPlugin = new HtmlPlugin({
    // 指定要复制哪个文件
    template: './src/index.html',
    // 指定复制出来的文件名和存放路径
    filename: './index.html'
})
const path = require('path')//导入node.js中专门操作路径的模块
module.exports = {
    // 代表webpack的运行模式，有 development 和 production
    mode: 'development',
    // 3、插件的数组，将来webpack运行时会加载并调用这些插件
    plugins: [htmlPlugin],

    entry: path.join(__dirname, './src/index.js'),//打包入口文件的路径

    output:{
        path:path.join(__dirname,'dist'),
        filename:'js/bundle.js'
    },
    
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ],
    },

    devServer: {
        // 初次打包完成后,自动打开浏览器
        open: true,
        // 在http协议中,如果端口号是80,可以被省略(仅显示为localhost)
        port: 80,
        // 指定运行的主机地址
        host: '127.0.0.1'
    }
}