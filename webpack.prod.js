const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');


// Others:
// ignore-plugin
//
module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin(),
    ]
});

/*

plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
],*/
//  Example CLI  npx webpack --verbose --optimize-occurrence-order --optimize-dedupe --config webpack.prod.js
