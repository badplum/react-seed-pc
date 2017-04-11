var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var theme = require('../src/theme')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}


exports.getCSSLoaders = function (config) {
  let own = [];
  let nodeModules = [];

  function attachQuery(list, query) {
    return list.map(
      (item) => {
        if (/\?/.test(item)) {
          return item + '&' + query;
        }
        return item + '?' + query;
      }
    );
  }

  if (config.disableCSSModules) {
    own.push('css?importLoaders=1');
  } else {
    own.push('css?importLoaders=1&modules&localIdentName=[local]___[hash:base64:5]');
  }
  nodeModules.push('css?importLoaders=1');

  own.push('postcss');
  nodeModules.push('postcss');

  if (config.sourceMap) {
    own = attachQuery(own, 'sourceMap');
    nodeModules = attachQuery(nodeModules, 'sourceMap');
  }

  return {
    own,
    nodeModules,
  };
}
