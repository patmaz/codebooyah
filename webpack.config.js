const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

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

            options: {
               presets: ['es2015', 'react'],
               plugins: ['transform-class-properties']
            }
         },
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            options: {
               presets: ['es2015', 'react'],
               plugins: ['transform-class-properties']
            }
         },
         {
            test: /\.scss$/,
            use: [{
                  loader: "style-loader" // creates style nodes from JS strings
            }, {
                  loader: "css-loader", // translates CSS into CommonJS
                  options: {
                     modules: true
                  }
            }, {
                  loader: 'sass-loader'
            }]
         }
      ]
   },
   plugins: [
      new UglifyJSPlugin(),
      new OptimizeJsPlugin({
         sourceMap: false
      })
   ]
}

module.exports = config;