const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');

const CompressionPlugin = require("compression-webpack-plugin");


// Others:
// ignore-plugin
//
module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),


////        new CompressionPlugin({
        //    asset: "[path].gz[query]",
       //     algorithm: "gzip",
   ////         test: /\.js$|\.css$|\.html$/,

     ////       filename (asset) {
     ////           asset = 'client.min.js.gz'
      ////          return asset
      ////      },


       //     threshold: 10240,
       //     minRatio: 0
        ////})
    ]
});

/*

plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
],*/
//  Example CLI  npx webpack --verbose --optimize-occurrence-order --optimize-dedupe --config webpack.prod.js
