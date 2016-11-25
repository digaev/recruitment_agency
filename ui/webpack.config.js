const path = require('path');

module.exports = {
  entry: './app/index',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader?presets[]=es2015&presets[]=react',
    }],
  },
};
