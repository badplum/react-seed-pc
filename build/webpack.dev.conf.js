var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var theme = require('../src/theme')
var cssLoaders = utils.getCSSLoaders({
  disableCSSModules: !config.cssModules,
  sourceMap: config.dev.cssSourceMap
});

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: config.appSrc,
        loader: `style!${cssLoaders.own.join('!')}`,
      },
      {
        test: /\.less$/,
        include: config.appSrc,
        loader: `style!${cssLoaders.own.join('!')}!less?{"modifyVars":${JSON.stringify(theme)}}`,
      },
      {
        test: /\.css$/,
        include: config.appNodeModules,
        loader: `style!${cssLoaders.nodeModules.join('!')}`,
      },
      {
        test: /\.less$/,
        include: config.appNodeModules,
        loader: `style!${cssLoaders.nodeModules.join('!')}!less?{"modifyVars":${JSON.stringify(theme)}}`,
      }
    ]
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
  ]
})
