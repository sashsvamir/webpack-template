const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')
const globParent = require('glob-parent')

const devMode = process.env.NODE_ENV !== 'production'
const mode = devMode ? 'development' : 'production'




// ================== Begin setup posthtml ========================= //
const htmlRoot = './src/*.html'
const posthtmlInclude = require('posthtml-include')({ root: './src/partials' })

const files = glob.sync(htmlRoot)
const htmlRootDir = globParent(htmlRoot)

const htmlWebpackPlugins = files.map(file => {
  const hwpConfig = {
    filename: path.relative(htmlRootDir, file),
    template: file,
    // inject: true,
    // minify: false,
    hash: true,
  }
  return new HtmlWebpackPlugin(hwpConfig)
})
// ================== End setup posthtml ========================= //




module.exports = {
  entry: './src/app.js',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },

  mode: mode,

  devtool: devMode ? 'source-map' : false,

  // devServer: {
  //   open: true,
  //   contentBase: [path.resolve(__dirname, 'dist')]
  // },
  // devServer: {
  //   hot: true,
  // },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, //devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]',
        },
      },
      {
        test: /\.svg/,
        type: 'asset/inline',
      },
      {
        test: /\.html$/,
        use: [
          'html-loader',
          {
            loader: 'posthtml-loader',
            options: {
              plugins: [
                posthtmlInclude,
              ],
            },
          },
        ],
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({ template: './src/index.html' }),
    ...htmlWebpackPlugins,
    new MiniCssExtractPlugin(),
  ],

}

