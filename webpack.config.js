var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeJsPlugin = require('optimize-js-plugin');
var env = process.env.NODE_ENV || 'development';

var plugins = [];
if (env === 'production') {
   plugins.push(
      new UglifyJSPlugin(),
      new OptimizeJsPlugin({
         sourceMap: false
      }),
      new webpack.DefinePlugin({
         'process.env': {
            'NODE_ENV': JSON.stringify('production')
         }
      })
   );
}

var config = {
   entry: './src/js/app.js',

   output: {
      path: __dirname + '/public/js',
      filename: 'app.js',
   },

   module: {
      loaders: [
         {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
               presets: ['es2015', 'react'],
               plugins: ['transform-class-properties']
            }
         },
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
               presets: ['es2015', 'react'],
               plugins: ['transform-class-properties']
            }
         }
      ]
   },
   plugins: plugins
}

module.exports = config;