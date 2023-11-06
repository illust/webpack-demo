const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    // 入口
    entry: {
        index: "./src/index.js"
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,"../src","index.html")
        })
    ],
    module:{
        rules:[
            {
                test: /.(woff|woff2|eot|ttf|otf|png|jpg|jpeg)$/i,
                include: [
                    resolveApp("src")
                ],
                type: "asset/resource"
            },
            {
                test: /\.(scss|sass|css)$/,
                use: ["style-loader","css-loader","sass-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    }
   
}