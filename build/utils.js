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


exports.cssLoaders = function (options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }

      const extraParams = [];
        // 如果参数已经是接收对象参数，就不要加query了，
      // 如: less-loader?{"modifyVars":{"@tab-bar-height":"200px"}}
      if (options.sourceMap && !/\{.+?\}/.test(loader)) {
        extraParams.push('sourceMap');
      }
      if (options.modules && loader === 'css-loader') {
        extraParams.push('modules&importloaders=1&localidentname=[name]__[local]___[hash:base64:5]');
      }

      return loader + (extraParams.length > 0 ? (extraParamChar + extraParams.join('&')) : '');
    }).join('!')

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract(sourceLoader)
    } else {
      return [sourceLoader].join('!')
    }
  }

  let lessModifyVars = '"modifyVars":' + JSON.stringify(theme);
  let lessSourceMap = '"sourceMap":' + JSON.stringify(!!options.sourceMap);

  return {
    css: generateLoaders(['css', 'postcss']),
    less: generateLoaders(['css', 'postcss', 'less?{' + lessModifyVars + ',' + lessSourceMap + '}']),
  }
}

// Generate loaders for standalone style files
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: options.useStyleLoader ? 'style-loader!' + loader : loader
    })
  }
  return output
}
