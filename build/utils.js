var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var theme = require('../src/theme/antd-config')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
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
      return loader
        + (
          // 如果参数已经是接收对象参数，就不要加query了，
          // 如: less-loader?{"modifyVars":{"@tab-bar-height":"200px"}}
          options.sourceMap && !/\{.+?\}/.test(loader)
            ? extraParamChar + 'sourceMap' : ''
        )
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
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'postcss', 'less?{' + lessModifyVars + ',' + lessSourceMap + '}']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
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
