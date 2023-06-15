const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');



module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src',
    port: 1042,
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: [
          {
            context: ['/oauth', '/api'],
            target: 'http://100.26.132.105',
            changeOrigin: true,
            secure: false,
          },
        ],
  },
  plugins: [
    new Dotenv()
  ],
  mode: 'development',

});
