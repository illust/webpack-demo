const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const UnusedWebpackPlugin = require("unused-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = {
    // 入口
    entry: {
        index: "./src/main.js"
    },
    // Webpack 在启动后会从配置的入口模块出发找出所有依赖的模块，Resolve 配置 Webpack 如何寻找模块所对应的文件
    resolve:{
        // 在导入语句没带文件后缀时，webpack会自动带上后缀去尝试访问文件是否存在。
        // extensions用于配置在尝试过程中用到的后缀列表，列表中后缀先后顺序决定访问顺序
        extensions: ['.js','.vue','.json'],
        // alias通过别名把原导入路径映射成一个新的导入路径
        alias:{
            "@": path.resolve(__dirname,"src")
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,"../public","index.html")
        }),
        /**根据webpack 统计信息，反向查找出工程项目里那些文件没有被用到 */
        new UnusedWebpackPlugin({
            directories: [path.join(__dirname,"src")],
            root: path.join(__dirname,"../")
        }),
        new VueLoaderPlugin()
    ],
    module:{
        // noParse 配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析和处理，这样做的好处是能提高构建性能。 
        // 原因是一些库例如 jQuery 、ChartJS 它们庞大又没有采用模块化标准，让 Webpack 去解析这些文件耗时又没有意义。
        noParse: (content)=> {
            // content 代表一个模块的文件路径
            // 返回 true or false
            return /jquery|chartjs/.test(content);
          },
          // rules 配置模块的读取和解析规则，通常用来配置 Loader
        rules:[
            {
                test: /\.png|jpg|gif|jpeg|svg/,
                include: [
                    path.resolve(__dirname,"src")
                ],
                type: "asset/resource",
                parser:{
                    dataUrlCondition:{}
                },
                generator:{
                    filename: 'images/[base]'
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
                include: path.resolve(__dirname,"src"),
                type: "asset/resource",
                generator:{
                    filename: 'fonts/[base]'
                }
            },
            {
                test: /\.(scss|sass|css)$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: ["style-loader","css-loader","sass-loader"]
            },
            {
                test: /\.js$/,
                // 只命中src目录里的js文件，加快 Webpack 搜索速度
                include: path.resolve(__dirname,"src"),
                // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
                use: ["babel-loader?cacheDirectory"]   
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            }
        ]
    }
   
}