// inside webpack.config.js
const path = require('path')
const webpack = require('webpack')
module.exports = { 
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.bundle.js',
    publicPath: '/'
  },  

  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'}  
    ]   
  },
  performance: { hints: false }
}
