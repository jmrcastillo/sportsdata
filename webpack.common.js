// inside webpack.config.js
const path = require('path')
const webpack = require('webpack')
module.exports = { 
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'index.bundle.js',
    publicPath: '/'
  },  

  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'}  
    ]   
  },
  performance: { hints: false }
}
