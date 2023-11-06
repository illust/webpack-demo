const { merge } = require("webpack-merge")
const common = require("./webpack.common")
const { resolveApp } = require("../util/path")

module.exports = merge(common,{
    output:{
        // bundle 文件名称
        filename: "[name].[contenthash].bundle.js",

        // bundle 文件路径
        path: resolveApp("dist"),

        // 编译前是否清除目录
        clean: true
    }, 
    // 生产模式
    mode: "production"
})