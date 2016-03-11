var rootDir = process.cwd();
module.exports = {
  entry: rootDir + "/index.js",
  output: {
    path: rootDir,
    filename: rootDir + "/dist/bundle.js",
    sourceFilename : '[file].map'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-class-properties', 'transform-decorators']
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite?' + JSON.stringify({
          name: '[name]_[hash]',
          prefixize: true
        })
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ],
    preLoaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader'
      }
    ]
  }
};
