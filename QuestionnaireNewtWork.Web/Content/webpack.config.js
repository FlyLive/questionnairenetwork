var path = require('path');
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        "app": path.resolve(__dirname, "./src/entry.jsx"),
    },
    output: {
        path: path.resolve(__dirname, "./src/build"),
        filename: "bundle.js" // main.js || bundle.js || [name].js || index.js
    },
    devServer: {
        hot: true,
        // 开启服务器的模块热替换（HMR）
    },
    module: {
        loaders: [
            { test: /\.js|jsx$/, exclude: /node_modules/, loaders: ['babel-loader'] },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // 开启全局的模块热替换（HMR）

        new webpack.NamedModulesPlugin(),
        // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
    ],
}