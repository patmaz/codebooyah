const webpack = require('webpack');

var config = {
   entry: ['./src/js/app.js', 'webpack-hot-middleware/client', 'webpack/hot/dev-server'],

   output: {
      path: '/',
      publicPath: 'http://localhost:8000/static/js',
      filename: 'app.js',
   },

   module: {
      loaders: [
         {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
               presets: ['es2015', 'react'],
               plugins: ['react-hot-loader/babel', 'transform-class-properties']
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
      new webpack.HotModuleReplacementPlugin()
   ]
};

module.exports = config;