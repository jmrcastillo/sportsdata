const merge = require('webpack-merge');
const common = require('./webpack.common.js');




module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src',
    port: 1042,
    historyApiFallback: true,
  },

  mode: 'development',

});