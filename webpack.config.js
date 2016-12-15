module.exports = {
  entry: './client.js',
  output: {
    filename: 'bundle.js',
    publicPath: '/build/js/'
  },
  devtool: process.env.NODE_ENV === 'production'
      ? 'source-map'
      : 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components|dist)/,
        loader: 'babel'
      }
    ]
  },
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
