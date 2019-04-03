const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'client/src/App.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'client/dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
