var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var env = process.env.NODE_ENV

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', 'ts', 'tsx', '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.js', '.less', '.css'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'static': path.resolve(__dirname, '../src/static'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      // {
      //   test: /\.js$/,
      //   loader: 'eslint-loader',
      //   include: projectRoot,
      //   exclude: /node_modules/
      // }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite',
        include: [
          // antd-mobile svg
          // require.resolve('antd-mobile').replace(/warn\.js$/, ''),
          path.resolve(__dirname, 'static/svg'),
        ]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ],
    noParse: [new RegExp('node_modules/localforage/dist/localforage.js')]
  }
}
