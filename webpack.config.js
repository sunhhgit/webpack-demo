const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MyPlugin = require('./plugin-loader/my-plugin')

module.exports = {
  entry: './src/react.js',// "./src/index",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "main.js"
    // publicPath: "/" // 导入静态资源时的路径前缀
  },
  devServer: {
    port: 8089,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.mobile$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: './plugin-loader/my-loader',
          options: {
            size: 750
          }
        }]
      }
    ]
  },
  plugins: [
    new MyPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  // 果把较为固定的模块抽离出来，便于缓存
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          filename: 'vendor.js',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/
        },
      }
    }
  },
  // eval: 打包速度非常快，因为不需要生成sourcemap文件;由于会映射到转换后的代码，而不是映射到原始代码，所以不能正确的显示行数。
  // source-map: 为每一个打包后的模块生成独立的sourcemap文件
  // inline-source-map: 该属性不会生成独立的 .map文件，而是将 .map文件以dataURL的形式插入。会使得main.js文件变得非常大
  // cheap-source-map: cheap生成的 .map文件会忽略原始代码中的列信息,因此文件大小相对于source-map来讲，main.js 文件会变得更小。
  //                   使用cheap属性后，也不会有loader模块之间对应的sourcemap，因为webpack打包最终会将所有的非js资源，通过loader形式转换成js资源，
  //                   比如 vue 中的文件，xx.vue -> vue-loader转换 -> js -> 压缩 -> 压缩后的js
  // cheap-module-source-map: 生成一个没有列的信息的sourceMaps文件，同时loader的sourcemap也被简化成为只包含对应行的
  devtool: 'cheap-module-source-map',
  mode: "development"
}
