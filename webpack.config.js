const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'
const mode = devMode ? 'development' : 'production'

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    // assetModuleFilename: 'images/[name][ext][query]',
  },

  mode: mode,

  devtool: devMode ? 'source-map' : false,

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
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
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin(),
  ],

}

