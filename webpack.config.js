const ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('./config').default

const isProduction = process.env.NODE_ENV === 'production'
const cssModulesConf = 'css?modules&minimize&importLoaders=1'
const cssModulesConfDev =
`${cssModulesConf}&sourceMap&localIdentName=${config.cssModulesScopedName}`

module.exports = {
  entry: './bin/client.js',
  output: {
    filename: 'js/bundle.js',
    path: 'build',
    publicPath: '/build/'
  },

  devtool: isProduction
      ? 'source-map'
      : 'eval-source-map',

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components|dist)/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          (isProduction ? cssModulesConf : cssModulesConfDev) +
          '!postcss'
        )
      }
    ]
  },

  postcss: function (webpack) {
    return [
      require('postcss-cssnext')()
    ]
  },

  plugins: [
    new ExtractTextPlugin('css/main.css', {
      allChunks: true
    })
  ],

  devServer: {
    host: '0.0.0.0',
    port: 6020,
    watch: true,
    inline: true,
    progress: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    stats: 'errors-only'
  }

}
