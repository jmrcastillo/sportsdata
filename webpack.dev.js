const merge = require('webpack-merge');
const common = require('./webpack.common.js');



// Webpack notes:
// Could also do this way
/*{
  mode: 'production' // | 'development' | 'none'
}*/


module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    port: 1042,
    historyApiFallback: true,
  },

  mode: 'development',

});