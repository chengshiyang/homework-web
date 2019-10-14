const path = require('path');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
//插件都要放到plugins中
//导入一个htmlWebpackPlugin插件 在内存中生成html页面，且能将打包后的bundle.js自动追加到页面
const htmlWebpackPlugin=require("html-webpack-plugin");
//向外暴露一个配置对象
    module.exports={
        entry:path.join(__dirname,"./src/main.js"),
        output:{
            path:path.join(__dirname,"./dist"),
            filename:"bundle.js"
        },
        plugins: [//配置插件的节点
            new htmlWebpackPlugin({
                template: path.join(__dirname,"./src/index.html"),//模板页面
                filename: "index.html"        //在内存中生成后的文件名
            }),
            new VueLoaderPlugin()

        ],
        module: { //配置第三方模块加载器
            rules: [ //第三方模块的匹配规则 数组对
                {
                    //处理css样式的loader
                    test: /\.css$/,
                    use: ["style-loader","css-loader"]
                },
                {
                    //处理less样式的loader
                    test:/\.less/,
                    use:["style-loader","css-loader","less-loader"]
                },
                {
                    //处理sass样式的loader
                    test:/\.scss/,
                    use:["style-loader","css-loader","scss"]
                },
                {
                    //处理图片路径的loader limit=7631 小于7631b时自动处理为base64
                    test:/\.(jpg|png|gif|bmp|jpeg|ttf|woff|woff2|eot|svg)$/,
                    use:["url-loader?limit=7631&name=[hash:8]-[name].[ext]"]
                },
                {
                    test:/\.js$/,
                    use:"babel-loader",
                    exclude: "/node_modules/"
                },
                {
                 test: /\.vue$/, use: "vue-loader"
                },
                {

                }

            ]
        }
    };