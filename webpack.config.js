const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },

  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  module: {
    rules: [{
      test: /\.sass$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },

  plugins: [
    new HtmlWebpackPlugin(),
  ],

}

