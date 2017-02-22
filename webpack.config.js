const ExtractTextPlugin = require("extract-text-webpack-plugin");

// const extractSass = new ExtractTextPlugin({
//     filename: "[name].[contenthash].css",
//     disable: true
// });

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
            test: /\.css$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader", // translates CSS into CommonJS
                options: {
                  modules: true
                }
            }]
            // use: extractSass.extract({
            //    loader: [{
            //         loader: "css-loader"
            //     }, {
            //         loader: "sass-loader"
            //     },],
            //     // use style-loader in development
            //     fallbackLoader: "style-loader"
            // })
         }
      ]
   },
   // plugins: [extractSass]
}

module.exports = config;