const path = require('path');

module.exports = {
  mode: 'production',
  entry: './ui/src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'ui/assets/js')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};