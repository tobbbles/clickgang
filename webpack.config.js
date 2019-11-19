const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  context: resolve(__dirname, 'ui/src'),
  entry: './App.ts',
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    path: resolve(__dirname, 'ui/assets'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    compress: true,  
    hot: true,
    noInfo: false,
    quiet: false,
    contentBase: resolve(__dirname, 'ui'),
    publicPath: '/',
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({template: resolve(__dirname, 'ui/index.html')}),
  ]
};
