var path = require('path')
var config = require('../config')
var theme = require('../src/theme')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.getCSSLoaders = function (options) {
  var own = [];
  var nodeModules = [];

  options = options || {}

  var baseOptions = {
    minimize: process.env.NODE_ENV === 'production',
    sourceMap: options.sourceMap,
    importLoaders: 1
  };
  var ownOptions = Object.assign({}, baseOptions);
  if (!options.disableCSSModules) {
    ownOptions = Object.assign(
      {},
      ownOptions,
      {
        modules: true,
        localIdentName: '[local]___[hash:base64:5]'
      }
    )
  }

  own.push({
    loader: 'css-loader',
    options: ownOptions
  });
  nodeModules.push({
    loader: 'css-loader',
    options: baseOptions
  });

  own.push('postcss-loader');
  nodeModules.push('postcss-loader');

  return {
    own,
    nodeModules,
  };
}
